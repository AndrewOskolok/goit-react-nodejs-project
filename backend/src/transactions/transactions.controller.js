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
  const balanceAfter = req.body.balanceAfter;
  const update = {
    $push: { transactions: { ...req.body, id: transactionId }},
    $set: {"currentBalance": balanceAfter}
};
  await UserModel.findByIdAndUpdate(req.user._id, update);
  res.status(201).send({ ...req.body, id: transactionId });
}

async function deleteTransaction(req, res) {
  const transactionId = req.params.transactionId;
  const transaction = req.user.transactions.find(
    (transaction) => transaction.id === transactionId
  );
  const transactionAmount = transaction.amount;
  const amountOperation = transaction.type;
  let newBalance;

  switch (amountOperation) {
    case "income":
      newBalance = req.user.currentBalance - transactionAmount;
      break;

    case "expense":
      newBalance = req.user.currentBalance + transactionAmount;
      break;

    default:
      return;
  }

  const update = {
    $pull: { transactions: { id: transactionId } },
    $set: {
      "currentBalance": newBalance,
    },
  };

  await UserModel.findByIdAndUpdate(req.user._id, update);
  return res.status(201).send({"currentBalance": newBalance});
}

async function updateTransaction(req, res) {
  const userToUpdate = req.user;
  const transactionToUpdate = userToUpdate.transactions.find(
    (transaction) => transaction.id === req.params.transactionId
  );
  const transactionAmount = transactionToUpdate.amount;
  const amountOperation = transactionToUpdate.type;
  let newBalance = req.user.currentBalance;
  let newType = amountOperation;
  let diff;
  if (req.body.type && req.body.type !== amountOperation) {
    newType = req.body.type;
    newType === "income" ? req.user.currentBalance = req.user.currentBalance + transactionAmount : req.user.currentBalance = req.user.currentBalance - transactionAmount;
  }
  if (req.body.amount) {
    switch (newType) {
      case "income":
        if (newType === amountOperation) {
          diff = transactionAmount - req.body.amount;
          newBalance = req.user.currentBalance - diff;
        } else {
            newBalance = req.user.currentBalance + req.body.amount;
        }
        break;
  
      case "expense":
        if (newType === amountOperation) {
          diff = transactionAmount - req.body.amount;
          newBalance = req.user.currentBalance + diff;
        } else {
            newBalance = req.user.currentBalance - req.body.amount;
        }
        break;
  
      default:
        return;
    }
  }

  const updatedTransaction = { ...transactionToUpdate, ...req.body };
  await UserModel.update(
    { "transactions.id": req.params.transactionId },
    {
      $set: {
        "transactions.$": updatedTransaction,
        "currentBalance": newBalance
      },
    }
  );
  return res.status(201).send({"updatedTransaction": updatedTransaction, "currentBalance": newBalance});
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
