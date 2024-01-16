import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "var(--text-color)",
        secondTextColor: "var(--second-text-color)",
        lightTextColor: "var(--light-text-color)",
        successTextColor: "var(--success-text-color)",
        mutedColor: "var(--muted-color)",
        primaryColor: "var(--primary-color)",
        dangerColor: "var(--danger-color)",
        disabledColor: "var(--disabled-element-color)",
      },
      keyframes: {
        "slide-down": {
          from: { "max-height": "0px", opacity: "0" },
          to: { "max-height": "700px", opacity: "1" },
        },
        "slide-up": {
          from: { "max-height": "700px", opacity: "1" },
          to: { "max-height": "0px", opacity: "0" },
        }
      },
      animation: {
        "slide-down": "slide-down 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
