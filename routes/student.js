module.exports.post_create = function (req, res) {
  let studentModel = require('../model/student').model;
  let schoolModel = require('../model/school').model;

  let email = req.body.gemail;
  let schoolEmailDomain = email.substring(email.indexOf('@') + 1, email.length);
  let schoolWithEmail = null;

  schoolModel.findOne({'email': schoolEmailDomain}).then(function (school) {
    if (school) {
      schoolWithEmail = school;
      let criteria = {
        'google.id': req.body.gid,
        'school._id': school.id
      };
      return studentModel.findOne(criteria);
    } else {
      res.status(400).send({error: 'no such school'});
    }
  }).then((student) => {
    if (student) {
      console.log('existing student ' + student);
      res.status(200).send(student);
    } else {
      let newStudent = new studentModel({
        google: {
          id: req.body.gid,
          email: req.body.gemail,
          name: req.body.gname,
          avatarUrl: req.body.gavatar
        },
        classes: [],
        school: schoolWithEmail
      });
      return newStudent.save();
    }
  }).then(function (newStudent) {
    console.log('new student ' + newStudent);
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

module.exports.get_students_school = function (req, res) {
  let schoolID = req.query.schoolID;
  let studentModel = require('../model/student').model;

  studentModel.find({'school._id': schoolID}).sort({'name': 1}).then(function (students) {
    res.status(200).send(students);
  }).catch(function (err) {
    console.error('Error getting students for class ' + err);
    res.status(500).send();
  })
};

module.exports.get_students_class = function (req, res) {
  let classID = req.query.classID;
  let studentModel = require('../model/student').model;

  studentModel.find({'classes._id': classID}).sort({'name': 1}).then(function (students) {
    res.status(200).send(students);
  }).catch(function (err) {
    console.error('Error getting students for class ' + err);
    res.status(400).send();
  })
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
      res.status(400).send({error: 'no such student'});
    } else if (!classHere) {
      res.status(400).send({error: 'no such class'});
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
        res.status(400).send({error: 'no such class'});
      } else {
        student.classes = newClasses;
        return student.save();
      }
    } else {
      res.status(400).send({error: 'no such student'});
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
      res.status(400).send({error: 'no such student'});
    }
  }).catch(function (err) {
    console.error('Error deleting student: ' + err);
    res.status(500).send();
  })
};
