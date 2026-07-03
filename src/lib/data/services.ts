import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Target,
  Search,
  LayoutTemplate,
  Database,
  Workflow,
  BarChart3,
  Mail,
  MessageCircle,
  MousePointerClick,
  Compass,
} from "lucide-react";

export interface Service {
  id: string;
  index: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  problem: string;
  solution: string;
  outcome: string;
  timeline: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: "ai-growth",
    index: "01",
    title: "AI Growth Strategy",
    icon: BrainCircuit,
    tagline: "The blueprint for your revenue engine.",
    problem: "You're spending on tactics with no system connecting them to revenue.",
    solution:
      "We model your funnel economics, map every channel to a revenue outcome, and design an AI-assisted growth roadmap tuned to your margins.",
    outcome: "A board-ready 90-day plan with forecasted pipeline, CAC ceilings and payback windows.",
    timeline: "1–2 weeks",
    deliverables: ["Revenue model", "Channel-to-outcome map", "90-day roadmap", "KPI scorecard"],
  },
  {
    id: "paid-ads",
    index: "02",
    title: "Paid Ads",
    icon: Target,
    tagline: "Profitable acquisition, not vanity clicks.",
    problem: "Ad spend rises but qualified pipeline doesn't move.",
    solution:
      "Full-funnel Meta, Google & TikTok campaigns with AI creative testing and server-side conversion tracking wired straight to your CRM.",
    outcome: "Lower CPA, cleaner attribution, and a compounding library of winning creative.",
    timeline: "Ongoing · 2-week ramp",
    deliverables: ["Campaign architecture", "50+ creative variants", "CAPI tracking", "Weekly optimisation"],
  },
  {
    id: "seo",
    index: "03",
    title: "SEO",
    icon: Search,
    tagline: "Compounding organic demand.",
    problem: "You rank for nothing your buyers actually search.",
    solution:
      "Programmatic + editorial SEO built on buyer-intent clusters, technical fixes and AI-accelerated content operations.",
    outcome: "Durable traffic that lowers blended CAC every quarter.",
    timeline: "3–6 months to momentum",
    deliverables: ["Technical audit", "Topic clusters", "Content engine", "Rank & traffic reporting"],
  },
  {
    id: "landing",
    index: "04",
    title: "Landing Pages",
    icon: LayoutTemplate,
    tagline: "Pages engineered to convert.",
    problem: "Traffic lands on pages that leak revenue.",
    solution:
      "Conversion-first landing systems with modular sections, instant load times and built-in experimentation.",
    outcome: "Higher conversion rates and a reusable page system your team can ship on.",
    timeline: "1–3 weeks",
    deliverables: ["Wireframe → design → build", "A/B framework", "Speed optimisation", "Analytics events"],
  },
  {
    id: "crm",
    index: "05",
    title: "CRM",
    icon: Database,
    tagline: "One source of truth for revenue.",
    problem: "Leads live in spreadsheets, inboxes and someone's memory.",
    solution:
      "A CRM built around your real sales motion with lead scoring, pipeline stages and clean, enforced data.",
    outcome: "Every lead tracked, every follow-up automated, every deal forecastable.",
    timeline: "2–4 weeks",
    deliverables: ["CRM setup", "Lead scoring", "Pipeline automation", "Team onboarding"],
  },
  {
    id: "automation",
    index: "06",
    title: "Automation",
    icon: Workflow,
    tagline: "Your business, running while you sleep.",
    problem: "Your team drowns in manual, repetitive busywork.",
    solution:
      "End-to-end automations connecting ads, forms, CRM, email, WhatsApp and Sheets — with AI agents handling triage.",
    outcome: "Hours reclaimed weekly and a system that never forgets to follow up.",
    timeline: "2–5 weeks",
    deliverables: ["Workflow maps", "AI agents", "Integrations", "Monitoring & alerts"],
  },
  {
    id: "analytics",
    index: "07",
    title: "Analytics",
    icon: BarChart3,
    tagline: "Decisions backed by truth.",
    problem: "You can't tell which spend actually creates revenue.",
    solution:
      "GA4 + server-side tracking + a live revenue dashboard that ties spend to pipeline to closed revenue.",
    outcome: "A single dashboard leadership actually trusts.",
    timeline: "1–3 weeks",
    deliverables: ["Tracking plan", "GA4 setup", "Live dashboard", "Attribution model"],
  },
  {
    id: "email",
    index: "08",
    title: "Email",
    icon: Mail,
    tagline: "Owned revenue on autopilot.",
    problem: "Your list is a dead asset generating nothing.",
    solution:
      "Lifecycle flows and broadcast strategy — welcome, nurture, win-back and post-purchase — personalised with AI.",
    outcome: "20–35% of revenue from email, predictably.",
    timeline: "2–4 weeks",
    deliverables: ["Flow architecture", "Copy & design", "Segmentation", "Deliverability tuning"],
  },
  {
    id: "whatsapp",
    index: "09",
    title: "WhatsApp",
    icon: MessageCircle,
    tagline: "Conversations that close.",
    problem: "Leads go cold before anyone replies.",
    solution:
      "WhatsApp automation with instant AI responses, booking links and human hand-off at the right moment.",
    outcome: "Faster response times and dramatically higher booking rates.",
    timeline: "1–2 weeks",
    deliverables: ["WhatsApp API setup", "AI responder", "Booking flows", "Broadcast campaigns"],
  },
  {
    id: "cro",
    index: "10",
    title: "Conversion Optimization",
    icon: MousePointerClick,
    tagline: "More revenue from the traffic you already have.",
    problem: "You're paying to send visitors to a leaky funnel.",
    solution:
      "Continuous experimentation across pages, offers and checkout using heatmaps, session data and statistical testing.",
    outcome: "Step-changes in conversion that compound across every channel.",
    timeline: "Ongoing",
    deliverables: ["Research & hypotheses", "Test roadmap", "Experiment builds", "Win reporting"],
  },
  {
    id: "consulting",
    index: "11",
    title: "Consulting",
    icon: Compass,
    tagline: "A growth partner in your corner.",
    problem: "You have the team but not the operating system.",
    solution:
      "Fractional growth leadership — strategy, hiring, tooling and weekly operating cadence to install the system in-house.",
    outcome: "A self-sufficient growth team running a real revenue OS.",
    timeline: "Monthly retainer",
    deliverables: ["Weekly strategy", "Team enablement", "Tooling audits", "Quarterly planning"],
  },
];
