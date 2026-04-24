import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import hero from "@/assets/chapter-gathering.jpeg";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-25">
        <img src={hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
      </div>
      <div className="container relative py-24 md:py-36 grid lg:grid-cols-[1.3fr,1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Empowering Possibilities
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
            The <span className="text-accent">Equity Leaders</span> of Machakos University.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl text-balance">
            A community of bright, driven scholars committed to leadership, service and transforming lives across Kenya — one chapter at a time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate("/auth?mode=signup")} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold h-14 px-8 text-base">
              Join the Chapter — KES 200 <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 text-base">
              <a href="#about">Learn more</a>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "120+", v: "Active Members" },
              { k: "8", v: "Leadership Roles" },
              { k: "20+", v: "Annual Events" },
            ].map(s => (
              <div key={s.v}>
                <p className="font-display text-3xl text-accent">{s.k}</p>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/70">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-8 bg-accent/20 blur-3xl rounded-full" />
          <img src={logo} alt="Equity Leaders Program crest" className="relative w-full max-w-md mx-auto rounded-full shadow-elegant ring-4 ring-accent/30" />
        </div>
      </div>
    </section>
  );
}
