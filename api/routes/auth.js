const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

// ############################

//  REGISTER USER
// LOGIN USER

// ############################

// REGISTER
router.post("/register", registerUser);
// LOGIN
router.post("/login", loginUser);

// export
module.exports = router;
