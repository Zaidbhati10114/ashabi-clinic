import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#F7FAFC',
          100: '#EEF5FB',
          200: '#CFE0F0',
          300: '#9FC5E5',
          400: '#6C9FCC',
          500: '#2F6FAD',
          600: '#245889',
          700: '#1D4A75',
          800: '#173B5E',
          900: '#102B45',
        },
        mist: '#EEF5FB',
        sky: '#F7FAFC',
        sage: {
          50: '#f4f7f4',
          100: '#e6ede6',
          200: '#ccdccc',
          300: '#a3bfa3',
          400: '#739d73',
          500: '#527d52',
          600: '#3f6340',
          700: '#344f35',
          800: '#2c402d',
          900: '#253526',
        },
        cream: '#faf7f2',
        warm: '#f5ede0',
      },
    },
  },
  plugins: [],
};

export default config;
