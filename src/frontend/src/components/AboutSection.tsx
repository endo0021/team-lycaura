import { timelineEvents } from "@/data/sampleData";
import type { TimelineEvent } from "@/types";
import { useEffect, useRef, useState } from "react";

// ── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Timeline item ───────────────────────────────────────────────────────────
function TimelineItem({
  event,
  index,
  inView,
}: {
  event: TimelineEvent;
  index: number;
  inView: boolean;
}) {
  const isRight = index % 2 === 1;
  const delay = index * 120;

  return (
    <div
      className={[
        "relative flex w-full md:items-center",
        isRight ? "md:flex-row-reverse" : "md:flex-row",
        "flex-row gap-0",
      ].join(" ")}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "none"
          : `translateX(${isRight ? "40px" : "-40px"})`,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
      data-ocid={`about.timeline.item.${index + 1}`}
    >
      {/* Desktop: side panel */}
      <div className="hidden md:flex md:w-[calc(50%-2rem)] flex-col items-end">
        {!isRight && (
          <div
            className={`bg-card border rounded-sm p-5 w-full text-right ${
              event.milestone ? "border-accent/40" : "border-border"
            }`}
            style={
              event.milestone
                ? { boxShadow: "0 0 20px oklch(0.68 0.30 200 / 0.08)" }
                : {}
            }
          >
            <p className="font-mono text-xs text-accent mb-1 tracking-widest">
              {event.year}
            </p>
            <h4 className="font-display font-bold text-foreground mb-1">
              {event.title}
            </h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        )}
      </div>

      {/* Center spine + dot */}
      <div className="hidden md:flex flex-col items-center w-16 shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs z-10 shrink-0 ${
            event.milestone
              ? "bg-accent text-accent-foreground"
              : "bg-card border border-border text-muted-foreground"
          }`}
          style={
            event.milestone
              ? { boxShadow: "0 0 14px oklch(0.68 0.30 200 / 0.6)" }
              : {}
          }
        >
          {event.year.slice(2)}
        </div>
      </div>

      {/* Right desktop content */}
      <div className="hidden md:flex md:w-[calc(50%-2rem)] flex-col">
        {isRight && (
          <div
            className={`bg-card border rounded-sm p-5 w-full ${
              event.milestone ? "border-accent/40" : "border-border"
            }`}
            style={
              event.milestone
                ? { boxShadow: "0 0 20px oklch(0.68 0.30 200 / 0.08)" }
                : {}
            }
          >
            <p className="font-mono text-xs text-accent mb-1 tracking-widest">
              {event.year}
            </p>
            <h4 className="font-display font-bold text-foreground mb-1">
              {event.title}
            </h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden items-start gap-4 w-full">
        {/* Mobile dot */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 ${
            event.milestone
              ? "bg-accent text-accent-foreground"
              : "bg-card border border-border text-muted-foreground"
          }`}
          style={
            event.milestone
              ? { boxShadow: "0 0 14px oklch(0.68 0.30 200 / 0.6)" }
              : {}
          }
        >
          {event.year.slice(2)}
        </div>
        <div
          className={`bg-card border rounded-sm p-5 flex-1 ${
            event.milestone ? "border-accent/40" : "border-border"
          }`}
        >
          <p className="font-mono text-xs text-accent mb-1 tracking-widest">
            {event.year}
          </p>
          <h4 className="font-display font-bold text-foreground mb-1">
            {event.title}
          </h4>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ────────────────────────────────────────────────────────────
