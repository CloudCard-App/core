var mongoose = require('mongoose');

var schoolSchema = new mongoose.Schema({
  name: String,
  email: String,
}, {collection: 'schools'});

module.exports.schema = schoolSchema;
module.exports.model = mongoose.model('School', schoolSchema);