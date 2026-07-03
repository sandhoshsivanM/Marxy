import type { IconType } from "react-icons";
import {
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiTiktok,
  SiGoogle,
  SiMeta,
  SiPinterest,
  SiThreads,
  SiWhatsapp,
  SiShopify,
  SiGmail,
  SiSalesforce,
  SiGoogleanalytics,
  SiGoogleads,
  SiYoutube,
  SiGoogletagmanager,
} from "react-icons/si";

/** Marketing ecosystem used by the drifting-icon background & 3D chaos cluster. */
export interface Integration {
  name: string;
  icon: IconType;
  /** authentic brand hue */
  hue: string;
}

export const integrations: Integration[] = [
  { name: "Instagram", icon: SiInstagram, hue: "#E4405F" },
  { name: "Facebook", icon: SiFacebook, hue: "#1877F2" },
  { name: "LinkedIn", icon: SiLinkedin, hue: "#0A66C2" },
  { name: "TikTok", icon: SiTiktok, hue: "#010101" },
  { name: "Google", icon: SiGoogle, hue: "#4285F4" },
  { name: "Meta", icon: SiMeta, hue: "#0668E1" },
  { name: "Pinterest", icon: SiPinterest, hue: "#E60023" },
  { name: "Threads", icon: SiThreads, hue: "#101010" },
  { name: "WhatsApp", icon: SiWhatsapp, hue: "#25D366" },
  { name: "Shopify", icon: SiShopify, hue: "#7AB55C" },
  { name: "Email", icon: SiGmail, hue: "#EA4335" },
  { name: "CRM", icon: SiSalesforce, hue: "#00A1E0" },
  { name: "Analytics", icon: SiGoogleanalytics, hue: "#E37400" },
  { name: "GA4", icon: SiGoogletagmanager, hue: "#246FDB" },
  { name: "Google Ads", icon: SiGoogleads, hue: "#4285F4" },
  { name: "YouTube", icon: SiYoutube, hue: "#FF0000" },
];
