const { Router } = require("express");
const { authorize } = require("../auth/auth.controller");
const { tryCatchWrapper } = require("../helpers/try-catch-wrapper");
const { getCurrent, updateAvatarUser } = require("./users.controller");
const { upload } = require("../helpers/avatarWriter");

const router = Router();

router.get("/", authorize, tryCatchWrapper(getCurrent));

router.patch(
  "/avatar",
  authorize,
  upload.single("avatar"),
  tryCatchWrapper(updateAvatarUser)
);

exports.usersRouter = router;
