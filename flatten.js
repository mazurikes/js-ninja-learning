function flatten(arr) {
  return arr.reduce((accumulator, currentValue) => {
    if (!(currentValue instanceof Array)) {
      accumulator.push(currentValue);
    } else {
      accumulator.push(...flatten(currentValue));
    }
    return accumulator;
  }, []);
}

const testArr = [
  [1, 3],
  2,
  {},
  [3, [4], 5],
  [6, "seven"],
  [{ a: 1 }, { b: 2 }]
];

console.log(flatten(testArr));
