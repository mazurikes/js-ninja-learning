function equalsSimple(obj, other) {
  // TODO: обработка символов и уточнение typeof (null и Object)

  // Если объекты имеют разный тип, они не равны
  if (typeof obj !== typeof other) {
    return false;
  }

  /*
    Проверка на:
    0. Совпадение по ссылке
    1. Примитивные типы (number, string, boolean)
    2. Функции (совпадение по ссылке)
    3. null и null
    4. undefined и undefined
    5. NaN, +-0 и +-Infinity 
  */
  if (Object.is(obj, other)) {
    return true;
  }

  // Массивы
  if (Array.isArray(obj) && Array.isArray(other)) {
    return obj.every((item, index) => {
      const first = item;
      const second = other[index];

      return equalsSimple(first, second);
    });
  }

  // Объекты

  const objEntries = Object.entries(obj);
  const objKeys = Object.keys(obj);
  const otherKeys = Object.keys(other);

  // Если в объектах разное кол-во ключей, они разные
  if (objKeys.length !== otherKeys.length) {
    return false;
  }

  return objEntries.every(elem => {
    const currentObjKey = elem[0];

    // Проверяем, есть ли такой ключ во втором объекте
    // Если нет - объекты точно неравные
    if (otherKeys.indexOf(currentObjKey) === -1) {
      return false;
    }

    const objValue = elem[1];
    const otherValue = other[currentObjKey];

    return equalsSimple(objValue, otherValue);
  });
}

// const result = equalsSimple(
//   {
//     a: 2,
//     b: "2",
//     c: false,
//     g: [
//       { a: { j: undefined } },
//       { a: 2, b: "2", c: false, g: [{ a: { j: undefined } }] }
//     ]
//   },
//   {
//     a: 2,
//     b: "2",
//     c: false,
//     g: [
//       { a: { j: undefined } },
//       { a: 2, b: "2", c: false, g: [{ a: { j: undefined } }] }
//     ]
//   }
// );

// const a = {
//   two: 2,
//   three: undefined
// };

// const b = {
//   one: undefined,
//   two: 2
// };

// Object и Array => OK, т.к. у Array есть те же методы
// const b = {
//   h: { u: 9 }
// };

// const a = {
//   h: ["u", 9]
// };

// Object && null => Все сломалось, как и ожидалось
const b = {
  h: null
};

const a = {
  h: { f: null }
};

const result = equalsSimple(a, b);

console.log(result);
