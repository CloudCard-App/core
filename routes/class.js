module.exports.post_create = function (req, res) {
  let name = req.body.name;
  let password = req.body.password;
  let teacherID = req.body.teacherID;

  let teacherModel = require('../model/teacher').model;
  teacherModel.findOne({'_id': teacherID}).then(function (teacher) {
    if (teacher) {
      let classModel = require('../model/class').model;
      return new classModel({
        name: name,
        password: password,
        teacher: teacher
      });
    }
  }).then(function (newClass) {
    return newClass.save();
  }).then(function (newClass) {
    res.status(200).send(newClass);
  }).catch(function (err) {
    console.error('Error creating new class: ' + err);
    res.status(400).send({error: 'teacher does not exist'});
  });
};

module.exports.get_list = function (req, res) {
  let teacherID = req.query.teacherID;

  let classModel = require('../model/class').model;
  classModel.find({'teacher._id': teacherID}).sort({'name': 1}).then(function (classes) {
    res.status(200).send(classes);
  }).catch(function (err) {
    console.error('Error finding classes for teacher: ' + err);
    res.status(400).send({error: 'teacher does not exist'});
  });
};

module.exports.get_info = function (req, res) {
  let id = req.query.id;

  let classModel = require('../model/class').model;

  classModel.findOne({'_id': id}).then(function (classHere) {
    res.status(200).send(classHere);
  }).catch(function (err) {
    console.error('Error finding class: ' + err);
    res.status(500).send();
  });
};

module.exports.delete_class = function (req, res) {
  let id = req.body.id;

  let classModel = require('../model/class').model;
  classModel.findOne({_id: id}).remove().then(function (deleted) {
    if (JSON.parse(deleted).n == 1) { // 1 document was deleted
      res.status(200).send();
    } else { // 0 or other documents were deleted :grimacing:
      res.status(400).send({error: 'no class found'});
    }
  }).catch(function (err) {
    console.error('Error deleting class: ' + err);
    res.status(500).send();
  });
};