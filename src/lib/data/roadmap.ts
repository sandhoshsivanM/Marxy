import type { LucideIcon } from "lucide-react";
import {
  Telescope,
  PenTool,
  Hammer,
  Rocket,
  Workflow,
  LineChart,
  TrendingUp,
} from "lucide-react";

export interface RoadmapStep {
  id: string;
  label: string;
  icon: LucideIcon;
  detail: string;
}

export const roadmap: RoadmapStep[] = [
  { id: "discover", label: "Discover", icon: Telescope, detail: "Audit funnel, data & economics" },
  { id: "strategy", label: "Strategy", icon: PenTool, detail: "Design the revenue system" },
  { id: "build", label: "Build", icon: Hammer, detail: "Ship pages, CRM & tracking" },
  { id: "launch", label: "Launch", icon: Rocket, detail: "Go live across channels" },
  { id: "automate", label: "Automate", icon: Workflow, detail: "Wire AI agents & flows" },
  { id: "optimize", label: "Optimize", icon: LineChart, detail: "Test, learn, compound" },
  { id: "scale", label: "Scale", icon: TrendingUp, detail: "Pour fuel on what works" },
];

/** Operating-system node graph for the OperatingSystem section. */
export interface OsNode {
  id: string;
  label: string;
  /** grid position 0..1 for layout */
  x: number;
  y: number;
}

export const osNodes: OsNode[] = [
  { id: "traffic", label: "Traffic", x: 0.06, y: 0.5 },
  { id: "landing", label: "Landing Page", x: 0.22, y: 0.24 },
  { id: "crm", label: "CRM", x: 0.38, y: 0.66 },
  { id: "ai", label: "AI", x: 0.5, y: 0.32 },
  { id: "email", label: "Email", x: 0.62, y: 0.7 },
  { id: "whatsapp", label: "WhatsApp", x: 0.72, y: 0.28 },
  { id: "sales", label: "Sales", x: 0.84, y: 0.6 },
  { id: "analytics", label: "Analytics", x: 0.9, y: 0.24 },
  { id: "revenue", label: "Revenue", x: 0.96, y: 0.5 },
];

export const osEdges: [string, string][] = [
  ["traffic", "landing"],
  ["traffic", "crm"],
  ["landing", "crm"],
  ["crm", "ai"],
  ["ai", "email"],
  ["ai", "whatsapp"],
  ["email", "sales"],
  ["whatsapp", "sales"],
  ["sales", "analytics"],
  ["sales", "revenue"],
  ["analytics", "revenue"],
];
