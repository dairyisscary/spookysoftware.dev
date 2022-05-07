module.exports = {
  content: ["./src/**/*.{astro,tsx,ts,md}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Amatic SC", "cursive"],
      },
      colors: {
        "body-background-light": "#402F51",
        "body-background-dark": "#281F33",
        primary: "#A6BCCC",
        title: "#DFF0EA",
        highlight: "#F48256",

        "resume-body-background-light": "#FFF8F0",
        "resume-primary": "#2F4550",
        "resume-secondary": "#657882",
        "resume-context-accent": "#50C5B7",
        "resume-context": "#B6E8E1",
        "resume-highlight": "#F24236",
      },
    },
  },
};
