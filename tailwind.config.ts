import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF6EC',
        foreground: '#653917',
        paper: {
          light: '#FAF6EC',
          DEFAULT: '#F7EFE1',
          dark: '#E7D5C8',
        },
        brand: {
          brown: '#653917',
          deepBrown: '#3D200B',
          black: '#1A1108',
          sand: '#D9C3B0',
          tan: '#E7D5C8',
          gold: '#C59A58',
        },
      },
      fontFamily: {
        ogaranya: ['var(--font-ogaranya)', 'serif'],
        instrument: ['var(--font-instrument)', 'sans-serif'],
        sans: ['var(--font-instrument)', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
