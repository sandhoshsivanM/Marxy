import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        cream: "#FDFBF7",
        ink: "#1F1B19",
        muted: "#6A675F",
        amber: {
          DEFAULT: "#C78628",
          50: "#FBF4E7",
          100: "#F6E6C5",
          200: "#EFD39A",
          300: "#E4B85F",
          400: "#D69F3C",
          500: "#C78628",
          600: "#A66C1E",
          700: "#7F521A",
        },
        accent: "#F6E6C5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        glass: "32px",
      },
      boxShadow: {
        float: "0 20px 60px -20px rgba(31,27,25,0.18), 0 8px 24px -12px rgba(31,27,25,0.10)",
        "float-lg": "0 40px 120px -30px rgba(31,27,25,0.28), 0 12px 40px -16px rgba(31,27,25,0.12)",
        glow: "0 0 60px -10px rgba(199,134,40,0.45)",
        "glow-sm": "0 0 24px -6px rgba(199,134,40,0.5)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.6)",
      },
      backdropBlur: {
        glass: "20px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
