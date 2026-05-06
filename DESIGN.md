# Design Brief: Team Lycaura Website

## Visual Direction
Tone: Bold futurism + premium motorsport. F1 design language: sharp, aerodynamic, high-contrast, performance.
Differentiator: Interactive 3D car hero + F1 countdown lights loading + glowing neon accents throughout.

## Palette (OKLCH)
| Token | Dark L | Dark C/H | Usage |
|-------|--------|----------|-------|
| Background | 0.08 | 0/0 | Ultra-dark charcoal |
| Foreground | 0.96 | 0/0 | Near-white text |
| Primary | 0.65 | 0.28/270 | Deep purple, hero accents |
| Accent | 0.68 | 0.30/200 | Neon electric blue, glow |
| Card | 0.12 | 0/0 | Elevated surfaces |
| Muted | 0.20 | 0/0 | Secondary surfaces |
| Border | 0.20 | 0/0 | Subtle dividers |

## Typography
Display: Space Grotesk (geometric, tech-forward). Body: General Sans (clean, modern). Mono: Geist Mono (technical).

## Elevation & Depth
Glow effects as primary depth cue. Custom utilities: `glow-neon` (blue), `glow-purple` (purple), `text-glow-accent` (headers), `border-glow` (cards).

## Structural Zones
| Zone | Treatment |
|------|----------|
| Header/Nav | Semi-transparent dark with border-glow-primary |
| Hero | 3D car, glow-text titles, neon CTAs |
| Cards (team, sponsors) | bg-card border-glow, hover:scale-105 hover:glow-neon |
| Footer | bg-muted/20 border-t border-glow |

## Motion & Animation
F1 countdown lights: 5-stage (0.2s stagger). Float: 3s pulse. Glow pulse: 2s infinite. Smooth scroll: 0.3s cubic-bezier.

## Spacing
Container 2rem, sections 4rem vertical, cards 1.5rem, gap 1rem. Baseline grid: 4px multiples.

## Guardrails
No hex colors (CSS variables). Glow sparingly (hero, CTAs, active). Max 2 typefaces. Mobile-first. AA+ contrast. GPU animations.

## Signature Detail
F1 Countdown Lights Loading: 5 neon lights pulse in sequence on page init, then fade to hero. Brand-reinforcing premium speed.
