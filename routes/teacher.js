module.exports.post_register = function (req, res) {
  let teacherModel = require('../model/teacher').model;

  let email = req.body.gemail;
  let schoolEmailDomain = email.substring(email.indexOf('@') + 1, email.length);
  console.log('school email domain = ' + schoolEmailDomain);

  let newTeacher = new teacherModel({
    google: {
      id: req.body.gid,
      token: req.body.gtoken,
      email: req.body.gemail,
      name: req.body.gname,
      avatarUrl: req.body.gavatar
    }
  });

  let schoolModel = require('../model/school').model;
  schoolModel.findOne({'email': schoolEmailDomain}).then(function (school) {
    if (school) {
      newTeacher.school = school;
      return newTeacher.save();
    } else {
      res.status(400).send({error: 'no such school'});
    }
  }).then(function (newSchool) {
    res.status(200).send(newSchool);
  }).catch(function (err) {
    console.error('Error registering teacher: ' + err);
    res.status(500).send();
  });
};

module.exports.get_list = function (req, res) {
  let schoolID = req.query.schoolID;
  let schoolName = req.query.schoolName;

  let teacherModel = require('../model/teacher').model;

  if (schoolID) {
    teacherModel.find({'school._id': schoolID}).sort({'google.name': 1}).then(function (teachers) {
      res.status(200).send(teachers);
    }).catch(function (err) {
      console.error('Error listing teachers: ' + err);
      res.status(500).send();
    });
  } else if (schoolName) {
    teacherModel.find({'school.name': schoolName}).sort({'google.name': 1}).then(function (teachers) {
      res.status(200).send(teachers);
    }).catch(function (err) {
      console.error('Error listing teachers: ' + err);
      res.status(500).send();
    });
  }

};

/*
 Use either a school ID or a school name
 Use either a teacher ID or a teacher name

 It is recommended to use both school ID and teacher ID unless you are searching.
 */
module.exports.get_info = function (req, res) {
  let teacherID = req.query.id;

  let teacherModel = require('../model/teacher').model;

  teacherModel.findOne({'_id': teacherID}).then(function (teacher) {
    res.status(200).send(teacher);
  }).catch(function (err) {
    console.error('Error finding teacherRoutes: ' + err);
    res.status(500).send();
  });
};

module.exports.delete_teacher = function (req, res) {
  let id = req.body.id;
  let teacherModel = require('../model/teacher').model;
  teacherModel.findOne({_id: id}).remove().then(function (deleted) {
    console.log('deleted: ' + deleted);
    if (JSON.parse(deleted).n == 1) { // 1 document was deleted
      res.status(200).send();
    } else { // 0 or other documents were deleted
      res.status(400).send({error: 'no teacher found'});
    }
  }).catch(function (err) {
    console.log('Error deleting teacherRoutes: ' + err);
    res.status(500).send();
  });
};