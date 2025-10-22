import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        editorial: {
          black: '#000000',
          darkGray: '#333333',
          gray: '#666666',
          mediumGray: '#767676',
          lightGray: '#e7e7e7',
          veryLightGray: '#f7f7f7',
          border: '#bdbdbd',
          borderMedium: '#cccccc',
        },
        error: {
          DEFAULT: '#e26154',
          light: '#ffeeea',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        serif: ['var(--font-miller)', 'Georgia', 'serif'],
        sans: ['var(--font-libre)', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 4px 0 rgba(0, 0, 0, 0.24)',
        medium: '2px 2px 7px 0 rgba(0, 0, 0, 0.2)',
        hover: '1.5px 1.5px 1px rgba(0, 0, 0, 0.2)',
      },
      letterSpacing: {
        nav: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
