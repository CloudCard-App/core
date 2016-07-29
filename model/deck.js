var mongoose = require('mongoose');
var classSchema = require('./class').schema;

var deckSchema = new mongoose.Schema({
  name: String,
  class: classSchema,
});

module.exports.schema = deckSchema;
module.exports.model = mongoose.model('Deck', deckSchema);