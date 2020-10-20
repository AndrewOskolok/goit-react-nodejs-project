const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const uuid = require("uuid").v4;
const { SessionModel } = require("../sessions/session.model");
const { UserModel } = require("../users/users.model");

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

async function register(req, res) {
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
  const newUser = await UserModel.create({
    email,
    passwordHash,
    username,
    avatarUrl: "",
    verificationToken: uuid(),
  });
  await sendVerificationEmail(email, newUser.verificationToken);
  return res.status(201).json({
    id: newUser._id,
    email,
    username,
    avatarUrl: "",
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
      .send({ message: `User with ${email} email doesn't exist` });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(403).send({ message: "Password is wrong" });
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
    currentBalance: user.currentBalance,
    transactions: currentMonthTransactions,
    accessToken,
    refreshToken,
  });
}

async function authorize(req, res, next) {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader) {
    const accessToken = authorizationHeader.replace("Bearer ", "");
    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (err) {
      // await SessionModel.findByIdAndDelete(payload.sid);
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = await UserModel.findById(payload.uid);
    const session = await SessionModel.findById(payload.sid);
    if (!user) {
      return res.status(404).send({ message: "Invalid user" });
    }
    if (!session) {
      return res.status(404).send({ message: "Invalid session" });
    }
    if (user.verificationToken) {
      return res
        .status(401)
        .send({ message: "You haven't verified your email address." });
    }
    req.user = user;
    req.session = session;
    next();
  } else return res.status(400).send({ message: "No token provided" });
}

async function refreshTokens(req, res) {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader) {
    const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
    let payload;
    try {
      payload = jwt.verify(reqRefreshToken, process.env.JWT_SECRET);
    } catch (err) {
      // await SessionModel.findByIdAndDelete(req.session._id);
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = await UserModel.findById(payload.uid);
    const session = await SessionModel.findById(payload.sid);
    if (!user) {
      return res.status(404).send({ message: "Invalid user" });
    }
    if (!session) {
      return res.status(404).send({ message: "Invalid session" });
    }
    await SessionModel.findByIdAndDelete(payload.sid);
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
    return res.status(200).send({ accessToken, refreshToken });
  }
  return res.status(400).send({ message: "No token provided" });
}

async function logout(req, res) {
  const currentSession = req.session;
  await SessionModel.deleteOne({ _id: currentSession._id });
  req.user = null;
  req.session = null;
  res.status(204).end();
}

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
  return transporter.sendMail({
    to: email,
    from: process.env.NODEMAILER_EMAIL,
    subject: "Please, verify your account",
    html: `<a href="${verificationLink}">Click here to verify your email</a>`,
  });
}

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;
  const user = await UserModel.findOne({ verificationToken });
  if (!user) {
    return res.status(404).send("User not found");
  }
  await UserModel.findOneAndUpdate(
    { verificationToken },
    { $unset: { verificationToken } }
  );
  return res.status(200).send("User successfully verified");
}

module.exports = {
  register,
  login,
  refreshTokens,
  authorize,
  logout,
  verifyEmail,
};
