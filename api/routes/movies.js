const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovie,
  getRandomMovie,
  getAllMovie,
} = require("../controllers/movie.controller");

// #############

// CREATE
// UPDATE
// DELETE
// GET SINGLE
// GET RANDOM
// GET ALL

// #############

router.post("/", verifyToken, createMovie);
router.put("/:movieId", verifyToken, updateMovie);
router.delete("/:id", verifyToken, deleteMovie);
router.get("/find/:id", verifyToken, getSingleMovie);
router.get("/random", verifyToken, getRandomMovie);
router.get("/", verifyToken, getAllMovie);

// export
module.exports = router;
