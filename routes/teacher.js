module.exports.post_register = function (req, res) {
  let teacherModel = require('../model/teacher').model;
  let newTeacher = new teacherModel({
    google: {
      id: req.body.gid,
      token: req.body.gtoken,
      email: req.body.gemail,
      name: req.body.gname,
      avatarUrl: req.body.gavatar
    }
  });

  newTeacher.save().then(function () {
    res.status(200).send();
  }).catch(function (err) {
    console.error('Error saving new teacher: ' + err);
  });
};

module.exports.get_list = function (req, res) {
  let teacherModel = require('../model/teacher').model;
  teacherModel.find({}).sort({'google.name': 1}).then(function (teachers) {
    res.status(200).send(teachers);
  }).catch(function (err) {
    console.error('Error listing teachers: ' + err);
    res.status(500).send();
  });
};

module.exports.get_info = function (req, res) {
  let name = req.query.name;
  let teacherModel = require('../model/teacher').model;
  teacherModel.findOne({'google.name': name}).then(function (teacher) {
    res.status(200).send(teacher);
  }).catch(function (err) {
    console.error('Error finding teacher: ' + err);
    res.status(500).send();
  })
};

module.exports.delete_teacher = function (req, res) {
  let name = req.body.name;
  let teacherModel = require('../model/teacher').model;
  teacherModel.findOne({'google.name': name}).remove().then(function () {
    res.status(200).send();
  }).catch(function (err) {
    console.log('Error deleting teacher: ' + err);
    res.status(500).send();
  });
};