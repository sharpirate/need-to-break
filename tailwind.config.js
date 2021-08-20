module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#fff',
      primary: {
        '300': '#E8F0F2',
        '400': '#A2DBFA',
        '500': '#39A2DB',
        '600': '#0C6899'
      },
      blocked: {
        '400': '#FFA79B',
        '500': '#F8644F',
        '600': '#DC311A'
      },
      support: {
        'success': '#00B076',
        'error': '#F8644F',
        'warning': '#F8D34F'
      },
      gray: {
        '300': '#D9D9D9',
        '400': '#B2B2B2',
        '500': '#8C8C8C',
        '600': '#666666',
        '700': '#404040'
      }
    },
    screens: {
      '320': '320px',
      '360': '360px',
      '420': '420px',
      '438': '438px',
      '480': '480px',
      '540': '540px',
      '732': '732px',
      '808': '808px',
      '900': '900px',
      '1172': '1172px',
      '1196': '1196px'
    },
    spacing: {
      '0': '0px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '12': '12px',
      '13': '13px',
      '16': '16px',
      '20': '20px',
      '24': '24px',
      '32': '32px',
      '40': '40px',
      '48': '48px',
      '52': '52px',
      '56': '56px',
      '64': '64px',
    },
    fontFamily: {
      base: ['Inter', 'sans-serif'],
      display: ['IntroDemo']
    },
    fontSize: {
      '8': ['8px', { lineHeight: '16px' }],
      '10': ['10px', { lineHeight: '16px' }],
      '13': ['13px', { lineHeight: '16px' }],
      '16': ['16px', { lineHeight: '24px' }],
      '20': ['20px', { lineHeight: '24px' }],
      '26': ['26px', { lineHeight: '32px' }],
      '32': ['32px', { lineHeight: '40px' }],
      '40': ['40px', { lineHeight: '48px' }],
      '50': ['50px', { lineHeight: '56px' }],
      '64': ['64px', { lineHeight: '72px' }]
    },
    fontWeight: {
      reg: '400',
      med: '500',
      sbold: '600',
      bold: '700'
    },
    letterSpacing: {
      '2': '0.02em'
    },
    borderRadius: {
      '0': '0px',
      '4': '4px',
      '8': '8px',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      transform: ['active'],
      scale: ['active'],
      ringColor: ['hover', 'disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [],
}
