import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      lightGreen: "#00d7c0",
      bgPrimary: "#ffffff1f",
      shadowPrimary: "#00000059",
    },
    extend: {},
  },
  plugins: [daisyui],
};
