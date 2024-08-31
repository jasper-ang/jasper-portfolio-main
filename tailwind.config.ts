import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './public/index.html'],
  theme: {
    extend: {
      boxShadow: {
        glowPrimary:
          '0 0 10px rgba(179, 135, 250, 0.4), 0 0 15px rgba(179, 135, 250, 0.3), 0 0 20px rgba(179, 135, 250, 0.2)',
        glowSecondary:
          '0 0 10px rgba(253, 111, 156, 0.4), 0 0 15px rgba(253, 111, 156, 0.3), 0 0 20px rgba(253, 111, 156, 0.2)',
        glowAccent:
          '0 0 10px rgba(255, 134, 91, 0.4), 0 0 15px rgba(255, 134, 91, 0.3), 0 0 20px rgba(255, 134, 91, 0.2)',
        glowNeutral:
          '0 0 6px rgba(45, 51, 59, 0.3), 0 0 10px rgba(45, 51, 59, 0.2), 0 0 15px rgba(45, 51, 59, 0.1)',
      },
      colors: {
        'base-200': '#151515', // Ensuring base-200 is consistent
      },
      screens: {
        lg: { max: '1023px' },
        md: { max: '767px' },
        sm: { max: '639px' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    themes: [
      {
        sunset: {
          ...require('daisyui/src/theming/themes')['sunset'],
          primary: '#B387FA',
          'primary-content': '#0c0615',
          secondary: '#FD6F9C',
          'secondary-content': '#160409',
          accent: '#FF865b',
          'accent-content': '#160603',
          neutral: '#2d333b',
          'neutral-content': '#d1d2d4',
          'base-100': '#1a1a1a',
          'base-200': '#151515',
          'base-300': '#000000',
          'base-content': '#cbcbcb',
          info: '#89e0eb',
          'info-content': '#071213',
          success: '#addfad',
          'success-content': '#0b120b',
          warning: '#f1c891',
          'warning-content': '#140f07',
          error: '#ffbbbd',
          'error-content': '#160d0d',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};

export default config;
