import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#327039",
        foreground: "#133020",
        background: "#efefef",
      },
      animation: {
        blink: "blink 0.7s infinite",
        wave: "wave 0.2s linear 0.3s 4 alternate both",
        glitch: "glitch 0.2s ease-in 0.3s 3 alternate",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
        wave: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(25deg)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "25%": { transform: "translate(-5px, 5px)" },
          "50%": { transform: "translate(5px, -5px)" },
          "75%": { transform: "translate(-5px, 5px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
