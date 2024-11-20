
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'navidad': ['Mountains of Christmas', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        snow: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        snow: "snow 5s linear infinite",
      },
      backgroundImage: {
        "home-mountain": "url('/images/home/mountain.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
