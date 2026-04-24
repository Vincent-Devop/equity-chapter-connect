import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

const nav = [
  { to: "/#about", label: "About" },
  { to: "/#leadership", label: "Leadership" },
  { to: "/#events", label: "Events" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/#contact", label: "Contact" },
];

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Equity Leaders Program — Machakos University Chapter" className="w-12 h-12 rounded-full ring-2 ring-accent/40 object-cover" />
          <div className="leading-tight hidden sm:block">
            <p className="font-display text-lg text-primary">Equity Leaders</p>
            <p className="text-xs text-muted-foreground tracking-wide uppercase">Machakos University Chapter</p>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(n => (
            <a key={n.to} href={n.to} className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <Button onClick={() => navigate("/dashboard")} variant="default">Dashboard</Button>
          ) : (
            <>
              <Button onClick={() => navigate("/auth")} variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
              <Button onClick={() => navigate("/auth?mode=signup")} variant="default">Join Chapter</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
