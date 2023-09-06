/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
   "./src/**/*.{js,jsx,ts,tsx}",
 ],
 theme: {
   screens: {
     sm: '640px',
     // => @media (min-width: 640px) { ... }

     md: '768px',
     // => @media (min-width: 768px) { ... }

     lg: '1024px',
     // => @media (min-width: 1024px) { ... }

     xl: '1280px',
     // => @media (min-width: 1280px) { ... }

     '2xl': '1536px',
     // => @media (min-width: 1536px) { ... }
 },
 extend: {
  colors: {
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      300: '#5eead4',
      400: '#2dd4bf',
      900: '#134e4a',
      950: '#042f2e',
    },
    amber: {
      100: '#fef3c7',
      400: '#fbbf24',
     },
    },
  },
},
variants: {},
 plugins: [],
};
