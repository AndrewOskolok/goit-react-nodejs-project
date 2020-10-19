const { Router } = require("express");
const { authorize } = require("../auth/auth.controller");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { getCurrent } = require("./user.controller");

const router = Router();

router.get("/", authorize, tryCatchWrapper(getCurrent));

exports.userRouter = router;
