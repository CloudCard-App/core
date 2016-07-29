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

  newSchool.save().then(function () {
    res.status(200).send();
  }).catch(function (err) {
    console.error('Error saving new school: ' + err);
    res.status(500).send();
  });
};

module.exports.get_list = function(req, res) {
  let schoolModel = require('../model/school').model;
  schoolModel.find({}).sort({name: 1}).then(function (schools) {
    res.status(200).send(schools);
  }).catch(function (err) {
    console.error('Query for school ' + querySchoolName + ' returned error ' + err);
    res.status(500).send();
  });
};

module.exports.get_school = function(req, res) {
  let querySchoolName = req.query.name;

  let schoolModel = require('../model/school').model;
  schoolModel.find({name: querySchoolName}).sort({name: -1}).then(function (schools) {
    res.status(200).send(schools);
  }).catch(function (err) {
    console.error('Query for school ' + querySchoolName + ' returned error ' + err);
    res.status(500).send();
  });
};

module.exports.delete_school = function(req, res) {
  let schoolName = req.query.name;

  let schoolModel = require('../model/school').model;
  schoolModel.find({name: schoolName}).remove().then(function () {
    res.status(200).send();
  }).catch(function (err) {
    console.error('Delete school with name ' + schoolName + ' returned error ' + err);
    res.status(500).send();
  });
};