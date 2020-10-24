const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api.js');
//const MONGODB_URI = 'mongodb+srv://MistaKeyian:zSUXybTMTTFmXlEZ@under5.8vvry.mongodb.net/db1?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nuUnder5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected baby!');
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

//HTTP Request Logger
app.use(morgan('tiny'));
app.use('/api', routes);

//Step 3
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} 

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
