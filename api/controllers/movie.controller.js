const MovieModel = require("../models/Movie");

//  CREATE
const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new MovieModel(req.body);

    try {
      const savedMovie = await newMovie.save();
      return res.status(201).json(savedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to create a movie!");
  }
};

// UPDATE  MOVIE
const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.movieId,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to update movie!");
  }
};

// DELETE MOVIE
const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await MovieModel.findByIdAndDelete(req.params.id);

      return res.status(200).json("The movie has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to delete movie!");
  }
};

// GET SINGLE
const getSingleMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);

    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET RANDOM MOVIE
const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie = [];

  try {
    if (type === "series") {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 5 } },
      ]);
    } else {
      movie = await MovieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 5 } },
      ]);
    }

    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET ALL MOVIES
const getAllMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await MovieModel.find();

      return res.status(200).json(movies.reverse());
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to get all movie!");
  }
};

// export
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovie,
  getRandomMovie,
  getAllMovie,
};
