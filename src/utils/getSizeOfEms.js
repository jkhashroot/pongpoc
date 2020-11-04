export const getSizeOfEms = () => Number(getComputedStyle(document.querySelector('#root').fontSize.match(/(\d+(\.\d+)?)px$/)[1]));
