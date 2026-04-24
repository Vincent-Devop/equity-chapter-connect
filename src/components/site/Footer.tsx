import logo from "@/assets/logo.jpeg";

export default function Footer() {
  return (
    <footer id="contact" className="bg-hero text-primary-foreground mt-24">
      <div className="container py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="ELP logo" className="w-12 h-12 rounded-full ring-2 ring-accent/60" />
            <div>
              <p className="font-display text-xl">Equity Leaders Program</p>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Machakos University</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/80 max-w-xs">
            Empowering possibilities — nurturing the next generation of African leaders through scholarship, service and mentorship.
          </p>
        </div>
        <div>
          <p className="font-display text-lg mb-3 text-accent">Contact</p>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            <li>Machakos University, Machakos, Kenya</li>
            <li>elp.machakos@students.mksu.ac.ke</li>
            <li>+254 700 000 000</li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg mb-3 text-accent">Chapter</p>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            <li>Membership: KES 200 / semester</li>
            <li>Semester 1: Jan – Apr</li>
            <li>Semester 2: Sep – Dec</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Equity Leaders Program — Machakos University Chapter. Empowering Possibilities.
      </div>
    </footer>
  );
}
