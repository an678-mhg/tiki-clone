/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#1A94FF",
        "primary-color-2": "#0D5CB6",
        "yellow-cart": "#F1D53F",
        "white-overlay": "rgba(255, 255, 255, 0.25)",
        "background-gray": "#F5F5FA",
        "red-overlay": "#fff0e9",
        "bg-button-red": "rgb(255, 66, 78)",
      },
    },
  },
  plugins: [],
};
