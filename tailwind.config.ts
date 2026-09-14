import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: "#17ABDD",
          deep: "#0E8CBB",
          soft: "#5FC7E8",
        },
        navy: {
          DEFAULT: "#0B2A40",
          deep: "#081D2D",
        },
        ink: "#0E1720",
        paper: "#F7FAFB",
        mist: "#E9F6FB",
        line: "#DCE8ED",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
