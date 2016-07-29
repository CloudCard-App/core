var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
    avatarUrl: String
  },
}, {collection: 'teachers'});

module.exports.schema = teacherSchema;
module.exports.model = mongoose.model('Teacher', teacherSchema);