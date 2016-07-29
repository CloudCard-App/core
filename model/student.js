var mongoose = require('mongoose');
var classSchema = require('./class').schema;

var studentSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    name: String,
    email: String,
    avatarUrl: String
  },
  classes: [classSchema],
  sessions: [sessionSchema]
});

module.exports.schema = studentSchema;
module.exports.model = mongoose.model('Student', studentSchema);