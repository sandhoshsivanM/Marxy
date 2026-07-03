import type { LucideIcon } from "lucide-react";
import {
  DollarSign,
  Users,
  UserPlus,
  PhoneCall,
  Percent,
  TrendingUp,
  CircleDollarSign,
  GitBranch,
  Bot,
  Mail,
  MessageCircle,
} from "lucide-react";

export interface Metric {
  key: string;
  label: string;
  icon: LucideIcon;
  /** display value */
  value: string;
  /** numeric target for count-up (optional) */
  target?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  positive: boolean;
  /** 14 normalised points 0..100 for the sparkline */
  spark: number[];
}

export const metrics: Metric[] = [
  {
    key: "revenue",
    label: "Revenue",
    icon: DollarSign,
    value: "$18.42M",
    target: 18.42,
    prefix: "$",
    suffix: "M",
    decimals: 2,
    delta: "+12.4%",
    positive: true,
    spark: [40, 44, 42, 50, 55, 53, 62, 68, 66, 74, 80, 85, 90, 96],
  },
  {
    key: "visitors",
    label: "Visitors",
    icon: Users,
    value: "1.28M",
    target: 1284920,
    delta: "+8.1%",
    positive: true,
    spark: [30, 38, 35, 44, 50, 48, 55, 60, 58, 66, 70, 74, 79, 84],
  },
  {
    key: "leads",
    label: "Leads",
    icon: UserPlus,
    value: "42,180",
    target: 42180,
    delta: "+18.9%",
    positive: true,
    spark: [20, 26, 30, 28, 38, 44, 42, 52, 60, 64, 72, 80, 86, 92],
  },
  {
    key: "calls",
    label: "Calls Booked",
    icon: PhoneCall,
    value: "6,942",
    target: 6942,
    delta: "+21.3%",
    positive: true,
    spark: [24, 30, 34, 40, 46, 44, 54, 58, 66, 70, 76, 82, 88, 95],
  },
  {
    key: "conversions",
    label: "Conversions",
    icon: Percent,
    value: "4.62%",
    target: 4.62,
    suffix: "%",
    decimals: 2,
    delta: "+0.9pt",
    positive: true,
    spark: [50, 48, 52, 55, 53, 58, 60, 59, 64, 66, 70, 72, 75, 78],
  },
  {
    key: "roas",
    label: "ROAS",
    icon: TrendingUp,
    value: "3.24X",
    target: 3.24,
    suffix: "X",
    decimals: 2,
    delta: "+0.4X",
    positive: true,
    spark: [40, 42, 45, 48, 46, 52, 55, 58, 60, 63, 66, 70, 73, 77],
  },
  {
    key: "cpa",
    label: "CPA",
    icon: CircleDollarSign,
    value: "$41.20",
    target: 41.2,
    prefix: "$",
    decimals: 2,
    delta: "-19.6%",
    positive: true,
    spark: [90, 84, 80, 76, 70, 66, 60, 56, 52, 48, 46, 44, 42, 40],
  },
  {
    key: "pipeline",
    label: "Pipeline",
    icon: GitBranch,
    value: "$62.8M",
    target: 62.8,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    delta: "+14.2%",
    positive: true,
    spark: [34, 38, 42, 46, 50, 54, 58, 62, 66, 72, 78, 84, 90, 96],
  },
  {
    key: "ai",
    label: "AI Tasks",
    icon: Bot,
    value: "128,540",
    target: 128540,
    delta: "+34.7%",
    positive: true,
    spark: [20, 28, 36, 42, 50, 58, 64, 70, 76, 82, 88, 92, 96, 100],
  },
  {
    key: "emails",
    label: "Emails Sent",
    icon: Mail,
    value: "2.14M",
    target: 2140000,
    delta: "+6.5%",
    positive: true,
    spark: [40, 44, 46, 50, 52, 56, 58, 62, 64, 68, 72, 76, 80, 84],
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    value: "318,900",
    target: 318900,
    delta: "+27.8%",
    positive: true,
    spark: [22, 30, 34, 40, 48, 52, 60, 66, 70, 78, 84, 88, 94, 99],
  },
];

/** Big animated revenue chart series (monthly), normalised 0..100. */
export const revenueSeries = [28, 32, 30, 38, 44, 42, 52, 58, 64, 70, 78, 92];
export const revenueMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
