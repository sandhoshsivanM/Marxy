export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  location: string;
  headlineMetric: string;
  headlineLabel: string;
  summary: string;
  services: string[];
  timeline: string;
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  /** 12 monthly points, normalised 0..100, for the growth chart. */
  chart: number[];
  accent: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "restaurant",
    company: "Bella Nonna Trattoria",
    industry: "Restaurant Group",
    location: "Austin, TX",
    headlineMetric: "+$48K",
    headlineLabel: "Monthly Revenue",
    summary:
      "A 3-location Italian group replaced third-party delivery dependency with a first-party ordering funnel, WhatsApp reservations and a loyalty automation that reactivates diners weekly.",
    services: ["Landing Pages", "WhatsApp", "Automation", "Paid Ads"],
    timeline: "Results in 4 months",
    before: [
      { label: "Monthly revenue", value: "$112K" },
      { label: "Direct orders", value: "9%" },
      { label: "Repeat rate", value: "18%" },
    ],
    after: [
      { label: "Monthly revenue", value: "$160K" },
      { label: "Direct orders", value: "41%" },
      { label: "Repeat rate", value: "37%" },
    ],
    chart: [22, 26, 24, 31, 38, 42, 40, 51, 58, 66, 74, 88],
    accent: "#C78628",
  },
  {
    id: "healthcare",
    company: "Meridian Dental Co.",
    industry: "Healthcare",
    location: "Denver, CO",
    headlineMetric: "72%",
    headlineLabel: "Lower Cost Per Acquisition",
    summary:
      "A dental group bleeding budget on broad Google campaigns switched to intent-clustered ads, a fast booking page and an AI receptionist that books consults 24/7.",
    services: ["Paid Ads", "CRM", "Analytics", "WhatsApp"],
    timeline: "Results in 3 months",
    before: [
      { label: "Cost per patient", value: "$214" },
      { label: "Booked consults", value: "61 / mo" },
      { label: "Lead response", value: "8 hrs" },
    ],
    after: [
      { label: "Cost per patient", value: "$60" },
      { label: "Booked consults", value: "188 / mo" },
      { label: "Lead response", value: "40 sec" },
    ],
    chart: [80, 74, 70, 61, 55, 48, 44, 39, 34, 30, 27, 24],
    accent: "#0A66C2",
  },
  {
    id: "real-estate",
    company: "Northgate Realty Partners",
    industry: "Real Estate",
    location: "Miami, FL",
    headlineMetric: "418",
    headlineLabel: "Qualified Leads",
    summary:
      "A boutique brokerage built a neighbourhood-guide content engine feeding a CRM with automated nurture, turning cold search traffic into booked viewings.",
    services: ["SEO", "Landing Pages", "CRM", "Automation"],
    timeline: "Results in 6 months",
    before: [
      { label: "Monthly leads", value: "34" },
      { label: "Viewings booked", value: "11 / mo" },
      { label: "Pipeline value", value: "$1.2M" },
    ],
    after: [
      { label: "Monthly leads", value: "418" },
      { label: "Viewings booked", value: "96 / mo" },
      { label: "Pipeline value", value: "$14.8M" },
    ],
    chart: [10, 14, 19, 28, 33, 41, 52, 60, 69, 78, 90, 100],
    accent: "#25D366",
  },
  {
    id: "ecommerce",
    company: "Lumen Skincare",
    industry: "Ecommerce",
    location: "Los Angeles, CA",
    headlineMetric: "3.2X",
    headlineLabel: "Return on Ad Spend",
    summary:
      "A DTC skincare brand rebuilt its acquisition around UGC creative testing, a lifecycle email engine and a checkout CRO program that lifted AOV.",
    services: ["Paid Ads", "Email", "Conversion Optimization", "Analytics"],
    timeline: "Results in 5 months",
    before: [
      { label: "Blended ROAS", value: "1.4X" },
      { label: "Email revenue", value: "8%" },
      { label: "Checkout CVR", value: "1.9%" },
    ],
    after: [
      { label: "Blended ROAS", value: "3.2X" },
      { label: "Email revenue", value: "31%" },
      { label: "Checkout CVR", value: "4.6%" },
    ],
    chart: [30, 34, 40, 38, 46, 52, 58, 55, 67, 74, 82, 95],
    accent: "#E60023",
  },
];
