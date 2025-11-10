/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		colors: {
			"sw-yellow": "#ffe81f",
			"sw-gray": "#1a1a1a",
		},
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
		},
		},
	},
	plugins: [],
}
