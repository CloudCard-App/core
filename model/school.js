var mongoose = require('mongoose');
var teacherSchema = require('./teacher').schema;

var schoolSchema = mongoose.Schema({
  name: String,
  email: String,
  teachers: [teacherSchema]
}, {collection: 'schools'});

module.exports.schema = schoolSchema;
module.exports.model = mongoose.model(schoolSchema);