/**
 * 实现参考来源：https://github.com/lishengzxc/bblog/issues/7
 */

function debounce (func, wait) {
  let timeout;

  return function (...args) {
    const ctx = this;

    if (timeout)
      clearTimeout(timeout);

    timeout = setTimeout(function () {
      func.apply(ctx, args)
    }, wait)
  };
}

function throttle (func, wait = 250) {
  let last, timeout;

  return function (...args) {
    const ctx = this;
    const now = +new Date();

    if (last && now < last + wait) {
      if (timeout)
        clearTimeout(timeout);

      timeout = setTimeout(function () {
        last = now;
        func.apply(ctx, args);
      }, wait);
    } else {
      last = now;
      func.apply(ctx, args);
    }
  }
}

module.exports = {
  debounce,
  throttle
};
