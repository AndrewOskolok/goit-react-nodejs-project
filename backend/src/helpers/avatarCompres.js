const path = require("path");
const fsPromises = require("fs").promises;
const Jimp = require("jimp");

exports.avatarCompresHandler = async (createdAvatar, next) => {
  try {
    const imgToCompress = await Jimp.read(
      path.join(__dirname + `../../../tmp/${createdAvatar}`)
    );
    await imgToCompress
      .cover(60, 60)
      .quality(80)
      .write(path.join(__dirname + `../../../public/avatars/${createdAvatar}`));

    await fsPromises.unlink(
      path.join(__dirname + `../../../tmp/${createdAvatar}`)
    );
  } catch (err) {
    next(err);
  }
};
