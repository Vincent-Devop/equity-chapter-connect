import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/logo.jpeg";

export default function AuthPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "", full_name: "", registration_number: "", phone: "", course: "", year_of_study: "",
  });

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) navigate("/dashboard"); });
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate("/dashboard"); });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: form.full_name,
              registration_number: form.registration_number,
              phone: form.phone,
              course: form.course,
              year_of_study: form.year_of_study,
            },
          },
        });
        if (error) throw error;
        toast.success("Welcome to the chapter! You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) throw error;
        toast.success("Welcome back.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <img src={logo} alt="ELP" className="w-14 h-14 rounded-full ring-2 ring-accent/40" />
            <div>
              <p className="font-display text-xl text-primary">Equity Leaders</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Machakos University</p>
            </div>
          </Link>
          <h1 className="font-display text-5xl text-primary leading-tight text-balance">
            Become part of something <span className="text-accent">bigger than yourself.</span>
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Join the Equity Leaders Program Machakos University Chapter. Membership is KES 200 per semester and unlocks every chapter event, project and mentorship opportunity.
          </p>
        </div>

        <Card className="p-8 shadow-elegant border-border/60">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <img src={logo} alt="ELP" className="w-10 h-10 rounded-full" />
            <p className="font-display text-lg text-primary">Equity Leaders</p>
          </div>
          <h2 className="font-display text-3xl text-primary">{mode === "signup" ? "Join the Chapter" : "Welcome back"}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signup" ? "Register your details to create your member account." : "Sign in to your member dashboard."}
          </p>

          <form onSubmit={handle} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <Field label="Full Name" value={form.full_name} onChange={v => setForm({ ...form, full_name: v })} required />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Registration No." value={form.registration_number} onChange={v => setForm({ ...form, registration_number: v })} placeholder="SCT221-001/2024" />
                  <Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="07XX XXX XXX" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Course" value={form.course} onChange={v => setForm({ ...form, course: v })} placeholder="BSc. Computer Science" />
                  <Field label="Year of Study" type="number" value={form.year_of_study} onChange={v => setForm({ ...form, year_of_study: v })} placeholder="2" />
                </div>
              </>
            )}
            <Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
            <Field label="Password" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} required />

            <Button type="submit" disabled={loading} className="w-full h-12 text-base">
              {loading ? "Please wait…" : mode === "signup" ? "Create my account" : "Sign in"}
            </Button>
          </form>

          <p className="mt-5 text-sm text-center text-muted-foreground">
            {mode === "signup" ? "Already a member? " : "New to the chapter? "}
            <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="text-primary font-semibold hover:text-accent transition-smooth">
              {mode === "signup" ? "Sign in" : "Create an account"}
            </button>
          </p>
          <p className="mt-2 text-xs text-center"><Link to="/" className="text-muted-foreground hover:text-primary">← Back to home</Link></p>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder} className="mt-1.5 h-11" />
    </div>
  );
}
