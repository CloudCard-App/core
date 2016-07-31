var mongoose = require('mongoose');
var classSchema = require('./class').schema;
var schoolSchema = require('./school').schema;

var studentSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    email: String,
    avatarUrl: String
  },
  classes: [classSchema],
  school: schoolSchema
});

module.exports.schema = studentSchema;
module.exports.model = mongoose.model('Student', studentSchema);