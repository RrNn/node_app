const mongoose = require('../database/config');

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: String,
    genre: String,
    authorId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);
