require('dotenv').config();

let express = require('express');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

require('./router.js')(app);

const DB_IP = "mongodb://localhost:27017/CloudCard";
mongoose.connect(DB_IP);
let db = mongoose.connection;

db.on('error', function() {
  console.error.bind(console, 'connection error: ');
});
db.on('open', function () {
  console.log('Connection to DB successful.');
  app.listen(8080);
  console.log('Server listening on port 8080');
});
