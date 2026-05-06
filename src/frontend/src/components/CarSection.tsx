import { useThreeJSCar } from "@/hooks/useThreeJSCar";
import { useRef, useState } from "react";

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: number; // % from left of canvas
  y: number; // % from top of canvas
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "aerodynamics",
    label: "Aerodynamics",
    description:
      "Every surface is optimised using ANSYS CFD simulation. Our underbody venturi channels generate high-downforce ground effect, while the upper bodywork minimises drag to maximise straight-line performance.",
    x: 50,
    y: 22,
  },
  {
    id: "front-wing",
    label: "Front Wing",
    description:
      "Multi-element front wing with cascade flap endplates and a precision-twisted leading edge. The wing generates 62% of total front-axle downforce while directing airflow to the undertray.",
    x: 12,
    y: 52,
  },
  {
    id: "body",
    label: "Body & Chassis",
    description:
      "Milled from high-density polyurethane foam and finished with carbon-fibre vinyl, the monocoque achieves a torsional stiffness that rivals professional designs at a fraction of the weight.",
    x: 40,
    y: 60,
  },
  {
    id: "rear-wheels",
    label: "Rear Wheels",
    description:
      "Precision-turned aluminium rear wheels feature low-profile tyres chosen for optimal rolling resistance. The rear axle geometry is tuned to maintain traction during the CO2 canister launch phase.",
    x: 82,
    y: 55,
  },
];

const STATS = [
  { value: "0.92s", label: "0-4m Sprint" },
  { value: "380g", label: "Car Mass" },
  { value: "2.4:1", label: "Downforce Ratio" },
  { value: "48h", label: "CFD Simulation" },
];

export function CarSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stopAutoRotate, startAutoRotate } = useThreeJSCar(canvasRef, {
    autoRotate: true,
  });
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const toggleHotspot = (id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
    stopAutoRotate();
  };

  return (
    <section
      id="car"
      className="py-24 bg-background relative overflow-hidden"
      data-ocid="car.section"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.68 0.30 200 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.30 200 / 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3 text-glow-accent">
            THE MACHINE
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Lycaura MK3
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Our most ambitious car yet &mdash; engineered for the World Finals.
            Click any hotspot to explore the technology behind the machine.
          </p>
        </div>

        {/* 3D Canvas with hotspots */}
        <div
          className="relative max-w-4xl mx-auto rounded-sm border border-border overflow-hidden"
          style={{
            boxShadow:
              "0 0 60px oklch(0.65 0.28 270 / 0.12), 0 0 120px oklch(0.68 0.30 200 / 0.06)",
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full block"
            style={{ height: "520px", cursor: "grab" }}
            onPointerDown={() => stopAutoRotate()}
            onPointerUp={() => startAutoRotate()}
            aria-label="Interactive 3D model of Lycaura MK3. Drag to rotate, scroll to zoom."
            data-ocid="car.canvas"
          />

          {/* Hotspot buttons */}
          {HOTSPOTS.map((hs) => (
            <HotspotPin
              key={hs.id}
              hotspot={hs}
              isActive={activeHotspot === hs.id}
              onToggle={toggleHotspot}
            />
          ))}

          {/* Controls hint */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground/70 uppercase bg-background/60 px-3 py-1 rounded-sm backdrop-blur-sm">
              Drag to rotate &bull; Scroll to zoom
            </p>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-card border border-border rounded-sm p-6 hover:border-accent/40 transition-all duration-300"
              data-ocid={`car.stat.${stat.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
            >
              <p className="font-display font-bold text-3xl text-accent text-glow-accent mb-2">
                {stat.value}
              </p>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HotspotPin sub-component ───────────────────────────────────────────────────

function HotspotPin({
  hotspot,
  isActive,
  onToggle,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  onToggle: (id: string) => void;
}) {
  const isLeft = hotspot.x > 55;

  return (
    <div
      className="absolute"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 30 : 20,
      }}
    >
      {/* Ping ring */}
      {!isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "oklch(0.68 0.30 200 / 0.25)",
            animationDuration: "2s",
          }}
          aria-hidden="true"
        />
      )}

      {/* Button */}
      <button
        type="button"
        onClick={() => onToggle(hotspot.id)}
        className={`relative w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground scale-110"
            : "bg-accent text-accent-foreground hover:scale-110"
        }`}
        style={{
          boxShadow: isActive
            ? "0 0 18px oklch(0.65 0.28 270 / 0.8)"
            : "0 0 14px oklch(0.68 0.30 200 / 0.7)",
        }}
        aria-label={`Hotspot: ${hotspot.label}`}
        aria-expanded={isActive}
        data-ocid={`car.hotspot.${hotspot.id}`}
      >
        {isActive ? "\u00D7" : "+"}
      </button>

      {/* Info panel */}
      {isActive && (
        <div
          className="absolute w-64 bg-card border border-primary/40 rounded-sm p-4 shadow-2xl"
          style={{
            top: "110%",
            ...(isLeft
              ? { right: 0, transform: "none" }
              : { left: "50%", transform: "translateX(-50%)" }),
            boxShadow:
              "0 0 24px oklch(0.65 0.28 270 / 0.25), 0 4px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Connector line */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/50"
            aria-hidden="true"
          />
          <p className="font-mono text-[10px] tracking-widest text-accent uppercase mb-1">
            Hotspot
          </p>
          <h4 className="font-display font-bold text-sm text-foreground mb-2">
            {hotspot.label}
          </h4>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            {hotspot.description}
          </p>
        </div>
      )}
    </div>
  );
}
