const express = require("express");
const router = express.Router();
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);
  console.log(newUser);
  const token = await getToken(email, newUser);
  console.log(token);
  const usertoReturn = { ...newUser.toJSON(), token };
  delete usertoReturn.password;
  return res.status(200).json(usertoReturn);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid Credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid Credentials" });
  }
  const token = await getToken(user.email, user);
  const usertoReturn = { ...user.toJSON(), token };
  console.log(usertoReturn);
  delete usertoReturn.password;
  return res.status(200).json(usertoReturn);
});
exports.router = router;
