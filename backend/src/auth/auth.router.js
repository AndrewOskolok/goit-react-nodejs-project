const { Router } = require("express");
const Joi = require("Joi");
const { register, login } = require("./auth.controller");
const { validate } = require("../helpers/validate");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");

const router = Router();

const signUpSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/register", validate(signUpSchema), tryCatchWrapper(register));
router.post("/login", validate(signInSchema), tryCatchWrapper(login));

exports.authRouter = router;
