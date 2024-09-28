/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-thumbnail": "#7aa343",
        "constrast-text-primary": "#666666",
        "constrast-text-secondary": "#bababa",
        "primary-green": "#70ad47",
        "primary-blue": "#1a1b1e",
        "secondary-blue": "#EBF5FF",
        "accent-primary-green": "#9fc884",
        "accent-primary-yellow": "#FDD00B",
        "text-primary": "#333333",
        "green-primary": "#507B32",
        "green-secondary": "#D3E6C6",
        error: "#B94645",
        primary: "#f1f7ed",
        warning: "#D9B141",
      },
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [],
  },
};
