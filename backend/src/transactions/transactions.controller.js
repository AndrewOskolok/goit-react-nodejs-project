const {TransactionModel} = require("./transactions.model");

async function createTransaction(req, res) {
    const createdTransaction = await TransactionModel.create(req.body);
    res.status(201).send(createdTransaction);
}

module.exports = {
    createTransaction,
}