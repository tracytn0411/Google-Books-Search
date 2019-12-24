require('dotenv').config()
require ('newrelic');
var express = require('express');
var path = require('path');
var cors = require('cors')
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var colors = require('colors');
const axios = require('axios')

//Initiate express app
const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(methodOverride('_method'));

//Connect to MongoDB
const mongoose = require('mongoose');
const Book = require('./models/book')
const Default = require('./models/default')
//const dbURI = 'mongodb://localhost:27017/googlebooks'
var dbURI = process.env.MONGODB_ATLAS_CLUSTER_URI;

mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false // to use FindByIdAndRemove
})
const db = mongoose.connection;
db.on('error', function(error){
  console.log(colors.red('MongoDB error: ' + error))
})
db.once('open', function(){
  console.log('Mongoose connection succesfully')
});

//This tell express server where the frontend code is
app.use(express.static(path.join(__dirname, 'client/build')));

// Direct to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// Homepage default
app.get('/api/bestsellers', (req, res) => {
  var defaultUrl = `https://www.googleapis.com/books/v1/volumes?q=best+sellers&printType=book&key=${process.env.BOOKS_API_KEY}`;
  console.log(colors.blue(`Default URL is ${defaultUrl}`))
  axios
    .get(defaultUrl)
    .then(response => {
      res.json(response.data.items)
    })
    .catch(error => {
      console.log(colors.red(`Google API default url error: ${error}`))
    })
})

app.get('/api/default', (req, res) => {
  Default.find({}, (err, books) => {
    if(err) return console.log(colors.red(`Get default from MongoDB ERROR: ${err}`))
    else res.json(books)
  })
})

// Search for books
app.post("/api/search", (req, res) => {
  var bookTitle = req.body.title.replace(/\s/g, "+") //replace space with '+'
  console.log(bookTitle);
  // var bookUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&key=${process.env.BOOKS_API_KEY}`;
  var bookUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&printType=books&fields=items(id,volumeInfo)&key=${process.env.BOOKS_API_KEY}`
  console.log(colors.blue(`Search URL is ${bookUrl}`));
  axios
    .get(bookUrl)
    .then(async response => {
      var results = response.data.items
      var searchResults = []

      results.forEach((result, index) => {
        var vol = result.volumeInfo
        var book_id = result.id
        var title = vol.title
        var authors = ''
        var description = vol.description
        var image = vol.imageLinks.thumbnail
        var book_link = vol.infoLink
        var preview_link = vol.previewLink
        if (!vol.authors){ //if no authors, display N/A (array)
          authors = ['N/A']
        } else {
          authors = vol.authors
        }
        
        searchResults.push({
          title: title,
          authors: authors,
          description: description,
          image: image,
          book_link: book_link,
          preview_link: preview_link,
          book_id: book_id
        })
      })

      res.json(searchResults)
    })
    .catch(error => {
      console.log(colors.red("Google API axios error: " + error));
    });
});


// /api/books (post) - Will be used to save a new book to the database.
app.post("/api/books", (req, res) => {
  var book_id = req.body.book_id;
  console.log(book_id);
  Book.findOne({ book_id: book_id }, (err, bookID) => {
    if (bookID) {
      console.log("This book has already been saved !".cyan);
    } else {
      Book.create(req.body, (err, doc) => {
        if (err) {
          console.log(colors.red(`New book saved to MongoDB error: ${err}`));
        } else {
          console.log(`New book saved to MongoDB: ${doc}`.green)
          res.json(doc)
        }
      });
    }
  });
});


// /api/books (get) - Should return all saved books as JSON.
app.get('/api/books', (req, res) => {
  Book.find({}, (err, books) => {
    if(err) return console.log(colors.red(`Get saved books from MongoDB ERROR: ${err}`))
    else res.json(books)
  })
})

// /api/books/:id (delete) - Will be used to delete a book from the database by Mongo _id.
app.delete('/api/books/:id', (req, res) => {
  Book.findByIdAndRemove({'_id': req.params.id}).exec((err, res) => {
    if(err) return console.log(`MongoDB delete book ERROR: ${err}`)
    else {
      // Book.find({}, (err, books) => {
      //   if(err) return console.log(`MongoDB after delete book ERROR: ${err}`.red)
      //   else res.json(books)
      // })
      console.log(`Deleted book: ${res}`.magenta)
    }
  })
})

// app.delete('/api/books/:id', (req, res) => {
//   Book.findOneAndRemove({'book_id': req.params.id}).exec((err, res) => {
//     if(err) return console.log(`MongoDB unsave book ERROR: ${err}`)
//     else console.log(res)
//   })
// })

// * (get) - Will load your single HTML page in client/build/index.html. Make sure you have this after all other routes are defined.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));