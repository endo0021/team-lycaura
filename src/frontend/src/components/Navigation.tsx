import { navLinks } from "@/data/sampleData";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = navLinks.map((l) => l.id);
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      data-ocid="nav.header"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 group"
          data-ocid="nav.logo"
          aria-label="Team Lycaura — scroll to top"
        >
          {/* SVG Logo mark */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="16,2 30,26 2,26"
              fill="none"
              stroke="oklch(0.68 0.30 200)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polygon
              points="16,8 25,24 7,24"
              fill="oklch(0.65 0.28 270 / 0.35)"
              stroke="none"
            />
          </svg>
          <span className="font-display font-bold text-base tracking-[0.12em] text-foreground uppercase group-hover:text-accent transition-colors duration-200">
            LYCAURA
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.href)}
              data-ocid={`nav.${link.id}.link`}
              className={`px-4 py-2 text-sm font-display font-medium tracking-wider uppercase transition-all duration-200 relative ${
                activeSection === link.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-px bg-accent"
                  style={{ boxShadow: "0 0 8px oklch(0.68 0.30 200 / 0.8)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.mobile_toggle"
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border"
          data-ocid="nav.mobile_menu"
        >
          <nav
            className="container mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.href)}
                data-ocid={`nav.mobile.${link.id}.link`}
                className={`px-4 py-3 text-sm font-display font-medium tracking-wider uppercase text-left transition-colors duration-200 border-l-2 ${
                  activeSection === link.id
                    ? "text-accent border-accent"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
