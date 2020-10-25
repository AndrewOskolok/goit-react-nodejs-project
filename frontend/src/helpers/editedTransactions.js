const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const editedData = (transactions) => {
  const metaTransactions = transactions.map((item) => ({ ...item }));

  return metaTransactions.map((item) => {
    let monthNumber = monthNames.indexOf(item.month) + 1;
    const newYear = Number(String(item.year).slice(-2));
    if (item.type === "income") {
      item.type = "+";
    }
    if (item.type === "expense") {
      item.type = "-";
    }
    if (item.date < 10) {
      item.date = "0" + String(item.date);
    }
    if (monthNumber < 10) {
      monthNumber = "0" + String(monthNumber);
    }
    return { ...item, month: monthNumber, year: newYear };
  });
};
