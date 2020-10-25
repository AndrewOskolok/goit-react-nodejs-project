const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: path.join(__dirname + "../../../tmp"),
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    cb(null, shortid.generate() + ext);
  },
});

exports.upload = multer({ storage });
