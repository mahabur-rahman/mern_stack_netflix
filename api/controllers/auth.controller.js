const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// ############################

//  REGISTER USER
// LOGIN USER

// ############################

// REGISTER
const registerUser = async (req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//LOGIN
const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("user not found!");
    }

    // hash password decrypt
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    // jwt
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    const { password, ...info } = user._doc;
    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export
module.exports = {
  registerUser,
  loginUser,
};
