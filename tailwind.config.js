const plugin = require('tailwindcss');
const defaultTheme = require('tailwindcss/defaultTheme')
// const container = require('@tailwindcss/container-queries')

module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    plugins: [
      // plugin(
        // container,
        // require('@tailwindcss/forms'),
        function({ matchVariant }) {
          matchVariant(
            'nth',
            (value) => {
              return `&:nth-child(${value})`;
            },
            {
              values: {
                1: '1',
                2: '2',
                3: '3',
              }
            }
          );
        },
      // ),
      // plugin(
          function ({  addVariant }) {
          addVariant('child', '& > *')
          addVariant('child-hover', '& > *:hover')
          addVariant('2n-child', '&:nth-child(2)')
          addVariant('exclude-xs', '@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px)')
          addVariant('exclude-sm', '@media (min-width: 475px),@media (min-width: 768px),@media (min-width: 1024px)')
          addVariant('exclude-md', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 1024px)')
          addVariant('exclude-lg', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px)')
          addVariant('exclude-xl', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px)')
          addVariant('greater-than-logo-min', '@media (min-width: 388px)')
          addVariant('greater-than-xs', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px),@media (min-width: 1280px),@media (min-width: 1400px)')
          addVariant('greater-than-sm', '@media (min-width: 768px),@media (min-width: 1024px),@media (min-width: 1280px)')
          addVariant('greater-than-md', '@media (min-width: 1024px),@media (min-width: 1280px),@media (min-width: 1400px)')
          addVariant('greater-than-lg', '@media (min-width: 1280px),@media (min-width: 1400px)')
          addVariant('greater-than-xl', '@media (min-width: 1400px)')
          addVariant('less-than-xs', '@media (max-width: 475px)')
          addVariant('less-than-logo-min', '@media (max-width: 388px)')
          addVariant('less-than-sm', '@media (max-width: 768px)')
          addVariant('less-than-md', '@media (max-width: 1024px)')
          addVariant('less-than-lg', '@media (max-width: 1280px)')
          addVariant('less-than-xl', '@media (max-width: 1400px)')
          // addVariant('@xs',	'@container (min-width: 20rem /* 320px */')
          // addVariant('@sm',	'@container (min-width: 24rem /* 384px */')
          // addVariant('@md',	'@container (min-width: 28rem /* 448px */')
          // addVariant('@lg',	'@container (min-width: 32rem /* 512px */')
          // addVariant('@xl',	'@container (min-width: 36rem /* 576px */')
          // addVariant('@2xl', '@container (min-width: 42rem /* 672px */')
          // addVariant('@3xl', '@container (min-width: 48rem /* 768px */')
          // addVariant('@4xl', '@container (min-width: 56rem /* 896px */')
          // addVariant('@5xl', '@container (min-width: 64rem /* 1024px */')
          // addVariant('@6xl', '@container (min-width: 72rem /* 1152px */')
          // addVariant('@7xl', '@container (min-width: 80rem /* 1280px */')
        }
      // )
      ,

    ],
    theme: {
      screens: {
        'xs': '475px',
        'mid-md-lg': '900px',
        ...defaultTheme.screens
      },
      extend: {
        fontFamily:{
          'raleway':"Raleway,sans",
          'monserrat':"Monserrat,sans"
        },
        backgroundImage:{
          'reel-backdrop': "url('https://i.ytimg.com/vi/C_3wBEmeNQ0/maxresdefault.jpg')",
          'card-backdrop' : "url('https://www.nfsa.gov.au/sites/default/files/collection/hero_image09-2016/370394_crocodile_dundee_hero_image_crop3.jpg')"
        },
        scrollbar:{
          
        },
        transitionProperty: {
          'height': 'height',
          'width': 'width',
          'spacing': 'margin, padding',
          'background': 'background-color',
          'border': 'border-color',
          'colors': 'color, border-color, background-color',
          'opacity': 'opacity',
          'transform': 'transform',
          'filter': 'filter',
          'transition': 'transition',
          'box-shadow': 'box-shadow',
        },
      },
      
    },
  // plugins: [require("daisyui")],
  }
  