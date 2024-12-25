/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        IRANSansXBold: ["IRANSansXBold"],
        IRANSansXDemiBold: ["IRANSansXDemiBold"],
      },
      colors: {
        primary: "#3792D5", // MainBlue
        primaryLight: "#CCEBFF", // MainBlue
        secondary: "#CCEBFF", // AccentBlue
        accent: "#E89325", // AccentOrange
        error: "#FB8C00", // Warning
        background: "#FBF9EF", // TextLight (برای پس‌زمینه)
        onBackground: "#011936", // TextDark (رنگ متن برای پس‌زمینه)
      },
    },
  },
  plugins: [],
};
