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
