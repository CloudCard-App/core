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

console.log('connecting to db at ' + process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL);
let db = mongoose.connection;

db.on('error', function() {
  console.error.bind(console, 'connection error: ');
});
db.on('open', function () {
  console.log('Connection to DB successful.');
  app.listen(process.env.PORT);
  console.log('Server listening on port ' + process.env.PORT);
});
