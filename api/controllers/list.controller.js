const ListModel = require("../models/List");

// CREATE LIST
const createList = async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new ListModel(req.body);

    try {
      const savedList = await newList.save();

      return res.status(201).json(savedList);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("you are not allowed!");
  }
};

// DELETE LIST
const deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ListModel.findByIdAndDelete(req.params.id);

      return res.status(201).json("List has been deleted..");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("you are not allowed!");
  }
};

// GET RANDOM LIST
const getRandomList = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await ListModel.aggregate([{ $sample: { size: 10 } }]);
    }

    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export
module.exports = { createList, deleteList, getRandomList };
