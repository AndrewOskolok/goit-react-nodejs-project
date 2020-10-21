const { Router } = require("express");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { addCategory, getCategories } = require("./categories.controller");

const router = Router();

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/", validate(createCategorySchema), tryCatchWrapper(addCategory));
router.get("/", tryCatchWrapper(getCategories));

exports.categoryRouter = router;
