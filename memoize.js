function memoize(func) {
  if (typeof func !== "function") {
    throw TypeError(`Argument "${func} is not a function"`);
  }

  return func;
}
