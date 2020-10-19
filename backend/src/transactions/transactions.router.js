const { Router } = require("express");
const Joi = require("Joi");
const {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
} = require("./transactions.controller");
const { authorize } = require("../auth/auth.controller");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { validate } = require("../helpers/validate");

const router = new Router();

const createTransactionScheme = Joi.object({
  date: Joi.number().min(0).max(new Date().getTime()).required(),
  month: Joi.string()
    .valid(
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
      "December"
    )
    .required(),
  year: Joi.number()
    .integer()
    .min(1970)
    .max(new Date().getFullYear())
    .required(),
  type: Joi.string().valid("income", "expense").required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  balanceAfter: Joi.number().required(),
  category: Joi.string().required(),
});

const updateTransactionScheme = Joi.object({
  date: Joi.number().min(0).max(new Date().getTime()),
  month: Joi.string().valid(
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
    "December"
  ),
  year: Joi.number().integer().min(1970).max(new Date().getFullYear()),
  type: Joi.string().valid("income", "expense"),
  description: Joi.string(),
  amount: Joi.number(),
  balanceAfter: Joi.number(),
  category: Joi.string(),
}).min(1);

const getTransactionsScheme = Joi.object({
  filter: Joi.string().valid("income", "expense"),
});

router.post(
  "/",
  authorize,
  validate(createTransactionScheme),
  tryCatchWrapper(createTransaction)
);
router.delete("/:transactionId", authorize, tryCatchWrapper(deleteTransaction));
router.patch(
  "/:transactionId",
  authorize,
  validate(updateTransactionScheme),
  tryCatchWrapper(updateTransaction)
);
router.get(
  "/",
  authorize,
  validate(getTransactionsScheme, "query"),
  tryCatchWrapper(getTransactions)
);

exports.transactionRouter = router;
