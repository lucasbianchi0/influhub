/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // mainColor:"#c489ff"
        mainColor:"#A152FF",
        customPurpleStart: 'rgba(196, 137, 255, 1)',
        customPurpleEnd: 'rgba(146, 60, 255, 1)',
        
      }
    },
    fontFamily: {
      magra: ['Magra', 'sans-serif'],
      sans: ['Open Sans', 'sans-serif'],
      poppins:[ 'Poppins', 'sans-serif']
    },
  },
  plugins: [],
}

