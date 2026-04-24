import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { title: "Leadership Training Retreat", date: "May 18, 2026", venue: "Machakos County", desc: "Two-day intensive on servant leadership, ethics and project execution.", fee: "KES 500" },
  { title: "Community Clean-Up Drive", date: "Jun 7, 2026", venue: "Machakos Town CBD", desc: "Joint outreach with Safaricom & Equity Bank to keep our streets clean.", fee: "Free" },
  { title: "Mentorship Day", date: "Jul 12, 2026", venue: "Mua Hills High School", desc: "ELP scholars mentor high school candidates ahead of KCSE exams.", fee: "Free" },
];

export default function Events() {
  return (
    <section id="events" className="py-24 bg-warm">
      <div className="container">
        <div className="max-w-xl mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Upcoming Events</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-primary">Where we're headed next.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map(e => (
            <article key={e.title} className="bg-card rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-elegant transition-smooth flex flex-col">
              <div className="bg-hero text-primary-foreground p-6">
                <p className="text-xs uppercase tracking-widest text-accent">{e.fee}</p>
                <h3 className="font-display text-2xl mt-2">{e.title}</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground flex-1">{e.desc}</p>
                <div className="mt-5 space-y-2 text-sm text-foreground/80">
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {e.date}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {e.venue}</p>
                </div>
                <Button className="mt-6 w-full" variant="outline">Register interest</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
