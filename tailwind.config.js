/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#7FC3BA',
          orange: '#F58366',
          navy: '#065164',
          dark: '#2F2D2E',
          muted: '#515151',
          surface: '#F0F0F0',
          pureWhite: '#FFFFFF',
          pureBlack: '#000000',
        },
      },
      fontFamily: {
        sans: ['"Modern Era"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Desktop / Base Typography
        'h1-desktop': ['60px', { lineHeight: '1.2', fontWeight: '900' }],
        'h2-desktop': ['50px', { lineHeight: '1.2', fontWeight: '900' }],
        'h3-desktop': ['40px', { lineHeight: '1.2', fontWeight: '900' }],
        'h4-desktop': ['30px', { lineHeight: '1.2', fontWeight: '900' }],
        'h5-desktop': ['20px', { lineHeight: '1.3', fontWeight: '700' }],
        
        // Mobile Typography overrides
        'h1-mobile': ['36px', { lineHeight: '1.2', fontWeight: '900' }],
        'h2-mobile': ['30px', { lineHeight: '1.2', fontWeight: '900' }],
        'h3-mobile': ['24px', { lineHeight: '1.2', fontWeight: '900' }],
        'h4-mobile': ['20px', { lineHeight: '1.3', fontWeight: '900' }],
        'h5-mobile': ['18px', { lineHeight: '1.3', fontWeight: '700' }],
        
        // Body Typography
        'body-intro': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'body-main': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
      maxWidth: {
        content: '1440px', // As per desktop grid max-width
        mobile: '375px', // As per mobile grid max-width standard
      },
    },
  },
  plugins: [],
}
