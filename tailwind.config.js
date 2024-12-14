/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{vue,js,ts,jsx,tsx}',
        './components/**/*.{vue,js,ts,jsx,tsx}',
        './layouts/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                IRANSansXBold: ['IRANSansXBold'],
                IRANSansXDemiBold: ['IRANSansXDemiBold'],
            },
        },
    },
    plugins: [],
}
