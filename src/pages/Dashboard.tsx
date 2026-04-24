import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/logo.jpeg";
import { currentSemester, membershipFee } from "@/lib/semester";
import { Calendar, CheckCircle2, AlertCircle, LogOut, User as UserIcon } from "lucide-react";

type Profile = {
  id: string; full_name: string; email: string | null; registration_number: string | null;
  phone: string | null; course: string | null; year_of_study: number | null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const sem = currentSemester();
  // Mock: membership not paid for current semester
  const membershipPaid = false;

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (!s) navigate("/auth"); });
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
      if (error) toast.error(error.message);
      setProfile(data as Profile | null);
      setLoading(false);
    })();
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate("/"); };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen bg-warm">
      <header className="bg-card border-b border-border/60 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="ELP" className="w-9 h-9 rounded-full" />
            <span className="font-display text-primary">Member Dashboard</span>
          </Link>
          <Button onClick={signOut} variant="ghost" size="sm"><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
        </div>
      </header>

      <main className="container py-10 grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8 shadow-soft bg-hero text-primary-foreground border-0">
          <p className="text-xs uppercase tracking-widest text-accent">Welcome back</p>
          <h1 className="font-display text-4xl mt-1">{profile?.full_name || "Member"}</h1>
          <p className="text-primary-foreground/80 mt-2">{profile?.course} {profile?.year_of_study ? `· Year ${profile.year_of_study}` : ""}</p>

          <div className="mt-8 p-5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {sem.name} {sem.year}
                </p>
                <p className="font-display text-2xl mt-1">
                  Membership Status: {membershipPaid ? (
                    <span className="text-accent inline-flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Active</span>
                  ) : (
                    <span className="text-accent inline-flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Renewal required</span>
                  )}
                </p>
                <p className="text-sm text-primary-foreground/75 mt-1">
                  {sem.active ? `Renew now to enjoy all chapter benefits this semester. Fee: KES ${membershipFee()}.` : "We're between semesters. Membership opens again at the start of next semester."}
                </p>
              </div>
              <Button disabled={!sem.active} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                Renew · KES {membershipFee()}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2"><UserIcon className="w-3.5 h-3.5" /> Your Profile</p>
          <dl className="mt-4 space-y-3 text-sm">
            <Row k="Full Name" v={profile?.full_name} />
            <Row k="Email" v={profile?.email} />
            <Row k="Reg No." v={profile?.registration_number} />
            <Row k="Phone" v={profile?.phone} />
            <Row k="Course" v={profile?.course} />
            <Row k="Year" v={profile?.year_of_study?.toString()} />
          </dl>
        </Card>

        <Card className="lg:col-span-3 p-8 shadow-soft">
          <h2 className="font-display text-2xl text-primary">What's coming next</h2>
          <p className="text-muted-foreground mt-1 text-sm">Events, payments, receipts, announcements and projects will appear here as we roll them out.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {["Events & RSVP", "Payment receipts", "Chapter announcements"].map(t => (
              <div key={t} className="p-5 rounded-xl border border-dashed border-border bg-muted/40 text-center">
                <p className="font-display text-lg text-primary">{t}</p>
                <p className="text-xs text-muted-foreground mt-1">Coming in the next release</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground text-right">{v || "—"}</dd>
    </div>
  );
}
