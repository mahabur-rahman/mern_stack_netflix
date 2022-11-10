const mongoose = require("mongoose");

// MovieSchema
const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: Number },
    limit: { type: String },
    duration: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MovieModel = mongoose.model("Movie", MovieSchema);

// export
module.exports = MovieModel;
