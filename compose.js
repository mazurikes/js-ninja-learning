function compose(fns) {
  return fns.reduce(function comp(acc, fn) {
    return (...args) => acc(fn(...args));
  });
}

// Тест
const fn = compose([
  x => x - 8,
  x => x ** 2,
  (x, y) => (y > 0 ? x + 3 : x - 3)
  // () => 5
]);

const composeResult = fn("3", 1); // 1081
// const composeResult = fn("3", -1); // -8
// const composeResult = fn(); // 17

console.log(composeResult);
