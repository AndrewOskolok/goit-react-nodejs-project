const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const uuid = require("uuid").v4;
const { SessionModel } = require("../sessions/session.model");
const { UserModel } = require("../users/user.model");
const { generateAvatar } = require("../helpers/generate-avatar");

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
  res.status(201).json({
    id: newUser._id,
    email,
    username,
    avatarUrl: `http://localhost:3000/images/${newUserAvatar}`,
    currentBalance: newUser.currentBalance,
    transactions: newUser.transactions,
    customCategories: newUser.customCategories,
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
};
