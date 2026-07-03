import type { LucideIcon } from "lucide-react";
import {
  UtensilsCrossed,
  Stethoscope,
  HardHat,
  Building2,
  GraduationCap,
  Cloud,
  ShoppingBag,
  UserRound,
  Store,
} from "lucide-react";

export interface Industry {
  name: string;
  icon: LucideIcon;
  blurb: string;
  stat: string;
}

export const industries: Industry[] = [
  { name: "Restaurant", icon: UtensilsCrossed, blurb: "Fill tables & own your orders", stat: "+41% direct orders" },
  { name: "Healthcare", icon: Stethoscope, blurb: "Book consults around the clock", stat: "72% lower CPA" },
  { name: "Construction", icon: HardHat, blurb: "A pipeline of qualified bids", stat: "+$210K / quarter" },
  { name: "Real Estate", icon: Building2, blurb: "Turn searches into viewings", stat: "418 leads / mo" },
  { name: "Education", icon: GraduationCap, blurb: "Enrolments on autopilot", stat: "3.1X applications" },
  { name: "SaaS", icon: Cloud, blurb: "Predictable pipeline & PLG", stat: "2.4X pipeline" },
  { name: "Ecommerce", icon: ShoppingBag, blurb: "Scale ROAS profitably", stat: "3.2X ROAS" },
  { name: "Personal Brand", icon: UserRound, blurb: "Monetise your audience", stat: "+68% conversions" },
  { name: "Local Business", icon: Store, blurb: "Dominate your local market", stat: "#1 in map pack" },
];
