const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const uuid = require("uuid").v4;
const { SessionModel } = require("../sessions/session.model");
const { UserModel } = require("../users/user.model");
const { generateAvatar } = require("../helpers/generate-avatar");

const monthNames = [
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
  "December",
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function register(req, res, next) {
  const { email, password, username } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .send({ message: `User with ${email} email already exists` });
  }
  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.HASH_POWER)
  );
  const newUserAvatar = await generateAvatar(next);
  const newUser = await UserModel.create({
    email,
    passwordHash,
    username,
    avatarUrl: `http://localhost:3000/images/${newUserAvatar}`,
    // изменить на ссылку Heroku
    verificationToken: uuid(),
  });
  await sendVerificationEmail(email, newUser.verificationToken);
  return res.status(201).json({
    id: newUser._id,
    email,
    username,
    avatarUrl: `http://localhost:3000/images/${newUserAvatar}`,
    currentBalance: newUser.currentBalance,
    transactions: newUser.transactions,
    customCategories: newUser.customCategories,
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(403)
      .json({ message: `User with ${email} email doesn't exist.` });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(403).json({ message: "Password is wrong." });
  }
  const newSession = await SessionModel.create({
    uid: user._id,
  });
  const accessToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
    }
  );
  const refreshToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    }
  );
  const d = new Date();
  const currentMonth = monthNames[d.getMonth()];
  const currentMonthTransactions = user.transactions.filter(
    (transaction) => transaction.month === currentMonth
  );
  return res.status(200).send({
    id: user._id,
    username: user.username,
    balance: user.balance,
    transactions: currentMonthTransactions,
    accessToken,
    refreshToken,
  });
}

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;
  return transporter.sendMail({
    to: email,
    from: process.env.NODEMAILER_EMAIL,
    subject: "Please, verify your account",
    html: `<a href="${verificationLink}">Click here to verify your email</a>`,
  });
}

module.exports = {
  register,
  login,
};
