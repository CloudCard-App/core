var mongoose = require('mongoose');
var schoolSchema = require('./school').schema;

var teacherSchema = new mongoose.Schema({
  google: {
    id: String,
    // Token is removed since it changes with every login
    email: String,
    name: String,
    avatarUrl: String
  },
  school: schoolSchema
}, {collection: 'teachers'});

module.exports.schema = teacherSchema;
module.exports.model = mongoose.model('Teacher', teacherSchema);