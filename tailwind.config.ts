import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F6E206",
          "primary-hover": "#E5D105",
          "primary-muted": "#FEF9C3",
          accent: "#FFD700",
          "accent-hover": "#E6C200",
          charcoal: "#1A1A1A",
          muted: "#6B7280",
          cream: "#FFFBEA",
          canvas: "#FFFDF5",
          botanical: "#F1F7EE",
          "sun-wash": "#FFF8D7",
          light: "#F5F5F5",
          surface: "rgb(255 255 255 / 0.85)",
          "surface-elevated": "rgb(255 255 255 / 0.95)",
          "surface-solid": "#FFFFFF",
          border: "#E5E7EB",
          "border-soft": "#E6E8DF",
          "border-focus": "#F6E206",
          whatsapp: "#25D366",
          success: "#2E7D32",
          warning: "#F57C00",
          danger: "#DC2626",
          info: "#2563EB",
        },
      },
      fontFamily: {
        heading: ["var(--font-nunito-sans)", "Nunito Sans", "system-ui", "sans-serif"],
        body: ["var(--font-open-sans)", "Open Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "brand-sm": "6px",
        "brand-md": "10px",
        "brand-lg": "16px",
        "brand-xl": "24px",
      },
      boxShadow: {
        "brand-sm": "0 1px 2px rgb(0 0 0 / 0.04)",
        "brand-md": "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -1px rgb(0 0 0 / 0.04)",
        "brand-lg": "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.04)",
        "brand-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
        soft: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.04)",
        glow: "0 0 20px rgb(246 226 6 / 0.3)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 500ms var(--ease-out-expo) both",
        "scale-in": "scaleIn 300ms var(--ease-spring) both",
        "slide-in-right": "slideInRight 400ms var(--ease-out-expo) both",
        shimmer: "shimmer 1.5s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
