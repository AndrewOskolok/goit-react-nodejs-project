const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../users/users.model");
const {
  findUniqueCategory,
  countSumByType,
} = require("../helpers/getUniqueCategory");
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
  const transactionsMonths = loggedUser.transactions.map(
    (transaction) => transaction.month
  );
  const transactionsYears = loggedUser.transactions.map(
    (transaction) => transaction.year
  );
  return res
    .status(200)
    .send({ months: transactionsMonths, years: transactionsYears });
}

module.exports = {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
  filteredStatisticsByDate,
  getMonthsAndYears,
};
