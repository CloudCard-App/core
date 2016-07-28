var mongoose = require('mongoose');
var classSchema = require('class').schema;
var sessionSchema = require('session').schema;

var studentSchema = mongoose.Schema({
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
module.exports.model = mongoose.model(studentSchema);