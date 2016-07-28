var mongoose = require('mongoose');
var classSchema = require('./class').schema;

var teacherSchema = mongoose.Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
    avatarUrl: String
  },
  classes: [classSchema]
}, {collection: 'teachers'});

module.exports.schema = teacherSchema;
module.exports.model = mongoose.model(teacherSchema);