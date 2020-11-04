export const getElementFontSize = context =>
  // return a number
  parseFloat(
    // of the computer font-size, so in px
    getComputedStyle(
      // for the root <html>
      context || document.documentElement).fontSize);
