import type { LucideIcon } from "lucide-react";
import {
  Users,
  BadgeCheck,
  PhoneCall,
  Star,
  Search,
  MoreHorizontal,
  Target,
  CircleDollarSign,
  Trophy,
  Clock,
} from "lucide-react";
import type { IconType } from "react-icons";
import { SiGoogleads, SiMeta, SiGoogle } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/* Traffic sources — feed the funnel mouth                             */
/* ------------------------------------------------------------------ */

export interface TrafficSource {
  name: string;
  icon: IconType | LucideIcon;
  hue: string;
  visitors: number;
}

export const trafficSources: TrafficSource[] = [
  { name: "Google Ads", icon: SiGoogleads, hue: "#4285F4", visitors: 4580 },
  { name: "Meta Ads", icon: SiMeta, hue: "#0668E1", visitors: 3270 },
  { name: "LinkedIn Ads", icon: FaLinkedin, hue: "#0A66C2", visitors: 1850 },
  { name: "Organic Search", icon: SiGoogle, hue: "#34A853", visitors: 950 },
  { name: "Others", icon: MoreHorizontal, hue: "#6A675F", visitors: 1350 },
];

/* ------------------------------------------------------------------ */
/* Funnel stages                                                       */
/* ------------------------------------------------------------------ */

export interface FunnelStage {
  key: string;
  label: string;
  icon: LucideIcon;
  value: number;
  /** growth badge, e.g. "+18.6%" */
  delta: string;
  /** conversion from the previous stage, e.g. "25.3%" */
  conversion: string;
  /** subtle glass tint (rgb triplet used at low alpha) */
  tint: string;
}

export const funnelStages: FunnelStage[] = [
  { key: "leads", label: "Leads Generated", icon: Users, value: 11243, delta: "+18.6%", conversion: "100%", tint: "228,184,95" },
  { key: "qualified", label: "Qualified Leads", icon: BadgeCheck, value: 2847, delta: "+15.3%", conversion: "25.3%", tint: "79,158,106" },
  { key: "calls", label: "Booked Calls", icon: PhoneCall, value: 532, delta: "+12.8%", conversion: "18.7%", tint: "139,120,200" },
  { key: "customers", label: "Customers", icon: Star, value: 142, delta: "+11.4%", conversion: "26.7%", tint: "90,140,210" },
];

/* ------------------------------------------------------------------ */
/* Revenue + summary metrics                                           */
/* ------------------------------------------------------------------ */

export const funnelRevenue = {
  label: "Revenue Generated",
  value: 18.42,
  prefix: "$",
  suffix: "M",
  decimals: 2,
  delta: "+22.7% vs last month",
  spark: [26, 30, 28, 36, 42, 39, 48, 54, 51, 62, 70, 66, 78, 90],
};

export interface FunnelMetric {
  key: string;
  label: string;
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const funnelMetrics: FunnelMetric[] = [
  { key: "cvr", label: "Overall Conversion Rate", icon: Target, value: 3.2, suffix: "%", decimals: 1 },
  { key: "cpl", label: "Cost Per Lead", icon: CircleDollarSign, value: 65.21, prefix: "$", decimals: 2 },
  { key: "roas", label: "Average ROAS", icon: Trophy, value: 5.8, suffix: "x", decimals: 1 },
  { key: "days", label: "Avg. Days to Close", icon: Clock, value: 24.6, decimals: 1 },
];
