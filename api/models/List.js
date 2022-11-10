const mongoose = require("mongoose");

// ListSchema
const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

// List Model
const ListModel = mongoose.model("List", ListSchema);

// export
module.exports = ListModel;
