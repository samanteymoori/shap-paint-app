module.exports = {
  plugins: [require('@tailwindcss/custom-forms')],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1270px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.813rem', // 13px
      base: '0.875rem', // 14px
      lg: '1rem', // 16px
      lg2x: '1.125rem', // 18px
      lg3x: '1.25rem', // 20px
      xl: '1.375rem', // 22px
      '2xl': '1.875rem', // 30px
      '3xl': '2.25rem' // 36px
    },
    extend: {
      colors: {
        primary: '#ff6c06', // button & texts
        white2: '#f2f2f2', // custom
        silver: '#dbdee0', // silver
        secondary: {
          // button & texts
          100: '#4b5c64', // gunmetal

          200: '#0b1a23' // dark-blue-gray
        },
        gray: {
          // container and backgrounds
          100: '#f9f9f9', // gray-white
          200: '#ecf0f3', // pale-gray
          250: '#e2e2e2',
          300: '#9d9da7', // warm-gray-five
          350: '#6f7d83', // battleship-grey
          400: '#d2d2d2',
          500: '#a5aeb2', // cool-grey ,
          600: '#818d93', // bluish-grey
          700: '#5d6c74' // slate-gray,
        },
        tailwindgray: {
          // container and backgrounds
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',

          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      }
      // spacing: {
      //   "1": "0.2.2rem",
      //   "2": "0.438rem",
      //   "3": "0.813rem",
      // },
    }
  }
}
