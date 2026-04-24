const leaders = [
  { role: "Chairperson", name: "Position Open" },
  { role: "Vice Chairperson", name: "Position Open" },
  { role: "Secretary", name: "Position Open" },
  { role: "Treasurer", name: "Position Open" },
  { role: "Project Coordinator", name: "Position Open" },
  { role: "Event Coordinator", name: "Position Open" },
  { role: "Welfare Officer", name: "Position Open" },
  { role: "ICT Director", name: "Position Open" },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Leadership</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-primary">The team steering the chapter.</h2>
          </div>
          <p className="text-muted-foreground max-w-md">Eight servant-leaders elected each academic year to coordinate events, welfare, projects and finances on behalf of the chapter.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((l, i) => (
            <div key={l.role} className="relative overflow-hidden rounded-2xl bg-card border border-border/60 p-6 hover:border-accent/60 transition-smooth">
              <span className="absolute top-4 right-4 text-xs font-mono text-accent/60">0{i + 1}</span>
              <p className="font-display text-2xl text-primary leading-tight">{l.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{l.name}</p>
              <div className="mt-6 h-1 w-12 bg-gold rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
