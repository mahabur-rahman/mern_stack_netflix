const mongoose = require("mongoose");

// UserSchema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: String, default: false },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model("User", UserSchema);

// export
module.exports = UserModel;