export function AboutSection() {
  const introView = useInView(0.1);
  const timelineView = useInView(0.05);

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      data-ocid="about.section"
    >
      {/* Diagonal stripe background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(" +
            "-55deg," +
            "transparent," +
            "transparent 60px," +
            "oklch(0.65 0.28 270 / 0.025) 60px," +
            "oklch(0.65 0.28 270 / 0.025) 61px" +
            ")",
        }}
      />
      {/* Subtle muted background */}
      <div
        className="absolute inset-0 bg-muted/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3 text-glow-accent">
            WHO WE ARE
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground relative inline-block">
            About Team Lycaura
            {/* Neon accent underline */}
            <span
              className="block mt-2 h-[3px] w-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.68 0.30 200), oklch(0.65 0.28 270), transparent)",
                boxShadow:
                  "0 0 12px oklch(0.68 0.30 200 / 0.7), 0 0 24px oklch(0.68 0.30 200 / 0.4)",
              }}
              aria-hidden="true"
            />
          </h2>
        </div>

        {/* Two-column intro */}
        <div
          ref={introView.ref}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          style={{
            opacity: introView.inView ? 1 : 0,
            transform: introView.inView ? "none" : "translateY(32px)",
            transition:
              "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Left: text */}
          <div className="space-y-6">
            <p className="font-body text-muted-foreground leading-relaxed">
              Team Lycaura is a student-led engineering team competing in{" "}
              <span className="text-foreground font-semibold">
                F1 in Schools
              </span>{" "}
              &mdash; the world&rsquo;s largest STEM competition that challenges
              students to design, manufacture, and race miniature
              CO&#8322;-powered Formula 1 cars. Using real-world tools like CAD,
              CFD simulation, and precision CNC manufacturing, we bring
              professional motorsport engineering into the classroom.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              F1 in Schools gives students a unique gateway into engineering,
              marketing, and project management &mdash; with competitions
              running from regional to National and World Finals. For Team
              Lycaura, it is not just a competition. It is a proving ground for
              the engineers of tomorrow.
            </p>

            {/* Mission & Vision blocks */}
            <div className="space-y-4 pt-2">
              <div
                className="border-l-2 border-accent pl-4 py-1"
                style={{ borderImage: "none" }}
                data-ocid="about.mission_block"
              >
                <p className="font-mono text-[10px] tracking-[0.35em] text-accent uppercase mb-1">
                  Mission
                </p>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  To engineer the fastest, most precise student F1 car and
                  compete at the highest level of F1 in Schools.
                </p>
              </div>
              <div
                className="border-l-2 border-primary pl-4 py-1"
                data-ocid="about.vision_block"
              >
                <p className="font-mono text-[10px] tracking-[0.35em] text-primary uppercase mb-1">
                  Vision
                </p>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  To inspire the next generation of engineers through
                  competitive motorsport and STEM excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Right: visual accent panel */}
          <div className="relative">
            <div
              className="relative bg-card border border-border rounded-sm overflow-hidden p-8"
              style={{
                boxShadow:
                  "inset 0 0 60px oklch(0.65 0.28 270 / 0.06), 0 0 0 1px oklch(0.65 0.28 270 / 0.15)",
              }}
            >
              {/* Corner decorators */}
              <div
                className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent"
                aria-hidden="true"
              />
              <div
                className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent"
                aria-hidden="true"
              />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                {ABOUT_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p
                      className="font-display font-bold text-3xl text-accent mb-1"
                      style={{
                        textShadow:
                          "0 0 20px oklch(0.68 0.30 200 / 0.5), 0 0 10px oklch(0.68 0.30 200 / 0.3)",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* F1 in Schools badge */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                  Competing in
                </p>
                <p
                  className="font-display font-bold text-lg text-foreground tracking-wider"
                  style={{
                    textShadow: "0 0 12px oklch(0.65 0.28 270 / 0.4)",
                  }}
                >
                  F1 in Schools
                </p>
                <p className="font-mono text-xs text-primary mt-1 tracking-widest">
                  World Championship 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline heading */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
            OUR JOURNEY
          </p>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Team Milestones
          </h3>
        </div>

        {/* Timeline */}
        <div
          ref={timelineView.ref}
          className="relative max-w-4xl mx-auto"
          data-ocid="about.timeline"
        >
          {/* Vertical spine — desktop only */}
          <div
            className="absolute hidden md:block left-1/2 -translate-x-1/2 top-5 bottom-5 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.68 0.30 200 / 0.4) 10%, oklch(0.65 0.28 270 / 0.4) 90%, transparent)",
              boxShadow: "0 0 8px oklch(0.68 0.30 200 / 0.2)",
            }}
            aria-hidden="true"
          />
          {/* Vertical spine — mobile */}
          <div
            className="absolute md:hidden left-5 top-5 bottom-5 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-6 pl-14 md:pl-0">
            {timelineEvents.map((event, idx) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={idx}
                inView={timelineView.inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ABOUT_STATS = [
  { value: "4+", label: "Years Active" },
  { value: "6", label: "Team Members" },
  { value: "MK3", label: "Current Car" },
  { value: "WF", label: "2025 Target" },
];
