const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const {
  UpdateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  getStats,
} = require("../controllers/user.controller");

// ##############
// UPDATE
// GET USER
// GET ALL
// DELETE
// USER STATS
// ##############

// UPDATE
router.put("/:id", verifyToken, UpdateUser);
// GET SINGLE USER
router.get("/find/:id", getSingleUser);
// GET ALL USERS
router.get("/", verifyToken, getAllUsers);
// DELETE
router.delete("/:id", verifyToken, deleteUser);
// STATS
router.get("/stats", getStats);

// export
module.exports = router;
