const getUnicArr = weekObjArr => {
  const unicArr = weekObjArr.reduce((acc, elem) => {
    const foundElemIndex = acc.findIndex(item => {
      return item.weekStart === elem.weekStart;
    });

    if (foundElemIndex === -1) {
      acc.push(elem);
    } else {
      acc[foundElemIndex].count += elem.count;
    }
    return acc;
  }, []);

  return unicArr;
};

const getMonday = date => {
  const dateObj = new Date(date);

  const getDayFromMonday = day => {
    const dayNum = (day.getDay() % 7) - 1;
    return dayNum !== -1 ? dayNum : 6;
  };

  const dateObjDay = getDayFromMonday(dateObj);
  const mondayMs = new Date(date).setDate(dateObj.getDate() - dateObjDay);
  const monday = new Date(mondayMs);

  const makeNumWithLeadZeros = (num, positions) => {
    const formatter = new Intl.NumberFormat("ru", {
      minimumIntegerDigits: +positions,
      useGrouping: false
    });
    return formatter.format(+num);
  };

  // const prettyYear = makeNumWithLeadZeros(monday.getFullYear(), 4);
  const prettyYear = monday.getFullYear();
  const prettyMonth = makeNumWithLeadZeros(monday.getMonth() + 1, 2);
  const prettyDay = makeNumWithLeadZeros(monday.getDate(), 2);

  return `${prettyYear}-${prettyMonth}-${prettyDay}`;
};

function groupWeeks(data) {
  const weekStartArr = data.reduce((acc, currentValue) => {
    const monday = getMonday(currentValue.date);
    acc.push({ weekStart: monday, count: currentValue.count });
    return acc;
  }, []);

  const unicArr = getUnicArr(weekStartArr);

  return unicArr;
}

// Tests
const res = groupWeeks([
  { date: "2019-04-09", count: 10 },
  { date: "2019-04-22", count: 23 },
  { date: "2019-04-14", count: 5 }
]);

console.log(res);

// Result
// [{ weekStart: "2019-04-08", count: 33 }, { weekStart: "2019-04-22", count: 5 }];
