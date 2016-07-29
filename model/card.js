var mongoose = require('mongoose');
var deckSchema = require('./deck').schema;

var cardSchema = new mongoose.Schema({
  deck: deckSchema,
  dataType: String,
  front: String,
  back: String
});

module.exports.schema = cardSchema;
module.exports.model = mongoose.model('Card', cardSchema);