import { sponsors } from "@/data/sampleData";
import type { Sponsor } from "@/types";

// ── Tier config ─────────────────────────────────────────────────────────────
const TIER_CONFIG: Record<
  Sponsor["tier"],
  { label: string; badgeClass: string; cardClass: string }
> = {
  title: {
    label: "Title Partner",
    badgeClass: "bg-accent/15 border-accent/50 text-accent",
    cardClass: "border-accent/40 hover:border-accent/70",
  },
  gold: {
    label: "Gold",
    badgeClass:
      "bg-[oklch(0.82_0.18_85/0.10)] border-[oklch(0.82_0.18_85/0.40)] text-[oklch(0.82_0.18_85)]",
    cardClass:
      "border-[oklch(0.82_0.18_85/0.25)] hover:border-[oklch(0.82_0.18_85/0.50)]",
  },
  silver: {
    label: "Silver",
    badgeClass: "bg-foreground/10 border-foreground/30 text-foreground/80",
    cardClass: "border-border hover:border-foreground/30",
  },
  bronze: {
    label: "Bronze",
    badgeClass: "bg-orange-400/10 border-orange-400/30 text-orange-400/80",
    cardClass: "border-border hover:border-orange-400/30",
  },
  partner: {
    label: "Partner",
    badgeClass: "bg-primary/10 border-primary/30 text-primary",
    cardClass: "border-primary/25 hover:border-primary/50",
  },
};

// ── Sponsor logo placeholder SVG ────────────────────────────────────────────
function SponsorLogoSVG({
  name,
  tier,
}: { name: string; tier: Sponsor["tier"] }) {
  const accentHue =
    tier === "title" || tier === "bronze"
      ? "oklch(0.68 0.30 200)"
      : tier === "gold"
        ? "oklch(0.82 0.18 85)"
        : tier === "silver"
          ? "oklch(0.75 0.02 0)"
          : "oklch(0.65 0.28 270)";

  return (
    <svg
      viewBox="0 0 160 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-labelledby={`sponsor-title-${name.replace(/\s+/g, "-")}`}
    >
      <title id={`sponsor-title-${name.replace(/\s+/g, "-")}`}>{name}</title>
      {/* Background rect with subtle gradient */}
      <rect
        x="0"
        y="0"
        width="160"
        height="56"
        rx="4"
        fill="oklch(0.15 0.01 270 / 0.6)"
      />
      {/* Top accent bar */}
      <rect
        x="0"
        y="0"
        width="160"
        height="2"
        rx="1"
        fill={accentHue}
        opacity="0.6"
      />
      {/* Decorative bracket left */}
      <path
        d="M12 14 L6 14 L6 42 L12 42"
        stroke={accentHue}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Decorative bracket right */}
      <path
        d="M148 14 L154 14 L154 42 L148 42"
        stroke={accentHue}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Company name text */}
      <text
        x="80"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif"
        letterSpacing="1"
        fill="oklch(0.9 0.01 0)"
      >
        {name.toUpperCase()}
      </text>
    </svg>
  );
}

// ── Carousel track (duplicated for infinite loop) ────────────────────────────
function SponsorCarousel() {
  // Duplicate sponsors for seamless infinite scroll
  const items = [...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden" aria-label="Sponsor carousel">
      {/* Edge fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, oklch(var(--background) / 1), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(-90deg, oklch(var(--background) / 1), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="flex gap-6 carousel-track" aria-hidden="true">
        {items.map((sponsor, idx) => {
          const cfg = TIER_CONFIG[sponsor.tier];
          return (
            <div
              key={`${sponsor.id}-${idx}`}
              className="shrink-0 w-44 h-16 flex items-center justify-center"
            >
              <div
                className={`w-full h-full border rounded-sm overflow-hidden transition-all duration-300 hover:scale-105 ${cfg.cardClass}`}
              >
                <SponsorLogoSVG name={sponsor.name} tier={sponsor.tier} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Sponsor card grid (visible individual sponsors with tier badges) ──────────
function SponsorGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
      {sponsors.map((sponsor, idx) => {
        const cfg = TIER_CONFIG[sponsor.tier];
        return (
          <div
            key={sponsor.id}
            className={`group relative flex flex-col items-center justify-center gap-3 bg-card border rounded-sm p-5 min-h-[110px] transition-all duration-300 hover:-translate-y-1 ${cfg.cardClass}`}
            data-ocid={`sponsors.item.${idx + 1}`}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: "0 0 20px oklch(var(--accent) / 0.08)",
              }}
              aria-hidden="true"
            />
            <div className="w-full h-10">
              <SponsorLogoSVG name={sponsor.name} tier={sponsor.tier} />
            </div>
            <span
              className={`px-2 py-0.5 rounded-sm border text-[9px] font-mono font-semibold tracking-[0.2em] uppercase ${cfg.badgeClass}`}
            >
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── SponsorsSection ──────────────────────────────────────────────────────────
export function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="py-24 bg-background relative overflow-hidden"
      data-ocid="sponsors.section"
    >
      {/* Background subtle gradient sweep */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, oklch(var(--primary) / 1) 25%, transparent 50%, oklch(var(--accent) / 1) 75%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
            OFFICIAL PARTNERS
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Our Partners
          </h2>
          {/* Neon underline */}
          <div className="flex justify-center mb-6">
            <div
              className="h-0.5 w-24 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(var(--accent) / 1), transparent)",
                boxShadow: "0 0 10px oklch(var(--accent) / 0.6)",
              }}
            />
          </div>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Industry-leading organisations powering the next generation of
            engineering talent.
          </p>
        </div>

        {/* Sponsorship pitch */}
        <div
          className="max-w-3xl mx-auto text-center mb-14 px-6 py-8 bg-card border border-primary/15 rounded-sm"
          style={{
            backdropFilter: "blur(8px)",
            boxShadow: "inset 0 0 40px oklch(var(--primary) / 0.04)",
          }}
        >
          <p className="font-body text-muted-foreground text-sm leading-relaxed">
            Partnering with Team Lycaura places your brand at the intersection
            of elite STEM education and the global motorsport stage. Our
            competitions reach thousands of engineers, educators, and motorsport
            fans worldwide &mdash; giving sponsors unmatched visibility among
            tomorrow&#39;s technical talent. Together, we are engineering the
            future of speed.
          </p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="mb-14">
          <SponsorCarousel />
        </div>

        {/* Individual sponsor cards grid */}
        <SponsorGrid />

        {/* Become a Sponsor CTA */}
        <div
          className="max-w-2xl mx-auto text-center bg-card border border-accent/20 rounded-sm p-10"
          style={{
            backdropFilter: "blur(8px)",
            boxShadow:
              "inset 0 0 40px oklch(var(--accent) / 0.04), 0 0 40px oklch(var(--accent) / 0.06)",
          }}
        >
          <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase mb-3">
            PARTNER WITH US
          </p>
          <h3 className="font-display font-bold text-2xl text-foreground mb-3">
            Become a Sponsor
          </h3>
          <p className="font-body text-muted-foreground mb-7 text-sm leading-relaxed">
            Put your brand in front of thousands of engineers and motorsport
            fans. Your investment directly funds our bid for the World Finals
            &mdash; and aligns your brand with the cutting edge of student
            innovation.
          </p>
          <button
            type="button"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-display font-bold text-sm tracking-widest uppercase rounded-sm glow-neon hover:opacity-90 transition-all duration-200"
            data-ocid="sponsors.become_sponsor_button"
          >
            Get in Touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
