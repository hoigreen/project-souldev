import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      spacing: {
        0.75: '0.1875rem' /* 3px */,
        1.25: '0.3125rem' /* 5px */,
        1.75: '0.4375rem' /* 7px */,
        2.25: '0.5625rem' /* 9px */,
        2.75: '0.6875rem' /* 11px */,
        3.25: '0.8125rem' /* 13px */,
        3.75: '0.9375rem' /* 15px */,
        4.25: '1.0625rem' /* 17px */,
        4.5: '1.125rem' /* 18px */,
        4.75: '1.1875rem' /* 19px */,
        5.25: '1.3125rem' /* 21px */,
        5.5: '1.375rem' /* 22px */,
        5.75: '1.4375rem' /* 23px */,
        6.25: '1.5625rem' /* 25px */,
        6.5: '1.625rem' /* 26px */,
        6.75: '1.6875rem' /* 27px */,
        7.25: '1.8125rem' /* 29px */,
        7.5: '1.875rem' /* 30px */,
        7.75: '1.9375rem' /* 31px */,
        8.25: '2.0625rem' /* 33px */,
        8.5: '2.125rem' /* 34px */,
        8.75: '2.1875rem' /* 35px */,
        9.25: '2.3125rem' /* 37px */,
        9.5: '2.375rem' /* 38px */,
        9.75: '2.4375rem' /* 39px */,
        10.25: '2.5625rem' /* 41px */,
        10.5: '2.625rem' /* 42px */,
        10.75: '2.6875rem' /* 43px */,
        11.25: '2.8125rem' /* 45px */,
        11.5: '2.875rem' /* 46px */,
        11.75: '2.9375rem' /* 47px */,
        12.25: '3.0625rem' /* 49px */,
        12.5: '3.125rem' /* 50px */,
        13.25: '3.3125rem' /* 53px */,
        15: '3.75rem', // 60px
        16.5: '4.125rem', // 66px
        17.5: '4.375rem', // 70px
        18: '4.5rem', // 72px
        30: '7.5rem', // 120px
        33: '8.25rem', // 132px
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        banner: "url('/banner.webp')",
        'banner-dark': "url('/banner-dark.webp')",
      },
      boxShadow: {
        'count-badge': '0px 0px 6px 2px rgba(219, 188, 159, 0.30)',
        'groups-sidebar': '-30px 0px 60px 0px rgba(28, 28, 31, 0.50)',
      },
      width: {
        xs: 'min(20rem, 100vw - 2rem)',
        sm: 'min(24rem, 100vw - 2rem)',
        md: 'min(28rem, 100vw - 2rem)',
        lg: 'min(32rem, 100vw - 2rem)',
        xl: 'min(36rem, 100vw - 2rem)',
        '2xl': 'min(42rem, 100vw - 2rem)',
        '3xl': 'min(48rem, 100vw - 2rem)',
        '4xl': 'min(56rem, 100vw - 2rem)',
        '5xl': 'min(64rem, 100vw - 2rem)',
        '6xl': 'min(72rem, 100vw - 2rem)',
        '7xl': 'min(80rem, 100vw - 2rem)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
