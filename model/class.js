var mongoose = require('mongoose');
var studentSchema = require('./student').schema;
var deckSchema = require('./deck').schema;
var teacherSchema = require('./teacher').schema;

var classSchema = mongoose.Schema({
  name: String,
  accessCode: String,
  decks: [deckSchema],
  teacher: teacherSchema,
  students: [studentSchema]
});

module.exports.schema = classSchema;
module.exports.model = mongoose.model(classSchema);