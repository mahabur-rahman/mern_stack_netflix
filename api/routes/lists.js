const router = require("express").Router();
const verifyToken = require("../verifyToken");
const {
  createList,
  deleteList,
  getRandomList,
} = require("../controllers/list.controller");

// ############

// CREATE
// DELETE
// GET RANDOM LIST WITH QUERY

// ############

router.post("/", verifyToken, createList);
router.delete("/:id", verifyToken, deleteList);
router.get("/", verifyToken, getRandomList);

// export
module.exports = router;
