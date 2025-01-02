import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        host: ['var(--font-host-grotesk)'],
        space: ['var(--font-space-grotesk)'],
        climate: ['var(--font-climate-crisis)'],
      },
      colors: {
        background: '#F6F5FA',
        card: '#ECEBF1',
        cardDark: '#222224',

        blue: '#96C8FF',
        lime: '#DCFF1E',
        liliac: '#E6D2FF',
        orange: '#FF6E00',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue',
    'bg-lime',
    'bg-liliac',
    'bg-orange',
    'bg-card',
    'bg-cardDark',
  ],
} satisfies Config

// border-radius: 32px;
// border: 1px solid rgba(255, 255, 255, 0.60);
// background: rgba(255, 255, 255, 0.20);
// backdrop-filter: blur(75px);
