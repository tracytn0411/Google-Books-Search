var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({

  _id: Schema.Types.ObjectId,

  title: {
    type: String,
    required: true
  },

  authors: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  image: {
    type: String,
    trim: true
  },

  link: {
    type: String,
    trim: true
  },

  timeStamp: {
    type: Date,
    default: Date.now()
  }
})

var Book = mongoose.model('Book', BookSchema)
module.exports = Book;