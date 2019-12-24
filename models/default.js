var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DefaultSchema = new Schema({
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

var Default = mongoose.model("Default", DefaultSchema);
module.exports = Default;

