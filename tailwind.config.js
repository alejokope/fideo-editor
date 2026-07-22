/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './preview/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--content) / <alpha-value>)',
          secondary: 'rgb(var(--content-secondary) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
          tertiary: 'rgb(var(--content-tertiary) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
          muted: 'rgb(var(--accent-muted) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
          foreground: 'rgb(var(--danger-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--success) / <alpha-value>)',
          foreground: 'rgb(var(--success-foreground) / <alpha-value>)',
          muted: 'rgb(var(--success-muted) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
          foreground: 'rgb(var(--warning-foreground) / <alpha-value>)',
          muted: 'rgb(var(--warning-muted) / <alpha-value>)',
        },
      },
      boxShadow: {
        panel: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'panel-lg': '0 4px 12px -2px rgb(0 0 0 / 0.06)',
        glow: '0 0 16px -4px rgb(var(--accent) / 0.3)',
        'card-hover': '0 2px 12px -2px rgb(0 0 0 / 0.08)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'ai-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.85' },
          '70%': { transform: 'scale(1.25)', opacity: '0' },
          '100%': { transform: 'scale(1.25)', opacity: '0' },
        },
        'ai-fade': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ai-panel-in': {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'ai-fab-pulse': {
          '0%, 100%': { boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)' },
          '50%': { boxShadow: '0 0 0 6px rgb(79 70 229 / 0.12), 0 10px 15px -3px rgb(0 0 0 / 0.08)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.98)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'ai-ring': 'ai-ring 1.4s ease-out infinite',
        'ai-ring-delayed': 'ai-ring 1.4s ease-out 0.4s infinite',
        'ai-fade': 'ai-fade 0.25s ease-out',
        'ai-panel-in': 'ai-panel-in 0.28s ease-out',
        'ai-fab-pulse': 'ai-fab-pulse 1.2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.22s ease-out',
        'scale-in': 'scale-in 0.22s ease-out',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgb(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.3) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};