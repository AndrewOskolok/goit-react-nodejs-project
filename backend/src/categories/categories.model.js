const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
});

exports.CategoryModel = mongoose.model("Category", categorySchema);
