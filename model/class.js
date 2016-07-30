var mongoose = require('mongoose');
var teacherSchema = require('./teacher').schema;

var classSchema = new mongoose.Schema({
  name: String,
  password: String,
  teacher: teacherSchema,
});

module.exports.schema = classSchema;
module.exports.model = mongoose.model('Class', classSchema);