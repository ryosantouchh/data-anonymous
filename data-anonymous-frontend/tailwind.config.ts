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

        black: "var(--black)",
        white: "var(--white)",
        text: "var(--text)",
        golden: "var(--golden)",
        success: "var(--success)",

        "green-500": "#243831",
        "green-300": "#2B5F44",
        "green-100": "#D8E9E4",
        "gray-100": "#BBC2C0",
        "gray-300": "#939494",
      },
    },
  },
  plugins: [],
};
export default config;
