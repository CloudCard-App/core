var mongoose = require('mongoose');
var studentSchema = require('./student').schema;
var deckSchema = require('./deck').schema;

var sessionSchema = mongoose.Schema({
  startTime: Number,
  endTime: Number,
  duration: Number,
  deck: deckSchema,
  student: studentSchema
});

module.exports.schema = sessionSchema;
module.exports.model = mongoose.model(sessionSchema);