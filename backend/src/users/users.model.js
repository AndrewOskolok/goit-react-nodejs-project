const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  passwordHash: String,
  username: String,
  verificationToken: String,
  avatarUrl: String,
  currentBalance: { type: Number, default: 0 },
  transactions: { type: Array, default: [] },
  customCategories: { type: Array, default: [] },
});

exports.UserModel = mongoose.model("User", userSchema);
