const getDecimalNumPresicion = num => {
  // Функция умеет находить точность только чисел в десятичном представлении
  const stringNum = num.toString();

  const isNumHasPoint = stringNum.indexOf(".") !== -1;

  // Например, 78. Число знаков после запятой - 0
  if (!isNumHasPoint) {
    return 0;
  }

  // Находим количество значащих цифр после точки
  // 1.0003 -> 4
  // 1.123000 -> 3
  const numbersAfterPoint = stringNum
    .split(".")[1]
    .replace(/^.*[1-9]+(0+)$/gm, "$1").length;

  return numbersAfterPoint;
};

const getMantissaPrecision = num => {
  // Функция для получения точности мантиссы для числа, представленного в экспоненциальной форме
  // Мантисса - это то, что стоит перед е:
  // 2.455e-10 -> 2.455

  // Преобразуем число к экспоненциальному виду
  const expNumString = Number(num)
    .toExponential()
    .toLowerCase();

  // Получаем все то, что идет до e и находим кол-во знаков после запятой
  const mantissa = expNumString.split("e")[0];
  const mantissaPrecision = getDecimalNumPresicion(mantissa);

  return mantissaPrecision;
};

function calc(firstNumber, secondNumber, operation, result) {
  const first = Number(firstNumber);
  const second = Number(secondNumber);

  // Проводим расчеты
  let calcRes;
  if (operation === "+") {
    calcRes = first + second;
  } else if (operation === "-") {
    calcRes = first - second;
  } else if (operation === "*") {
    calcRes = first * second;
  } else if (operation === "/") {
    calcRes = first / second;
  } else {
    calcRes = NaN;
  }

  // Приводим результаты к экспоненциальной форме.
  // Для расчетного результата делаем точность мантиссы такой же, как и у входного результата
  const expResult = Number(result).toExponential();
  const expResultPrecision = getMantissaPrecision(expResult);
  const expCalcRes = Number(calcRes).toExponential(expResultPrecision);

  return expResult === expCalcRes;
}

// console.log(calc("0.2000", "0.1", "+", "0.3000")); // true
// console.log(calc("1000000", 1e6, "*", "1e012")); // true
// console.log(calc("0002.001300", "3.00067600", "/", "0.6669510475993695")); // false
// console.log(calc(0.1, 0.2, "-", "-0.1")); // true
// console.log(calc(0.2, 0.1, "+", 3.0000000000000004e-1)); // Неверно: true, хотя надо false
// console.log(calc(5, 10, "/", 0.5)); // true
console.log(calc(1, 3, "/", 0.3333333)); // true
console.log(calc(1, 3, "/", 0.3)); // и так true
