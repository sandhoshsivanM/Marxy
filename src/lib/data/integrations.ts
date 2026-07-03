/** Marketing ecosystem used by the drifting-icon background layer. */
export interface Integration {
  name: string;
  /** short label / abbreviation drawn inside the drifting chip */
  short: string;
  hue: string;
}

export const integrations: Integration[] = [
  { name: "Instagram", short: "IG", hue: "#C13584" },
  { name: "Facebook", short: "Fb", hue: "#1877F2" },
  { name: "LinkedIn", short: "in", hue: "#0A66C2" },
  { name: "TikTok", short: "Tk", hue: "#010101" },
  { name: "Google", short: "G", hue: "#4285F4" },
  { name: "Meta", short: "M", hue: "#0668E1" },
  { name: "Pinterest", short: "Pin", hue: "#E60023" },
  { name: "Threads", short: "@", hue: "#101010" },
  { name: "WhatsApp", short: "Wa", hue: "#25D366" },
  { name: "Shopify", short: "Sh", hue: "#95BF47" },
  { name: "Email", short: "@", hue: "#C78628" },
  { name: "CRM", short: "CRM", hue: "#6A675F" },
  { name: "Analytics", short: "An", hue: "#F9AB00" },
  { name: "GA4", short: "GA4", hue: "#E37400" },
  { name: "Google Ads", short: "Ads", hue: "#4285F4" },
  { name: "YouTube", short: "Yt", hue: "#FF0000" },
];
