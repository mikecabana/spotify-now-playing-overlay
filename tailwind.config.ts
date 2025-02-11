import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "mix-ui": ["var(--font-spotify-mix-ui)"],
        "mix-ui-title": ["var(--font-spotify-mix-ui-title)"],
      },
      colors: {
        background: "hsla(var(--background), var(--background-alpha))",
        foreground: "hsla(var(--foreground), var(--foreground-alpha))",
        spotify: "hsl(var(--spotify))",
        "spotify-highlight": "hsl(var(--spotify-highlight))",
        "spotify-press": "hsl(var(--spotify-press))",
      },
    },
  },

  plugins: [],
};
export default config;
