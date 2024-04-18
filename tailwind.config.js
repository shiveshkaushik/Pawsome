/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/*.html"],
    theme: {
      extend: {},
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
    plugins: [],
  }