/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "radial-gradient":
          "radial-gradient(circle farthest-side, rgba(255, 0, 182, 0.15), rgba(255, 255, 255, 0))",
      },
    },
  },
  plugins: [],
};
