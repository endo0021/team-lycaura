import { teamMembers } from "@/data/sampleData";
import type { TeamMember } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

// ── Avatar initials helper ──────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

// ── Role → accent color map ─────────────────────────────────────────────────
const ROLE_COLORS: Record<string, string> = {
  "Team Principal": "text-accent bg-accent/10 border-accent/30",
  "Chief Aerodynamicist": "text-primary bg-primary/10 border-primary/30",
  "Strategy Director": "text-accent bg-accent/10 border-accent/30",
  "CAD & Manufacturing Lead": "text-primary bg-primary/10 border-primary/30",
  "Powertrain Engineer": "text-accent bg-accent/10 border-accent/30",
  "Marketing & Sponsorship": "text-primary bg-primary/10 border-primary/30",
};

function getRoleBadgeClass(role: string): string {
  return ROLE_COLORS[role] ?? "text-accent bg-accent/10 border-accent/30";
}

// ── Avatar ring colors alternate between primary and accent ─────────────────
const AVATAR_GLOW = [
  "0 0 0 2px oklch(var(--primary) / 0.7), 0 0 12px oklch(var(--primary) / 0.4)",
  "0 0 0 2px oklch(var(--accent) / 0.7), 0 0 12px oklch(var(--accent) / 0.4)",
];

// ── Member card ─────────────────────────────────────────────────────────────
function TeamMemberCard({
  member,
  index,
  visible,
}: {
  member: TeamMember;
  index: number;
  visible: boolean;
}) {
  const initials = getInitials(member.name);
  const badgeClass = getRoleBadgeClass(member.role);
  const avatarGlow = AVATAR_GLOW[index % 2];
  const delay = `${index * 100}ms`;

  return (
    <div
      className="group relative bg-card border border-border rounded-sm p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 cursor-default"
      style={{
        transitionDelay: delay,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        backdropFilter: "blur(8px)",
        background: visible
          ? "oklch(var(--card) / 0.85)"
          : "oklch(var(--card) / 0.85)",
        boxShadow: undefined,
      }}
      data-ocid={`team.member.${index + 1}`}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 30px oklch(var(--primary) / 0.08), 0 0 25px oklch(var(--primary) / 0.12)",
        }}
        aria-hidden="true"
      />

      {/* Top row: avatar + name/role */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover"
              style={{ boxShadow: avatarGlow }}
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-xl text-primary"
              style={{
                background: "oklch(var(--primary) / 0.12)",
                boxShadow: avatarGlow,
              }}
            >
              {initials}
            </div>
          )}
          {/* Animated ring pulse */}
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20"
            style={{
              animationDuration: "2s",
              background: "oklch(var(--primary) / 0.3)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Name + role badge */}
        <div className="min-w-0">
          <h3 className="font-display font-bold text-foreground text-base truncate">
            {member.name}
          </h3>
          <span
            className={`inline-block mt-1 px-2.5 py-0.5 rounded-sm border text-[10px] font-mono font-medium tracking-widest uppercase transition-all duration-300 group-hover:brightness-125 ${badgeClass}`}
          >
            {member.role}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {member.description}
      </p>

      {/* Social links */}
      <div className="flex gap-3 mt-auto pt-2 border-t border-border/50">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
            aria-label={`${member.name} LinkedIn`}
            data-ocid={`team.member.${index + 1}.linkedin_link`}
          >
            <FaLinkedin size={16} />
          </a>
        )}
        {member.instagram && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label={`${member.name} Instagram`}
            data-ocid={`team.member.${index + 1}.social_link`}
          >
            <FaXTwitter size={14} />
          </a>
        )}
        {!member.linkedin && !member.instagram && (
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-accent transition-colors duration-200"
            aria-label={`${member.name} LinkedIn`}
            data-ocid={`team.member.${index + 1}.linkedin_link`}
          >
            <FaLinkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

// ── TeamSection ──────────────────────────────────────────────────────────────
export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 bg-muted/20 relative overflow-hidden"
      data-ocid="team.section"
    >
      {/* Subtle dot grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(var(--primary) / 1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">
            THE PEOPLE
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            The Team
          </h2>
          {/* Neon accent underline */}
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
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Meet the engineers behind Team Lycaura
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={idx}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
