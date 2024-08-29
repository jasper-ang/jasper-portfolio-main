import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './public/index.html'],
  theme: {
    extend: {
      keyframes: {
        radiatePrimary: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px 5px rgba(179, 135, 250, 0.5), 0 0 10px 10px rgba(179, 135, 250, 0.4), 0 0 20px 20px rgba(179, 135, 250, 0.3)',
            opacity: '1',
          },
          '50%': {
            boxShadow:
              '0 0 10px 10px rgba(179, 135, 250, 0.4), 0 0 15px 15px rgba(179, 135, 250, 0.3), 0 0 30px 30px rgba(179, 135, 250, 0.2)',
            opacity: '0.8',
          },
        },
        radiateSecondary: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px 5px rgba(253, 111, 156, 0.5), 0 0 10px 10px rgba(253, 111, 156, 0.4), 0 0 20px 20px rgba(253, 111, 156, 0.3)',
            opacity: '1',
          },
          '50%': {
            boxShadow:
              '0 0 10px 10px rgba(253, 111, 156, 0.4), 0 0 15px 15px rgba(253, 111, 156, 0.3), 0 0 30px 30px rgba(253, 111, 156, 0.2)',
            opacity: '0.8',
          },
        },
        radiateAccent: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px 5px rgba(255, 134, 91, 0.5), 0 0 10px 10px rgba(255, 134, 91, 0.4), 0 0 20px 20px rgba(255, 134, 91, 0.3)',
            opacity: '1',
          },
          '50%': {
            boxShadow:
              '0 0 10px 10px rgba(255, 134, 91, 0.4), 0 0 15px 15px rgba(255, 134, 91, 0.3), 0 0 30px 30px rgba(255, 134, 91, 0.2)',
            opacity: '0.8',
          },
        },
        radiateNeutral: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px 5px rgba(255, 255, 255, 0.5), 0 0 10px 10px rgba(255, 255, 255, 0.4), 0 0 20px 20px rgba(255, 255, 255, 0.3)',
            opacity: '1',
          },
          '50%': {
            boxShadow:
              '0 0 10px 10px rgba(255, 255, 255, 0.4), 0 0 15px 15px rgba(255, 255, 255, 0.3), 0 0 30px 30px rgba(255, 255, 255, 0.2)',
            opacity: '0.8',
          },
        },
      },
      animation: {
        radiatePrimary: 'radiatePrimary 4s infinite',
        radiateSecondary: 'radiateSecondary 4s infinite',
        radiateAccent: 'radiateAccent 4s infinite',
        radiateNeutral: 'radiateNeutral 4s infinite',
      },
      screens: {
        lg: { max: '1023px' }, // Everything below 1024px
        md: { max: '767px' }, // Everything below 768px
        sm: { max: '639px' }, // Everything below 640px
        // 'base' is now considered as the larger screens (1024px and up)
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
