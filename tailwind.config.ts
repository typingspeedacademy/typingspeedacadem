import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-navy': '#0A192F',    // Dark Navy
        'black': '#000000',         // Black
        'electric-blue': '#00FFFF', // Electric Blue (Cyan/Aqua as a placeholder for glow)
        'violet': '#8A2BE2',         // Violet (Blue Violet)
        'glow-accent': '#7DF9FF',    // Glowing Accent (Lighter Electric Blue/Diamond)
        'subtle-white': '#F0F0F0',   // Subtle White (Very light gray)
        // Keeping previous theme colors for now, can be removed later if not used
        'primary-blue': '#3B82F6',
        'accent-blue': '#60A5FA',
        'dark-blue': '#1E3A8A',
        'light-gray': '#E5E7EB',
        'off-white': '#F9FAFB',
      },
    },
  },
  plugins: [],
};
export default config;