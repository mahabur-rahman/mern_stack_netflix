const cryptoJs = require("crypto-js");
const UserModel = require("../models/User");

// UPDATE
const UpdateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your account!");
  }
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...info } = user._doc;

    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find();

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to see all users!");
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);

      return res.status(200).json("User has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

// STATS
const getStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await UserModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export
module.exports = {
  UpdateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  getStats,
};
