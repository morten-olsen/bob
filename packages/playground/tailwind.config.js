/** @type {import('tailwindcss').Config} */
const path = require('path');

const { nextui } = require('@nextui-org/react');
const themePath = require.resolve('@nextui-org/theme/package.json');
const themeDir = path.dirname(themePath);

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    `${themeDir}/dist/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
