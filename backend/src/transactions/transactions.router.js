const { Router } = require("express");
const Joi = require("Joi");
const { createTransaction, deleteTransaction, updateTransaction } = require("./transactions.controller");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { validate } = require("../helpers/validate");

const router = new Router();

const createTransactionScheme = Joi.object({
  date: Joi.number().min(0).max(new Date().getTime()).required(),
  month: Joi.string().valid("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December").required(),
  year: Joi.number().integer().min(1970).max(new Date().getFullYear()).required(),
  type: Joi.string().valid("income", "expenditure").required(),
  description: Joi.string().required(),
  sum: Joi.number().required(),
  balance: Joi.number().required(),
  category: Joi.string().required(),
});

const updateTransactionScheme = Joi.object({
  date: Joi.number().min(0).max(new Date().getTime()),
  month: Joi.string().valid("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
  year: Joi.number().integer().min(1970).max(new Date().getFullYear()),
  type: Joi.string().valid("income", "expenditure"),
  description: Joi.string(),
  sum: Joi.number(),
  balance: Joi.number(),
  category: Joi.string(),
}).min(1);

router.post("/", validate(createTransactionScheme), tryCatchWrapper(createTransaction));
router.delete("/:transactionId", tryCatchWrapper(deleteTransaction));
router.patch("/:transactionId", validate(updateTransactionScheme), tryCatchWrapper(updateTransaction));

exports.transactionRouter = router;