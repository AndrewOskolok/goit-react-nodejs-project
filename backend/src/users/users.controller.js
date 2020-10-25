const path = require("path");
const fsPromises = require("fs").promises;
const { avatarCompresHandler } = require("../helpers/avatarCompres");
const { UserModel } = require("./users.model");

exports.getCurrent = async function getCurrent(req, res) {
  res.status(200).send(req.user);
};

exports.updateAvatarUser = async (req, res, next) => {
  const currentUser = req.user;
  const fileName = req.file.filename;

  if (req.file.mimetype.includes("image")) {
    await avatarCompresHandler(fileName, next);

    const user = await UserModel.findOne(currentUser._id);

    const oldNameAvatar = user.avatarUrl.slice(-13);

    if (oldNameAvatar) {
      fsPromises.unlink(
        path.join(__dirname + `../../../public/avatars/${oldNameAvatar}`)
      );
    }

    const newUrl = `${process.env.BASE_URL}/avatars/${fileName}`;

    console.log(newUrl);

    await UserModel.findByIdAndUpdate(currentUser._id, {
      avatarUrl: newUrl,
    });

    res.status(200).send({ avatarURL: newUrl });
  } else {
    res.status(400).json({ message: "Invalid file type" });
  }
};
