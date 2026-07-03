import type { LucideIcon } from "lucide-react";
import {
  Target,
  Filter,
  Database,
  Workflow,
  Handshake,
  Repeat,
  TrendingUp,
  Globe,
  Users,
  FileText,
  PhoneCall,
  MessageSquare,
  Mail,
  MessageCircle,
  BellRing,
  Sprout,
  User,
  StickyNote,
  Activity,
  GitBranch,
  CalendarCheck,
  BadgeCheck,
  Percent,
  RefreshCw,
  ArrowUpCircle,
  Star,
  Share2,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiInstagram,
  SiFacebook,
  SiGoogle,
  SiTiktok,
  SiYoutube,
  SiGoogleads,
  SiMeta,
  SiGmail,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface StageItem {
  label: string;
  icon?: LucideIcon;
}

export interface StageMetric {
  label: string;
  /** numeric target for count-up */
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** thousands separators (default true) */
  separator?: boolean;
}

export interface StageSource {
  name: string;
  icon: IconType;
  /** authentic brand hue */
  hue: string;
}

export type StageVariant =
  | "sources"
  | "flow"
  | "qualify"
  | "list"
  | "automation"
  | "metrics"
  | "revenue";

export interface GrowthStage {
  id: string;
  /** display index, e.g. "01" */
  num: string;
  label: string;
  icon: LucideIcon;
  description: string;
  variant: StageVariant;
  items?: StageItem[];
  metrics?: StageMetric[];
  sources?: StageSource[];
  /** the brightest module (Revenue) */
  bright?: boolean;
}

/* ------------------------------------------------------------------ */
/* Data — the 8-stage growth pipeline                                  */
/* ------------------------------------------------------------------ */

export const growthStages: GrowthStage[] = [
  {
    id: "traffic",
    num: "01",
    label: "Traffic Sources",
    icon: Globe,
    description:
      "Every business already has traffic. Most simply fail to organize it.",
    variant: "sources",
    sources: [
      { name: "Instagram", icon: SiInstagram, hue: "#E4405F" },
      { name: "Facebook", icon: SiFacebook, hue: "#1877F2" },
      { name: "Google", icon: SiGoogle, hue: "#4285F4" },
      { name: "LinkedIn", icon: FaLinkedin, hue: "#0A66C2" },
      { name: "TikTok", icon: SiTiktok, hue: "#111111" },
      { name: "YouTube", icon: SiYoutube, hue: "#FF0000" },
      { name: "Google Ads", icon: SiGoogleads, hue: "#4285F4" },
      { name: "Meta Ads", icon: SiMeta, hue: "#0668E1" },
      { name: "Website", icon: Globe as unknown as IconType, hue: "#C78628" },
      { name: "Email", icon: SiGmail, hue: "#EA4335" },
    ],
  },
  {
    id: "capture",
    num: "02",
    label: "Lead Capture",
    icon: Target,
    description: "Incoming visitors become qualified enquiries — nothing slips through.",
    variant: "flow",
    items: [
      { label: "Visitors", icon: Users },
      { label: "Forms", icon: FileText },
      { label: "Calls", icon: PhoneCall },
      { label: "Messages", icon: MessageSquare },
    ],
    metrics: [
      { label: "Visitors", value: 12482 },
      { label: "Leads", value: 428 },
    ],
  },
  {
    id: "qualify",
    num: "03",
    label: "Lead Qualification",
    icon: Filter,
    description:
      "Every lead passes through AI qualification. Poor quality fades, qualified leads continue.",
    variant: "qualify",
    items: [
      { label: "Intent scored in real time" },
      { label: "Tyre-kickers filtered out" },
      { label: "Qualified leads advance" },
    ],
    metrics: [{ label: "Qualified", value: 62, suffix: "%" }],
  },
  {
    id: "crm",
    num: "04",
    label: "CRM",
    icon: Database,
    description: "Every qualified lead lands in one centralized CRM — a single source of truth.",
    variant: "list",
    items: [
      { label: "Customer Records", icon: User },
      { label: "Notes", icon: StickyNote },
      { label: "Sales Status", icon: Activity },
      { label: "Pipeline", icon: GitBranch },
    ],
  },
  {
    id: "automation",
    num: "05",
    label: "Automation",
    icon: Workflow,
    description: "Automated sequences nurture every lead across every channel, on time, every time.",
    variant: "automation",
    items: [
      { label: "Emails", icon: Mail },
      { label: "WhatsApp", icon: MessageCircle },
      { label: "SMS", icon: MessageSquare },
      { label: "Reminders", icon: BellRing },
      { label: "Lead Nurturing", icon: Sprout },
    ],
  },
  {
    id: "sales",
    num: "06",
    label: "Sales",
    icon: Handshake,
    description: "Your sales team receives only qualified leads — and closes more of them.",
    variant: "metrics",
    metrics: [
      { label: "Booked Calls", value: 6942 },
      { label: "Closed Deals", value: 1284 },
      { label: "Conversion Rate", value: 32, suffix: "%" },
    ],
    items: [
      { label: "Booked Calls", icon: CalendarCheck },
      { label: "Closed Deals", icon: BadgeCheck },
      { label: "Conversion Rate", icon: Percent },
    ],
  },
  {
    id: "retention",
    num: "07",
    label: "Retention",
    icon: Repeat,
    description: "Existing customers enter loyalty workflows that compound their lifetime value.",
    variant: "list",
    items: [
      { label: "Renewals", icon: RefreshCw },
      { label: "Upsells", icon: ArrowUpCircle },
      { label: "Reviews", icon: Star },
      { label: "Referrals", icon: Share2 },
    ],
  },
  {
    id: "revenue",
    num: "08",
    label: "Revenue",
    icon: TrendingUp,
    description: "Every interaction, measured to a single number: predictable, compounding revenue.",
    variant: "revenue",
    bright: true,
    // metrics[0] is the hero figure; the rest are supporting stats
    metrics: [
      { label: "Revenue Generated", value: 18.42, prefix: "$", suffix: "M", decimals: 2 },
      { label: "ROAS", value: 4.62, suffix: "x", decimals: 2, separator: false },
      { label: "CPA", value: 18, prefix: "$" },
      { label: "LTV", value: 1482, prefix: "$" },
      { label: "Growth", value: 312, prefix: "+", suffix: "%" },
    ],
  },
];
