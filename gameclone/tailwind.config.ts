import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // These paths must match your folder structure exactly!
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/store/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'epic-black': '#121212',
        'epic-gray': '#202020',
        'epic-blue': '#0078f2',
      },
    },
  },
  plugins: [],
};
export default config;