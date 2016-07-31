module.exports.post_create = function (req, res) {
  let studentModel = require('../model/student').model;
  let schoolModel = require('../model/school').model;

  let email = req.body.gemail;
  let schoolEmailDomain = email.substring(email.indexOf('@') + 1, email.length);

  schoolModel.findOne({'email': schoolEmailDomain}).then(function (school) {
    if (school) {
      let newStudent = new studentModel({
        google: {
          id: req.body.gid,
          token: req.body.gtoken,
          email: req.body.gemail,
          name: req.body.gname,
          avatarUrl: req.body.gavatar
        },
        classes: [],
        school: school
      });
      return newStudent.save();
    } else {
      res.status(400).send({error: 'no such school'});
    }
  }).then(function (newStudent) {
    res.status(200).send(newStudent);
  }).catch(function (err) {
    console.error('Error registering student: ' + err);
    res.status(500).send();
  });
};

module.exports.get_info = function (req, res) {
  let studentID = req.query.id;
  let studentModel = require('../model/student').model;

  studentModel.findOne({'_id': studentID}).then(function (student) {
    res.status(200).send(student);
  }).catch(function (err) {
    console.error('Error finding student: ' + err);
    res.status(500).send();
  });
};

module.exports.post_enroll = function (req, res) {
  let studentID = req.body.studentID;
  let classID = req.body.classID;
  let studentModel = require('../model/student').model;
  let classModel = require('../model/class').model;

  let studentFind = studentModel.findOne({'_id': studentID});
  let classFind = classModel.findOne({'_id': classID});

  Promise.all([studentFind, classFind]).then(function (results) {
    let studentHere = results[0];
    let classHere = results[1];

    if (!studentHere) {
      res.status(400).send({error: 'student not found'});
    } else if (!classHere) {
      res.status(400).send({error: 'class not found'});
    } else {
      studentHere.classes.push(classHere);
      return studentHere.save();
    }
  }).then(function (student) {
    res.status(200).send(student);
  }).catch(function (err) {
    console.error('Error enrolling student: ' + err);
    res.status(500).send();
  });
};

module.exports.post_unenroll = function (req, res) {
  let studentID = req.body.studentID;
  let classID = req.body.classID;
  let studentModel = require('../model/student').model;

  studentModel.findOne({'_id': studentID}).then(function (student) {
    if (student) {
      console.log('student = ' + student);
      let newClasses = student.classes.filter(function (eachClass) {
        return eachClass._id != classID;
      });

      if (newClasses === student.classes) { // Class ID not found
        res.status(400).send({error: 'class not found'});
      } else {
        student.classes = newClasses;
        return student.save();
      }
    } else {
      res.status(400).send({error: 'student not found'});
    }
  }).then(function (student) {
    res.status(200).send(student);
  }).catch(function (err) {
    console.error('Error unenrolling student: ' + err);
    res.status(500).send();
  });
};

module.exports.delete_student = function (req, res) {
  let studentID = req.body.studentID;
  let studentModel = require('../model/student').model;

  studentModel.findOne({'_id': studentID}).remove().then(function (deleted) {
    if (JSON.parse(deleted).n == 1) {
      res.status(200).send();
    } else {
      res.status(400).send({error: 'student not found'});
    }
  }).catch(function (err) {
    console.error('Error deleting student: ' + err);
    res.status(500).send();
  })
};