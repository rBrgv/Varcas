import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C75', // Deep Teal
          50: '#E8F1F7',
          100: '#D1E3ED',
          200: '#A3C7DA',
          300: '#75AAC7',
          400: '#478EB4',
          500: '#0F4C75', // Base
          600: '#0C3D5E',
          700: '#092E47',
          800: '#061E30',
          900: '#030F18',
        },
        secondary: {
          DEFAULT: '#3282B8', // Bright Teal
          50: '#EAF4F9',
          100: '#D5E9F3',
          200: '#AADBEC',
          300: '#80CDE5',
          400: '#55BEDA',
          500: '#3282B8', // Base
          600: '#286892',
          700: '#1E4E6C',
          800: '#143446',
          900: '#0A1A20',
        },
        accent: {
          DEFAULT: '#FFB84D', // Warm Gold
          50: '#FFF8ED',
          100: '#FFF1D9',
          200: '#FFE0B2',
          300: '#FFCF8C',
          400: '#FFBE66',
          500: '#FFB84D', // Base
          600: '#CC933D',
          700: '#996E2E',
          800: '#66491E',
          900: '#33240F',
        },
        solar: {
          DEFAULT: '#00A86B',
          50: '#E6F7F0',
          100: '#CCEFE1',
          200: '#99DFC3',
          300: '#66CFA5',
          400: '#33BF87',
          500: '#00A86B',
          600: '#008A57',
          700: '#006B43',
          800: '#004D2F',
          900: '#002E1B',
        },
        telecom: {
          DEFAULT: '#0891B2',
          50: '#E6F5F8',
          100: '#CCEBF1',
          200: '#99D7E3',
          300: '#66C3D5',
          400: '#33AFC7',
          500: '#0891B2',
          600: '#067A96',
          700: '#05627A',
          800: '#044B5E',
          900: '#023342',
        },
        hr: {
          DEFAULT: '#7C3AED',
          50: '#F3E8FF',
          100: '#E7D1FF',
          200: '#CFA3FF',
          300: '#B775FF',
          400: '#9F47FF',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4A1A93',
          900: '#391370',
        },
        neutral: {
          DEFAULT: '#334155',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 25px rgba(var(--color-primary-500-rgb), 0.4)',
      },
      fontSize: {
        '7xl': ['5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
export default config

