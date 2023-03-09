const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    plugins: [
      function ({ matchVariant, addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
        addVariant('2n-child', '&:nth-child(2)');
        addVariant('3n-child', '&:nth-child(3)');
        addVariant('4n-child', '&:nth-child(4)');
        addVariant('5n-child', '&:nth-child(5)');
        addVariant('6n-child', '&:nth-child(6)');
        addVariant('7n-child', '&:nth-child(7)');
        addVariant('8n-child', '&:nth-child(8)');
        addVariant('exclude-xs', '@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px)');
        addVariant('exclude-sm', '@media (min-width: 475px),@media (min-width: 768px),@media (min-width: 1024px)');
        addVariant('exclude-md', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 1024px)');
        addVariant('exclude-lg', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px)');
        addVariant('exclude-xl', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px)');
        addVariant('greater-than-xs', '@media (min-width: 475px),@media (min-width: 640px),@media (min-width: 768px),@media (min-width: 1024px),@media (min-width: 1280px),@media (min-width: 1400px)');
        addVariant('greater-than-sm', '@media (min-width: 768px),@media (min-width: 1024px),@media (min-width: 1280px)');
        addVariant('greater-than-md', '@media (min-width: 1024px),@media (min-width: 1280px),@media (min-width: 1400px)');
        addVariant('greater-than-lg', '@media (min-width: 1280px),@media (min-width: 1400px)');
        addVariant('greater-than-xl', '@media (min-width: 1400px)');
        addVariant('less-than-xs', '@media (max-width: 475px)');
        
        addVariant('less-than-sm', '@media (max-width: 768px)');
        addVariant('less-than-md', '@media (max-width: 1024px)');
        addVariant('less-than-lg', '@media (max-width: 1280px)');
        addVariant('less-than-xl', '@media (max-width: 1400px)');
        // matchVariant(
        //   'nth',
        //   (value) => {
        //     return `&:nth-child(${value})`;
        //   },
        //   {
        //     values: {
        //       DEFAULT: 'n', // Default value for `nth:`
        //       '2n': '2n', // `nth-2n:utility` will generate `:nth-child(2n)` CSS selector
        //       '3n': '3n',
        //       '4n': '4n',
        //       '5n': '5n',
        //       //... so on if you need
        //     },
        //   }
        // );
        // addVariant('child-nth', '&>')
      },

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
          
        }
      },
      
    },
  // plugins: [require("daisyui")],
  }
  