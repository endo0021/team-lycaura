import { useThreeJSCar } from "@/hooks/useThreeJSCar";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const { stopAutoRotate, startAutoRotate } = useThreeJSCar(canvasRef, {
    autoRotate: true,
  });

  // Particle background
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 80;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        hue: Math.random() > 0.5 ? 200 : 270,
      });
    }

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = "oklch(0.68 0.30 200 / 0.06)";
      ctx.lineWidth = 0.5;
      const gs = 80;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 200
            ? "oklch(0.68 0.30 200 / 0.55)"
            : "oklch(0.65 0.28 270 / 0.45)";
        ctx.fill();

        // Soft glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(
          0,
          p.hue === 200
            ? "oklch(0.68 0.30 200 / 0.15)"
            : "oklch(0.65 0.28 270 / 0.12)",
        );
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-16"
      data-ocid="hero.section"
    >
      {/* Particle / grid background canvas */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.65 0.28 270 / 0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content: 2-column layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center flex-1 container mx-auto px-4 py-20 gap-8 lg:gap-0">
        {/* LEFT: text */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
          <p
            className="font-mono text-xs tracking-[0.45em] text-accent uppercase mb-5 text-glow-accent"
            style={{ letterSpacing: "0.4em" }}
          >
            F1 IN SCHOOLS &mdash; WORLD CHAMPIONSHIP
          </p>

          <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl leading-[1.0] text-foreground mb-6">
            ENGINEERING
            <br />
            <span className="text-primary text-glow-primary">THE FUTURE</span>
            <br />
            OF SPEED.
          </h1>

          <p className="font-body text-base md:text-lg text-muted-foreground mb-4 max-w-md">
            Team Lycaura &mdash; competing at the cutting edge of student
            motorsport engineering.
          </p>

          {/* Thin divider accent */}
          <div
            className="w-24 h-px mb-8 self-center lg:self-start"
            style={{
              background:
                "linear-gradient(to right, oklch(0.68 0.30 200), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => scrollTo("car")}
              className="px-8 py-3 bg-accent text-accent-foreground font-display font-bold text-sm tracking-widest uppercase rounded-sm glow-neon hover:opacity-90 transition-all duration-200"
              data-ocid="hero.explore_car_button"
            >
              Explore Car
            </button>
            <button
              type="button"
              onClick={() => scrollTo("team")}
              className="px-8 py-3 border border-primary/50 text-primary font-display font-bold text-sm tracking-widest uppercase rounded-sm border-glow-primary hover:bg-primary/10 transition-all duration-200"
              data-ocid="hero.meet_team_button"
            >
              Meet the Team
            </button>
          </div>
        </div>

        {/* RIGHT: 3D canvas */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[340px] lg:min-h-[500px] relative">
          {/* Decorative corner frames */}
          <div
            className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-accent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-accent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-accent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-accent pointer-events-none"
            aria-hidden="true"
          />

          <canvas
            ref={canvasRef}
            className="w-full h-full min-h-[340px] lg:min-h-[480px] rounded-sm"
            style={{ cursor: "grab" }}
            onPointerDown={() => stopAutoRotate()}
            onPointerUp={() => startAutoRotate()}
            aria-label="Interactive 3D model of Team Lycaura F1 car. Drag to rotate, scroll to zoom."
            data-ocid="hero.car_canvas"
          />

          <p
            className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mt-3 text-center"
            aria-hidden="true"
          >
            Drag to rotate &bull; Scroll to zoom
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-accent opacity-70" />
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Scroll
        </p>
      </div>
    </section>
  );
}
