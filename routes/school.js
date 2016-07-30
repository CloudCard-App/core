module.exports.post_register = function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let teachers = [];

  let schoolModel = require('../model/school').model;
  let newSchool = new schoolModel({
    name: name,
    email: email,
    teachers: teachers
  });

  newSchool.save().then(function (newSchool) {
    res.status(200).send(newSchool);
  }).catch(function (err) {
    console.error('Error saving new schoolRoutes: ' + err);
    res.status(500).send();
  });
};

module.exports.get_list = function(req, res) {
  let schoolModel = require('../model/school').model;
  schoolModel.find({}).sort({name: 1}).then(function (schools) {
    res.status(200).send(schools);
  }).catch(function (err) {
    console.error('Query for schoolRoutes ' + querySchoolName + ' returned error ' + err);
    res.status(500).send();
  });
};

module.exports.get_info = function(req, res) {
  let querySchoolName = req.query.name;

  let schoolModel = require('../model/school').model;
  schoolModel.findOne({name: querySchoolName}).then(function (school) {
    res.status(200).send(school);
  }).catch(function (err) {
    console.error('Query for schoolRoutes ' + querySchoolName + ' returned error ' + err);
    res.status(500).send();
  });
};

module.exports.delete_school = function(req, res) {
  let schoolName = req.body.name;

  let schoolModel = require('../model/school').model;
  schoolModel.findOne({name: schoolName}).remove().then(function () {
    res.status(200).send();
  }).catch(function (err) {
    console.error('Delete schoolRoutes with name ' + schoolName + ' returned error ' + err);
    res.status(500).send();
  });
};