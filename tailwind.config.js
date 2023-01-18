module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
          light: '#f9a8d4',
          primary: '#545053',
          dark: '#da32a9',
          secondary: '#F8B9CA',
          slight:'#79d7df',
          slighter:'#c6eced',
          sdark:'#31b8c3'
        },
      },
      // colors: {
      //   palette: {
      //     lighter: '#fff3f9',
      //     light: '#f9a8d4',
      //     primary: '#ed7aad',
      //     dark: '#da32a9',
      //     secondary: '#60c3cb',
      //     slight:'#79d7df',
      //     slighter:'#c6eced',
      //     sdark:'#31b8c3'
      //   },
      // },
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
