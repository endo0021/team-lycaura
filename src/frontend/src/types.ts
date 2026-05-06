export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  tier: "title" | "gold" | "silver" | "bronze" | "partner";
  website?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export interface HotspotData {
  id: string;
  label: string;
  description: string;
  position: { x: number; y: number };
  category: "aerodynamics" | "powertrain" | "chassis" | "suspension";
}
