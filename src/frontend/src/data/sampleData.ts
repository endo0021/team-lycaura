import type {
  HotspotData,
  NavLink,
  Sponsor,
  TeamMember,
  TimelineEvent,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Car", href: "#car", id: "car" },
  { label: "Team", href: "#team", id: "team" },
  { label: "Sponsors", href: "#sponsors", id: "sponsors" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Aria Kovacs",
    role: "Team Principal",
    description:
      "Leading Lycaura with a vision for aerodynamic excellence and competitive engineering strategy.",
  },
  {
    id: "2",
    name: "Marcus Lind",
    role: "Chief Aerodynamicist",
    description:
      "Designs and optimises every surface of the car for peak downforce and drag reduction.",
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "Strategy Director",
    description:
      "Race strategy, data analysis, and performance modelling across all competition phases.",
  },
  {
    id: "4",
    name: "Ethan Mercer",
    role: "CAD & Manufacturing Lead",
    description:
      "Precision manufacturing and 3D CAD modelling for every component on the car.",
  },
  {
    id: "5",
    name: "Sofia Reyes",
    role: "Powertrain Engineer",
    description:
      "CO2 canister performance tuning and launch system optimisation for sub-second release times.",
  },
  {
    id: "6",
    name: "Zane Okafor",
    role: "Marketing & Sponsorship",
    description:
      "Building the Lycaura brand and securing sponsorship partnerships across industry sectors.",
  },
];

export const sponsors: Sponsor[] = [
  { id: "1", name: "AeroTech Industries", tier: "title" },
  { id: "2", name: "NovaDrive Systems", tier: "gold" },
  { id: "3", name: "CarbonEdge Materials", tier: "gold" },
  { id: "4", name: "Velocity Capital", tier: "silver" },
  { id: "5", name: "PrecisionWorks CNC", tier: "silver" },
  { id: "6", name: "DataStream Analytics", tier: "bronze" },
  { id: "7", name: "Apex Engineering School", tier: "partner" },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2021",
    title: "Team Founded",
    description:
      "Team Lycaura formed by six passionate engineering students with a shared dream of F1 competition.",
    milestone: true,
  },
  {
    id: "2",
    year: "2022",
    title: "First CAD Model Complete",
    description:
      "Completed first full aerodynamic model using Fusion 360 and ANSYS fluid simulation.",
  },
  {
    id: "3",
    year: "2023",
    title: "Regional Championships — 2nd Place",
    description:
      "Lycaura MK1 secured 2nd place at the Regional F1 in Schools championships, qualifying for nationals.",
    milestone: true,
  },
  {
    id: "4",
    year: "2024",
    title: "National Finals Qualifier",
    description:
      "Lycaura MK2 entered the National Finals with a car featuring a redesigned front wing assembly.",
    milestone: true,
  },
  {
    id: "5",
    year: "2025",
    title: "World Finals Target",
    description:
      "Engineering the MK3 — our most ambitious car yet — with a clear target to compete on the world stage.",
    milestone: true,
  },
];

export const hotspots: HotspotData[] = [
  {
    id: "front-wing",
    label: "Front Wing",
    description:
      "Multi-element front wing with cascade flaps generating high downforce at the leading edge while managing airflow to the undertray.",
    position: { x: 15, y: 55 },
    category: "aerodynamics",
  },
  {
    id: "rear-wing",
    label: "Rear Wing",
    description:
      "High-angle rear wing with endplates designed to balance rear downforce against straight-line drag for optimal track performance.",
    position: { x: 82, y: 30 },
    category: "aerodynamics",
  },
  {
    id: "sidepod",
    label: "Sidepods",
    description:
      "Undercut sidepod design channels airflow efficiently to the rear diffuser, increasing ground effect downforce.",
    position: { x: 55, y: 45 },
    category: "chassis",
  },
  {
    id: "co2-system",
    label: "CO₂ Launch System",
    description:
      "Precision-tuned CO₂ canister system providing 0-4m acceleration in under 1 second with consistent pressure delivery.",
    position: { x: 50, y: 60 },
    category: "powertrain",
  },
];
