import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.1), 0 24px 60px rgba(249,115,22,0.35)"
      },
      colors: {
        ink: "#09090B"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(255,255,255,0.2), transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.14), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
