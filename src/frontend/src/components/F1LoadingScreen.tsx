import { useEffect, useState } from "react";

interface F1LoadingScreenProps {
  onComplete: () => void;
}

export function F1LoadingScreen({ onComplete }: F1LoadingScreenProps) {
  const [phase, setPhase] = useState<"lights-on" | "lights-out" | "fading">(
    "lights-on",
  );
  const [litLights, setLitLights] = useState<number[]>([]);

  useEffect(() => {
    // Stagger lights on: 0, 200, 400, 600, 800ms
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < 5; i++) {
      timers.push(
        setTimeout(() => {
          setLitLights((prev) => [...prev, i]);
        }, i * 220),
      );
    }

    // All 5 lights on at ~1100ms — hold for 600ms, then lights out
    timers.push(
      setTimeout(() => {
        setPhase("lights-out");
        setLitLights([]);
      }, 1100 + 600),
    );

    // Fade overlay after lights go out
    timers.push(
      setTimeout(
        () => {
          setPhase("fading");
        },
        1100 + 600 + 300,
      ),
    );

    // Complete: remove overlay
    timers.push(
      setTimeout(
        () => {
          onComplete();
        },
        1100 + 600 + 300 + 600,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading Team Lycaura"
      aria-live="polite"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.30 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.30 200 / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Logo */}
      <div className="mb-12 text-center">
        <span className="font-display text-3xl font-bold tracking-[0.2em] text-foreground uppercase">
          TEAM <span className="text-accent text-glow-accent">LYCAURA</span>
        </span>
      </div>

      {/* F1 Lights */}
      <output className="flex items-center gap-5 mb-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative"
            style={{
              transition: "all 0.15s ease-out",
              transform: litLights.includes(i) ? "scale(1)" : "scale(0.85)",
            }}
          >
            {/* Light housing */}
            <div
              className="w-10 h-10 rounded-full border-2"
              style={{
                borderColor: litLights.includes(i)
                  ? "oklch(0.55 0.28 25)"
                  : "oklch(0.30 0.02 0)",
                backgroundColor: litLights.includes(i)
                  ? "oklch(0.65 0.30 25)"
                  : "oklch(0.14 0.01 0)",
                boxShadow: litLights.includes(i)
                  ? "0 0 20px oklch(0.65 0.30 25 / 0.9), 0 0 40px oklch(0.55 0.28 25 / 0.5), 0 0 60px oklch(0.45 0.25 25 / 0.3)"
                  : "none",
              }}
            />
          </div>
        ))}
      </output>

      {/* Label */}
      <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
        {phase === "lights-on" ? "INITIALISING SYSTEMS..." : "GO GO GO"}
      </p>
    </div>
  );
}
