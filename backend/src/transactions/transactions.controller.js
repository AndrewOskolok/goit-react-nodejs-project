const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../users/user.model");

async function createTransaction(req, res) {
  const transactionId = uuidv4();
  const userToUpdate = await UserModel.findByIdAndUpdate(
    "5f85f5c86e965b45cca0574e",
    { $push: { transactions: { ...req.body, id: transactionId } } }
  );
  // Вместо первого параметра будет браться ID авторизированного юзера из объекта request.
  if (!userToUpdate) {
    return res.status(404).send({ message: "Unauthorized" });
  }
  res.status(201).send({ ...req.body, id: transactionId });
}

async function deleteTransaction(req, res) {
  const userToUpdate = await UserModel.findByIdAndUpdate(
    "5f85f5c86e965b45cca0574e",
    { $pull: { transactions: { id: `${req.params.transactionId}` } } }
  );
  // Вместо первого параметра будет браться ID авторизированного юзера из объекта request.
  if (!userToUpdate) {
    return res.status(404).send({ message: "Unauthorized" });
  }
  return res.status(204).send();
}

async function updateTransaction(req, res) {
  const userToUpdate = await UserModel.findById("5f85f5c86e965b45cca0574e");
  // Вместо первого параметра будет браться ID авторизированного юзера из объекта request.
  if (!userToUpdate) {
    return res.status(404).send({ message: "Unauthorized" });
  }
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

module.exports = {
  createTransaction,
  deleteTransaction,
  updateTransaction,
};
