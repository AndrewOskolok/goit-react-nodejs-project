const { CategoryModel } = require("./categories.model");

async function addCategory(req, res) {
  const { name, password } = req.body;
  if (password === process.env.SERVICE_PASS) {
    const newCategory = await CategoryModel.create({ name });
    return res.status(201).send(newCategory);
  }
  return res.status(400).send({ message: "Invalid service password" });
}

module.exports = {
  addCategory,
};
