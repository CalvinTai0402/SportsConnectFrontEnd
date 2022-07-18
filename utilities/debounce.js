export default function debounce(func, _timer, _setTimer, timeout = 2000) {
  return (...args) => {
    clearTimeout(_timer);
    _setTimer(
      setTimeout(() => {
        func.apply(this, args);
      }, timeout)
    );
  };
}
