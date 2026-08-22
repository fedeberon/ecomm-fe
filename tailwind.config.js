module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      height: theme => ({
        '112': '28rem',
        '120': '30rem',
      }),
      minHeight: theme => ({
        '80': '20rem',
      }),
      colors: {
        palette: {
          lighter: '#fff3f9',
          light: '#f5c1d3',
          primary: '#3f4652',
          dark: '#11788b',
          secondary: '#ef8fb1',
          slight: '#45aebd',
          slighter: '#e8f7f9',
          sdark: '#148aa0',
          bg: '#ffffff'
        },
      },
      fontFamily: {
        primary: ['"Josefin Sans"']
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
