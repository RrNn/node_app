const mongoose = require('../database/config');

const Book = require('./book.js');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true }
);

AuthorSchema.pre('remove', { query: true, document: true }, function(next) {
  Book.deleteMany({ authorId: this._id }).exec();
  next();
});

module.exports = mongoose.model('Author', AuthorSchema);
