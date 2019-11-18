require('dotenv').config()
require ('newrelic');
var express = require('express');
var path = require('path');
var cors = require('cors')
var PORT = process.env.port || 5000
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
//const dbURI = 'mongodb://localhost:27017/googlebooks'
var dbURI = process.env.MONGODB_ATLAS_CLUSTER_URI;

mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.post("/api/search", (req, res) => {
  //var bookTitle = req.body.title;
  var bookTitle = req.body.title.replace(/\s/g, "+")
  console.log(bookTitle);
  var bookUrl = `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.BOOKS_API_KEY}`;
  console.log(bookUrl);
  axios
    .get(bookUrl)
    .then(response => {
      console.log(response.data.items);
      res.json(response.data.items);
    })
    .catch(error => {
      console.log(colors.red("Google API axios error: " + error));
    });
});

app.post('/api/books', (req, res) => {
  Book.create(req.body, (err, doc) => {
    if(err) {
      console.log(colors.red(`New book saved to MongoDB error: ${err}`))
    } else {
      console.log(`New book saved to MongoDB: ${doc}`.green)
    }

  })
})

// https://developers.google.com/books/docs/v1/using
// /api/books (get) - Should return all saved books as JSON.

// /api/books (post) - Will be used to save a new book to the database.

// /api/books/:id (delete) - Will be used to delete a book from the database by Mongo _id.

// * (get) - Will load your single HTML page in client/build/index.html. Make sure you have this after all other routes are defined.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build/index.html'))
// })

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));



