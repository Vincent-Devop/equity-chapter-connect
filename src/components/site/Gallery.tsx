import g1 from "@/assets/chapter-gathering.jpeg";
import g2 from "@/assets/group-meeting.jpeg";
import g3 from "@/assets/hike-balloons.jpeg";
import g4 from "@/assets/cleanup-safaricom.jpeg";
import g5 from "@/assets/cleanup-fists.jpeg";
import g6 from "@/assets/equity-bank-team.jpeg";

const items = [
  { src: g1, caption: "Annual chapter assembly", tag: "Meeting" },
  { src: g2, caption: "Team bonding after the team-building day", tag: "Hike" },
  { src: g3, caption: "Trust exercises at the team-building hike", tag: "Hike" },
  { src: g4, caption: "Joint clean-up with Safaricom & Equity", tag: "Outreach" },
  { src: g5, caption: "Energised and ready — Machakos town clean-up", tag: "Outreach" },
  { src: g6, caption: "Hosted by Equity Bank Machakos branch officials", tag: "Partnership" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24">
      <div className="container">
        <div className="max-w-xl mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Chapter Life</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-primary">Moments that shaped us.</h2>
          <p className="mt-4 text-muted-foreground">From the team-building hike to community clean-ups with Safaricom and Equity Bank — these are our stories.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <figure key={i} className={`relative group overflow-hidden rounded-2xl shadow-soft ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <img src={it.src} alt={it.caption} className={`w-full ${i === 0 ? "h-full min-h-[400px]" : "h-64"} object-cover transition-smooth group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-90" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest bg-accent text-accent-foreground rounded-full mb-2">{it.tag}</span>
                <p className="font-display text-lg leading-tight">{it.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
