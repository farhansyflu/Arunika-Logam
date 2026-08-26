import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-questrial)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          DEFAULT: "#F4F4F4",
          50: "#FFFFFF",
          100: "#FAF7F1",
          200: "#F3EEE2",
        },
        ink: {
          DEFAULT: "#1B1812",
          800: "#26221B",
          900: "#17140F",
        },
        brass: {
          50: "#FBF3E4",
          100: "#F3E1BC",
          200: "#E6C384",
          300: "#D6A452",
          400: "#C28A34",
          500: "#A9762E",
          600: "#8F5F22",
          700: "#6E491B",
        },
        muted: "#6B6459",
        line: "#E7E1D3",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(27, 24, 18, 0.18)",
        soft: "0 4px 18px -6px rgba(27, 24, 18, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-height, auto)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dropdown-in": {
          from: { opacity: "0", transform: "scaleY(0.92) translateY(-8px)" },
          to: { opacity: "1", transform: "scaleY(1) translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "dropdown-in": "dropdown-in 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
