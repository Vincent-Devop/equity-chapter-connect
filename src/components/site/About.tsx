import { GraduationCap, HandHeart, Users, Trophy } from "lucide-react";

const pillars = [
  { icon: GraduationCap, title: "Scholarship", body: "Supporting outstanding students through the Equity Group Foundation Wings to Fly programme." },
  { icon: HandHeart, title: "Service", body: "Giving back through community outreach, town clean-ups and mentorship of younger learners." },
  { icon: Users, title: "Sisterhood & Brotherhood", body: "A tight-knit chapter of friends who push each other to be better, on and off campus." },
  { icon: Trophy, title: "Leadership", body: "Training the next generation of ethical, transformational African leaders." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-warm">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">About the Chapter</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-primary text-balance">
            Built on the Equity Group Foundation's promise — empowering possibilities.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The Equity Leaders Program (ELP) Machakos University Chapter brings together top-performing scholars from across Kenya, united by a shared commitment to academic excellence, integrity, and uplifting our communities.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group bg-card rounded-2xl p-7 shadow-soft hover:shadow-elegant transition-smooth border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center shadow-gold mb-5 group-hover:scale-110 transition-smooth">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
