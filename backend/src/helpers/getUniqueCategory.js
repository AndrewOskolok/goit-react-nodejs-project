const { v4: uuidv4 } = require('uuid');

exports.countSumByType = arr => {
  const res = arr.reduce(
    (acc, el) => {
      el.type === 'income'
        ? (acc.income += el.amount)
        : (acc.expense += el.amount);
      return acc;
    },
    {
      income: 0,
      expense: 0,
    },
  );

  return res;
};

const randomColor = (fromRed, toRed) => {
  return (fromGreen, toGreen) => {
    return (fromBlue, toBlue) => {
      const randomChannel = (from, to) => {
        const r = from - to;
        const n = 0 | (Math.random() * r + to);
        const s = n.toString(16);
        return s.length === 1 ? '0' + s : s;
      };
      return (
        '#' +
        randomChannel(fromRed, toRed) +
        randomChannel(fromGreen, toGreen) +
        randomChannel(fromBlue, toBlue)
      );
    };
  };
};
exports.findUniqueCategory = arr => {
  const res = arr
    .reduce((acc, el) => {
      const hasCategory = acc.includes(el.category);
      if (!hasCategory && el.type === 'expense') {
        acc.push(el.category);
      }
      return acc;
    }, [])
    .map((el, idx) => {
      const value = arr.reduce((acc, item) => {
        if (el === item.category && item.type === 'expense') {
          acc += item.amount;
        }
        return acc;
      }, 0);
      const isEvenNumber = idx % 6;
      let color = null;
      if (!isEvenNumber) {
        color = randomColor(0, 51)(102, 153)(204, 255);
      }
      if (isEvenNumber === 1) {
        color = randomColor(102, 153)(0, 51)(204, 255);
      }
      if (isEvenNumber === 2) {
        color = randomColor(204, 255)(102, 153)(0, 51);
      }
      if (isEvenNumber === 3) {
        color = randomColor(0, 51)(204, 255)(102, 153);
      }

      if (isEvenNumber === 4) {
        color = randomColor(102, 153)(204, 255)(0, 51);
      }
      if (isEvenNumber === 5) {
        color = randomColor(204, 255)(0, 51)(102, 153);
      }
      return { color, category: el, total: value, id: uuidv4() };
    });

  return res;
};
