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
      boxShadow: {
        footer: '0px -1px 40.6px 0px #EAE9EF',
        contact: '0px 4px 92.2px 0px #EAE9EF',
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
    'bg-[#ECEBF1]',
    'bg-[#E4E9EF]',
    'bg-[#000000]',
    'text-[#000000]',

    'top-[390px]',
    'top-[432px]',
    'top-[348px]',

    'mt-[324px]',
    'mt-[366px]',
    'mt-[282px]',

    'mt-[390px]',
    'mt-[432px]',
    'mt-[348px]',

    '-ml-[94px]',
    'ml-[-94px]',
    '-ml-[59px]',
    'ml-[-59px]',

    'font-space',
    'font-host',
    'font-climate'
  ],
} satisfies Config
