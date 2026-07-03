export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** initials shown in the avatar medallion */
  initials: string;
  impact: string;
  linkedin: string;
  website: string;
  accent: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Marksy didn't run us campaigns — they installed an operating system. For the first time I can forecast next month's revenue and actually be right.",
    name: "Sofia Marchetti",
    role: "Founder & CEO",
    company: "Bella Nonna Trattoria",
    initials: "SM",
    impact: "+$48K monthly revenue",
    linkedin: "linkedin.com/in/sofiamarchetti",
    website: "bellanonna.co",
    accent: "#C78628",
  },
  {
    id: "t2",
    quote:
      "Our cost per patient dropped 72% in a quarter. The AI receptionist books consults while we sleep — it paid for the entire engagement in six weeks.",
    name: "Dr. Elias Bennett",
    role: "Managing Partner",
    company: "Meridian Dental Co.",
    initials: "EB",
    impact: "72% lower CPA",
    linkedin: "linkedin.com/in/eliasbennett",
    website: "meridiandental.co",
    accent: "#0A66C2",
  },
  {
    id: "t3",
    quote:
      "We went from 34 leads a month to over 400 qualified ones. The pipeline they built is worth more than the last three agencies combined.",
    name: "Marcus Delgado",
    role: "Principal Broker",
    company: "Northgate Realty Partners",
    initials: "MD",
    impact: "418 qualified leads",
    linkedin: "linkedin.com/in/marcusdelgado",
    website: "northgaterealty.co",
    accent: "#25D366",
  },
  {
    id: "t4",
    quote:
      "3.2X ROAS and a third of revenue now comes from email flows we barely touch. Marksy engineers the boring machine that prints money.",
    name: "Priya Nair",
    role: "Co-Founder",
    company: "Lumen Skincare",
    initials: "PN",
    impact: "3.2X return on ad spend",
    linkedin: "linkedin.com/in/priyanair",
    website: "lumenskincare.co",
    accent: "#E60023",
  },
  {
    id: "t5",
    quote:
      "The dashboard alone changed how our board meets. Everyone finally looks at the same numbers — and the numbers keep going up.",
    name: "Tomás Herrera",
    role: "VP Growth",
    company: "Cobalt SaaS",
    initials: "TH",
    impact: "2.4X pipeline in 90 days",
    linkedin: "linkedin.com/in/tomasherrera",
    website: "cobalt.io",
    accent: "#6366F1",
  },
  {
    id: "t6",
    quote:
      "I stopped guessing. Every dollar now has a job and a report card. That's the difference between marketing and a revenue system.",
    name: "Amara Okafor",
    role: "Owner",
    company: "Okafor Construction Group",
    initials: "AO",
    impact: "+$210K pipeline / quarter",
    linkedin: "linkedin.com/in/amaraokafor",
    website: "okaforbuild.co",
    accent: "#C78628",
  },
];
