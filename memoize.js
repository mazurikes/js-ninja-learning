/* 
Постановка задачи
Реализуйте в файле solution.js в виде экспорта по-умолчанию
функцию memoize(func), которая возвращает функцию с "мемоизацией".
Мемоизация подразумевает, что если функция была вызвана больше 
одного раза с одними и теми же аргументами (сравнение через ===)
то реального вызова не происходит,
а возвращается результат предыдущего вызова функции.
Если func не является функцией - функция должна выбрасывать (throw)
ошибку
*/

function memoize(func) {
  const argsArr = [];
  const resArr = [];

  if (typeof func !== "function") {
    throw TypeError(`Argument "${func}" is not a function"`);
  }

  return (...args) => {
    const index = argsArr.findIndex(x => {
      // Пытаемся найти аргументы, с которыми функция уже вызывалась
      // Т.к. функция может принимать больше 1 аргумента, сравниваем
      // каждый из них
      return x.every((elem, ind) => {
        return elem === args[ind];
      });
    });

    if (index === -1) {
      const funcRes = func(...args);

      argsArr.push(args);
      resArr.push(funcRes);

      return funcRes;
    }
    return resArr[index];
  };
}

// Tests
let counter = 1;
const obj = {};
function foo() {
  counter += 1;
  return counter;
}

const memoizedFoo = memoize(foo);
console.log(memoizedFoo(obj)); // 2
console.log(memoizedFoo(5)); // 3
console.log(memoizedFoo(5)); // 3
console.log(memoizedFoo(obj)); // 2
console.log(memoizedFoo(4)); // 4
