/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b9dcff",
          300: "#8cc6ff",
          400: "#55a6ff",
          500: "#2f8cff",
          600: "#156fe0",
          700: "#1158b0",
          800: "#114a8f",
          900: "#123f75",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
