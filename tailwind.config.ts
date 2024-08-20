import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './public/index.html'],
  theme: {
    extend: {},
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
          'base-300': '#101010',
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
    ], // customize themes as needed
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};

export default config;
