export const Loop = function (func) {
  (function loop(time) {
    func(Math.min((Date.now() - time) / 10, 1));
    window.requestAnimationFrame(loop.bind(Date.now()));
  }(Date.now()));
};
