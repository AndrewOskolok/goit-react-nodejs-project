const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema({
    date: Number,
    month: String,
    year: Number,
    type: String,
    category: String,
    description: String,
    sum: Number,
    balance: Number,
})

exports.TransactionModel = mongoose.model("Transaction", transactionSchema);