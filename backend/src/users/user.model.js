const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    username: String,
    passwordHash: String,
    avatarUrl: String,
    currentBalance: Number,
    transactions: Array,
    customCategories: Array
})

exports.UserModel = mongoose.model("User", userSchema);