/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        principal: {
          DEFAULT: "#004a87",
          50: "#cdd9e8",
          100: "#9cb5d0",
          200: "#6d90b8",
          300: "#3e6da0",
          400: "#245c93",
          500: "#004a87",
          600: "#003f75",
          700: "#003563",
          800: "#002a51",
          900: "#002041",
        },
        fuente: {
          principal: "#111111",
          secundario: "#8D8D8D",
        },
        borde: "#eaeaea",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
