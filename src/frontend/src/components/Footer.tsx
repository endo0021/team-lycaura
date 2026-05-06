const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

const YEAR = new Date().getFullYear();
const CAFFEINE_URL = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}}`;

function scrollTo(id: string) {
  document
    .getElementById(id.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer
      className="bg-card relative"
      style={{ borderTop: "1px solid oklch(0.68 0.30 200 / 0.25)" }}
      data-ocid="footer.section"
    >
      {/* Top accent line glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.68 0.30 200 / 0.5) 40%, oklch(0.65 0.28 270 / 0.4) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start mb-8">
          {/* Left: brand */}
          <div className="sm:col-span-1">
            <p
              className="font-display font-bold text-lg text-foreground tracking-widest uppercase"
              style={{ letterSpacing: "0.18em" }}
            >
              TEAM <span className="text-accent text-glow-accent">LYCAURA</span>
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-1">
              Engineering the Future of Speed
            </p>
          </div>

          {/* Center: nav */}
          <nav
            className="sm:col-span-1 flex flex-wrap justify-start sm:justify-center gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase hover:text-accent transition-colors duration-200"
                data-ocid={`footer.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: copyright */}
          <div className="sm:col-span-1 sm:text-right">
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground">
              &copy; {YEAR} Team Lycaura.
            </p>
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground">
              All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom: caffeine branding */}
        <div className="border-t border-border/50 pt-5 text-center">
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            Built with love using{" "}
            <a
              href={CAFFEINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
              data-ocid="footer.caffeine_link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
