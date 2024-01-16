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
    },
  },
  plugins: [],
};
export default config;
