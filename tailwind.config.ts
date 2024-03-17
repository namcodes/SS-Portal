import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "kepler-std": ["Kepler Std", "sans-serif"],
      nevis: ["nevis", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    fontSize: {
      previewText: "0.50rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "7xl": "4rem",
    },
    extend: {
      textColor: {
        "ens-pink": "#e83760",
        "ens-yellow": "#f7a70b",
        "ens-pink-hover": "#c82951",
      },
      backgroundColor: {
        "ens-pink": "#e83760",
        "ens-yellow": "#f7a70b",
        "ens-pink-hover": "#c82951",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "en-branding":
          "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))",
        "report-bg": "url('/it-advisory.png')",
        "report-bg-2": "url('/it-advisory-2.png')",
      },
    },
  },
  plugins: [],
};
export default config;
