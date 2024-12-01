import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        black: "#000000",
        white: "#ffffff",
        surface: "#f3f3f3",
        text: "#191919",
        golden: "#c5a365",
        success: "#49a569",
        dark: "#101828",

        "green-500": "#243831",
        "green-300": "#2B5F44",
        "green-100": "#D8E9E4",
        "gray-100": "#BBC2C0",
        "gray-300": "#939494",
      },

      gridTemplateColumns: {
        "layout-1": "280px minmax(640px, 1fr) 280px",
        "layout-2": "280px 1fr",
      },
    },
  },
  plugins: [],
};
export default config;
