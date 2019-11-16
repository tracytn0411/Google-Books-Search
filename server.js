var express = require('express');
var path = require('path');
var PORT = process.env.port || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var colors = require('colors');

//Initiate express app
const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors())
app.use(methodOverride('_method'));



//Connect to MongoDB
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/googlebooks'
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

app.get('/', (req, res) => {
  res.send('Happy Saturday')
})




app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));



