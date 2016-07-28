var mongoose = require('mongoose');
var deck = require('./deck').schema;

var cardSchema = mongoose.Schema({
  dataType: {
    type: String,
    enum: ['TEXT'],
    default: 'TEXT'
  },
  front: String,
  back: String
});

module.exports.schema = cardSchema;
module.exports.model = mongoose.model(cardSchema);