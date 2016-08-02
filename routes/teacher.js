module.exports.post_register = function (req, res) {
  let teacherModel = require('../model/teacher').model;
  let schoolModel = require('../model/school').model;

  let email = req.body.gemail;
  let schoolEmailDomain = email.substring(email.indexOf('@') + 1, email.length);

  schoolModel.findOne({'email': schoolEmailDomain}).then(function (school) {
    if (school) {
      let criteria = {
        google: {
          id: req.body.gid,
          token: req.body.gtoken,
          email: req.body.gemail,
          name: req.body.gname,
          avatarUrl: req.body.gavatar
        },
        school: school
      };
      // new true returns the updated document, not the original one
      return teacherModel.findOneAndUpdate(criteria, {upsert: true, new: true});
    } else {
      res.status(400).send({error: 'no such school'});
    }
  }).then(function (updatedTeacher) {
    res.status(200).send(updatedTeacher);
  }).catch(function (err) {
    console.error('Error registering teacher: ' + err);
    res.status(500).send();
  });

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

  module.exports.get_info = function (req, res) {
    let teacherID = req.query.id;
    let teacherModel = require('../model/teacher').model;

    teacherModel.findOne({'_id': teacherID}).then(function (teacher) {
      res.status(200).send(teacher);
    }).catch(function (err) {
      console.error('Error finding teacher: ' + err);
      res.status(500).send();
    });
  };

  module.exports.get_exists = function (req, res) {
    let id = req.query.gid;
    let token = req.query.gtoken;
    let name = req.query.gname;
    let avatarUrl = req.query.gavatar;

    let email = req.query.gemail;
    let schoolEmailDomain = email.substring(email.indexOf('@') + 1, email.length);

    let teacherModel = require('../model/teacher').model;
    teacherModel.findOne({
      'google.id': id,
      'google.token': token,
      'google.email': email,
      'google.name': name,
      'google.avatarUrl': avatarUrl,
      'school.email': schoolEmailDomain
    }).then((teacher) => {
      res.status(200).send(teacher);
    }).catch((err) => {
      console.error('Error finding teacher: ' + err);
      res.status(500).send();
    });
  };

  module.exports.delete_teacher = function (req, res) {
    let id = req.body.id;
    let teacherModel = require('../model/teacher').model;
    teacherModel.findOne({_id: id}).remove().then(function (deleted) {
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
};