const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../users/users.model");
const {
  findUniqueCategory,
  countSumByType,
} = require("../helpers/getUniqueCategory");

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

async function createTransaction(req, res) {
  const transactionId = uuidv4();
  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { transactions: { ...req.body, id: transactionId } },
  });
  res.status(201).send({ ...req.body, id: transactionId });
}

async function deleteTransaction(req, res) {
  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { transactions: { id: `${req.params.transactionId}` } },
  });
  return res.status(204).send();
}

async function updateTransaction(req, res) {
  const userToUpdate = await UserModel.findById(req.user._id);
  const transactionToUpdate = userToUpdate.transactions.find(
    (transaction) => transaction.id === req.params.transactionId
  );
  const updatedTransaction = { ...transactionToUpdate, ...req.body };
  await UserModel.update(
    { "transactions.id": req.params.transactionId },
    {
      $set: {
        "transactions.$": updatedTransaction,
      },
    }
  );
  return res.status(204).send(updatedTransaction);
}

async function getTransactions(req, res) {
  const loggedUser = req.user;
  const { filter } = req.query;
  if (!filter) {
    return res.status(200).send(loggedUser.transactions);
  }
  const filteredTransactions = loggedUser.transactions.filter(
    (transaction) => transaction.type === filter
  );
  return res.status(200).send(filteredTransactions);
}

async function filteredStatisticsByDate(req, res) {
  const { year, month } = req.query;
  const { user } = req;

  const yearNumber = Number(year);
  const correctStatsByDate = user.transactions.filter((el) => {
    return el.year === yearNumber && el.month === month;
  });
  const sumType = countSumByType(correctStatsByDate);
  const categories = findUniqueCategory(correctStatsByDate);
  const result = { sumType, categories, currentBalance: user.currentBalance };

  res.status(200).json(result);
}

async function getMonthsAndYears(req, res) {
  const loggedUser = req.user;
  const transactionsYears = [
    ...new Set(loggedUser.transactions.map((transaction) => transaction.year).sort()),
  ];
  const bigArr = transactionsYears.map(year => loggedUser.transactions.filter(transaction => transaction.year === year));
  const yearAndItsMonths = bigArr.map(arr => ({[arr[0].year]: arr.map(transaction => transaction.month)}));
  return res
    .status(200)
    .send(yearAndItsMonths);
}

async function getCurrentMonth(req, res) {
  const userTransactions = req.user.transactions;

  const d = new Date();
  const currentMonth = monthNames[d.getMonth()];
  const currentMonthTransactions = userTransactions.filter(
    (transaction) => transaction.month === currentMonth
  );

  return res.status(200).send(currentMonthTransactions);
}

module.exports = {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
  filteredStatisticsByDate,
  getMonthsAndYears,
  getCurrentMonth,
};
