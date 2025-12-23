import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ed1c24',
          50: '#fef5f5',
          100: '#fde8e8',
          200: '#fbd0d0',
          300: '#f7a8a8',
          400: '#f37575',
          500: '#ed1c24',
          600: '#d41920',
          700: '#b0151a',
          800: '#8c1115',
          900: '#680d10',
        },
        secondary: {
          DEFAULT: '#ffb319',
          50: '#fffaf0',
          100: '#fff5d6',
          200: '#ffebad',
          300: '#ffe284',
          400: '#ffd95b',
          500: '#ffb319',
          600: '#e5a116',
          700: '#b98112',
          800: '#8c610e',
          900: '#5f410a',
        },
        accent: {
          DEFAULT: '#27c3f3',
          50: '#f0f9fd',
          100: '#e1f3fb',
          200: '#c3e8f7',
          300: '#95dcf2',
          400: '#67d0ed',
          500: '#27c3f3',
          600: '#23addb',
          700: '#1c8cb0',
          800: '#166a85',
          900: '#10495a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['var(--font-raleway)', 'Raleway', 'system-ui', 'sans-serif'],
        heading: ['var(--font-raleway)', 'Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
