const AvatarGenerator = require("avatar-generator");
const path = require("path");

exports.generateAvatar = async function generateAvatar(next) {
  try {
    const avatar = new AvatarGenerator();
    const image = await avatar.generate(null, "male");
    const fileName = Date.now();
    await image
      .png()
      .toFile(path.join(__dirname + `../../../public/images/${fileName}.png`));
    return `${fileName}.png`;
  } catch (err) {
    next(err);
  }
};
