const colors= require('tailwindcss/colors')
module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode:'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
               dark_mode: {
                800: '#1F2937',
                900: '#111827',
               },
               primary:{
                100: '#F3F4F6',
                200: '#E5E7EB',
                900: '#1F2937',
               },
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],

        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
