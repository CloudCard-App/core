var mongoose = require('mongoose');
var classSchema = require('./class').schema;
var cardSchema = require('./card').schemaa;

var deckSchema = mongoose.Schema({
  name: String,
  class: classSchema,
  cards: [cardSchema]
});

module.exports.schema = deckSchema;
module.exports.model = mongoose.model(deckSchema);