var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  authors: {
    type: [String],
    required: true
  },

  description: {
    type: String
  },

  image: {
    type: String,
    trim: true
  },

  book_link: {
    type: String,
    trim: true
  },

  preview_link: {
    type: String,
    trim: true
  },
  book_id: {
    type: String,
    required: true,
    unique: true
  },
  timeStamp: {
    type: Date,
    default: Date.now()
  }
});

var Book = mongoose.model("Book", BookSchema);
module.exports = Book;
