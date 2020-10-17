const arr = [
  { category: 'auto', sum: 500, type: 'consumption', id: 2 },
  { category: 'auto', sum: 2200, type: 'income', id: 3 },
  { category: 'work', sum: 1600, type: 'income', id: 4 },
  { category: 'work', sum: 6000, type: 'income', id: 5 },
  { category: 'home', sum: 8200, type: 'consumption', id: 6 },
  { category: 'family', sum: 4300, type: 'consumption', id: 7 },
  { category: 'present', sum: 2600, type: 'income', id: 8 },
  { category: 'auto', sum: 200, type: 'consumption', id: 9 },
  { category: 'auto', sum: 1000, type: 'consumption', id: 10 },
  { category: 'sport', sum: 600, type: 'consumption', id: 11 },
];
export const filterTypeOperation = () => {
  const res = arr.reduce(
    (acc, el) => {
      el.type === 'income'
        ? (acc.income += el.sum)
        : (acc.consumption += el.sum);
      return acc;
    },
    {
      income: 0,
      consumption: 0,
    },
  );

  return res;
};

const randomColor = (from, to) => {
  const randomChannel = () => {
    const r = from - to;
    const n = 0 | (Math.random() * r + to);
    const s = n.toString(16);
    return s.length === 1 ? '0' + s : s;
  };
  return '#' + randomChannel() + randomChannel() + randomChannel();
};
export const findUniqueCategory = () => {
  const res = arr
    .reduce((acc, el) => {
      const hasCategory = acc.includes(el.category);
      if (!hasCategory) {
        acc.push(el.category);
      }
      return acc;
    }, [])
    .map((el, idx) => {
      const value = arr.reduce((acc, item) => {
        if (el === item.category) {
          acc += item.sum;
        }
        return acc;
      }, 0);
      const isEvenNumber = idx % 2;
      let color = null;
      if (isEvenNumber) {
        color = randomColor(40, 120);
      }
      if (!isEvenNumber) {
        color = randomColor(121, 200);
      }
      return { color, category: el, total: value };
    });

  return res;
};
