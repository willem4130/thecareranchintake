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
        /* ============================================
           PURE MONOCHROME COLOR SYSTEM
           Semantic color tokens mapped to CSS variables
           ============================================ */

        /* Core semantic colors */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        /* Brand colors with states */
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
          active: 'hsl(var(--primary-active))',
          disabled: 'hsl(var(--primary-disabled))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary-hover))',
          active: 'hsl(var(--secondary-active))',
          disabled: 'hsl(var(--secondary-disabled))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: 'hsl(var(--accent-hover))',
          active: 'hsl(var(--accent-active))',
          disabled: 'hsl(var(--accent-disabled))',
        },

        /* Surface colors */
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          foreground: 'hsl(var(--surface-foreground))',
          hover: 'hsl(var(--surface-hover))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          hover: 'hsl(var(--card-hover))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        /* Text colors */
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          tertiary: 'hsl(var(--text-tertiary))',
          disabled: 'hsl(var(--text-disabled))',
          inverse: 'hsl(var(--text-inverse))',
        },

        /* Feedback colors */
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          light: 'hsl(var(--success-light))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
          light: 'hsl(var(--error-light))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          light: 'hsl(var(--warning-light))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          light: 'hsl(var(--info-light))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        /* Monochrome scale for flexible use */
        mono: {
          0: 'hsl(var(--mono-0))', // Pure black
          100: 'hsl(var(--mono-100))', // 10%
          200: 'hsl(var(--mono-200))', // 20%
          300: 'hsl(var(--mono-300))', // 30%
          400: 'hsl(var(--mono-400))', // 40%
          500: 'hsl(var(--mono-500))', // 50%
          600: 'hsl(var(--mono-600))', // 60%
          700: 'hsl(var(--mono-700))', // 70%
          800: 'hsl(var(--mono-800))', // 80%
          900: 'hsl(var(--mono-900))', // 90%
          950: 'hsl(var(--mono-950))', // 95%
          1000: 'hsl(var(--mono-1000))', // Pure white
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // Playfair Display - Elegant serif for headings
        serif: ['var(--font-playfair)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // Source Sans 3 - Clean sans-serif for body text
        sans: [
          'var(--font-source-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)', // 0 2px 8px rgba(0, 0, 0, 0.1)
        medium: 'var(--shadow-medium)', // 0 4px 16px rgba(0, 0, 0, 0.15)
        strong: 'var(--shadow-strong)', // 0 8px 24px rgba(0, 0, 0, 0.2)
        hover: 'var(--shadow-hover)', // 0 6px 20px rgba(0, 0, 0, 0.12)
      },
      letterSpacing: {
        nav: '2px',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },
      fontSize: {
        'xs-custom': 'var(--font-size-xs)',
        'sm-custom': 'var(--font-size-sm)',
        'base-custom': 'var(--font-size-base)',
        'lg-custom': 'var(--font-size-lg)',
        'xl-custom': 'var(--font-size-xl)',
        '2xl-custom': 'var(--font-size-2xl)',
        '3xl-custom': 'var(--font-size-3xl)',
        '4xl-custom': 'var(--font-size-4xl)',
        '5xl-custom': 'var(--font-size-5xl)',
        '6xl-custom': 'var(--font-size-6xl)',
      },
      lineHeight: {
        'tight-custom': 'var(--line-height-tight)',
        'snug-custom': 'var(--line-height-snug)',
        'normal-custom': 'var(--line-height-normal)',
        'relaxed-custom': 'var(--line-height-relaxed)',
        'loose-custom': 'var(--line-height-loose)',
      },
      fontWeight: {
        'normal-custom': 'var(--font-weight-normal)',
        'semibold-custom': 'var(--font-weight-semibold)',
        'bold-custom': 'var(--font-weight-bold)',
      },
      transitionDuration: {
        button: '250ms',
        entrance: '500ms',
        loading: '1500ms',
        feedback: '500ms',
        transition: '300ms',
        micro: '200ms',
      },
      transitionTimingFunction: {
        modern: 'cubic-bezier(0.4, 0, 0.2, 1)',
        elegant: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.6, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'slide-up': {
          from: {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        pulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.5',
          },
        },
        'success-pop': {
          from: {
            transform: 'scale(0)',
            opacity: '0',
          },
          to: {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'toggle-slide': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(20px)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-delay-100': 'slide-up 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both',
        'slide-up-delay-200': 'slide-up 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both',
        'slide-up-delay-300': 'slide-up 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both',
        'pulse-loading': 'pulse 1500ms cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'success-pop': 'success-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fade-in 300ms ease-in-out',
        'fade-out': 'fade-out 300ms ease-in-out',
        'toggle-slide': 'toggle-slide 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
