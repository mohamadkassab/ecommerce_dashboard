import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'color-change-1': 'color-change 2s infinite',
        'color-change-2': 'color-change 2s infinite 0.5s',
        'color-change-3': 'color-change 2s infinite 1s',
      },
      keyframes: {
        'color-change': {
          '0%': { backgroundColor: '#0091D5' },
          '60%': { backgroundColor: '#484848' },
          '100%': { backgroundColor: '#484848' },
        },
      },
      colors: {
        primary: '#0091D5', // Teal blue
        secondary: '#484848', // Dark gray
        error: '#d9534f', // Red
        warning: '#ff9800', // Orange
        success: '#4caf50', // Green
        info: '#2196f3', // Blue
        background: {
          DEFAULT: '#c1c1c1', // Light gray (equivalent to MUI background.default)
          paper: '#ffffff', // White (equivalent to MUI background.paper)
        },
        text: {
          primary: '#000000', // Black (equivalent to MUI text.primary)
          secondary: '#484848', // Dark gray (equivalent to MUI text.secondary)
        },
        action: {
          active: '#484848', // Dark gray
          hover: '#757575', // Light gray
          selected: '#0091D5', // Teal blue
          disabled: '#9e9e9e', // Gray
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        DEFAULT: '8px', // Global border radius from MUI
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Matching MUI font family
      },
      fontSize: {
        h1: '2.125rem', // Matching MUI h1
        h2: '1.75rem', // Matching MUI h2
        h3: '1.5rem', // Matching MUI h3
        body1: '1rem', // Matching MUI body1
      },
      lineHeight: {
        h1: '1.3', // Matching MUI h1 line height
        h2: '1.4', // Matching MUI h2 line height
        h3: '1.4', // Matching MUI h3 line height
        body1: '1.5', // Matching MUI body1 line height
      },
      letterSpacing: {
        h1: '0.015em', // Matching MUI h1 letter spacing
        h2: '0.015em', // Matching MUI h2 letter spacing
      },
      spacing: {
        8: '2rem', // Matching MUI spacing unit
      },
      screens: {
        xs: '0px', // Matching MUI breakpoints
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
