module.exports.post_create = function (req, res) {
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let duration = endTime - startTime;
  let deckID = req.body.deckID;
  let studentID = req.body.studentID;

  let deckModel = require('../model/deck').model;
  let studentModel = require('../model/student').model;
  let sessionModel = require('../model/session').model;

  let deckFind = deckModel.findOne({'_id': deckID});
  let studentFind = studentModel.findOne({'_id': studentID});

  Promise.all([deckFind, studentFind]).then(function (results) {
    let deck = results[0];
    let student = results[1];

    if (deck && student) {
      let newSession = new sessionModel({
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        deck: deck,
        student: student
      });
      return newSession.save();
    } else if (deck && !student) {
      res.status(400).send({error: 'no such student'});
    } else if (!deck && student) {
      res.status(400).send({error: 'no such deck'});
    } else {
      res.status(400).send({error: 'no such deck, no such student'});
    }
  }).then(function (newSession) {
    res.status(200).send(newSession);
  }).catch(function (err) {
    console.error('Error creating session: ' + err);
    res.status(500).send();
  });
};

module.exports.get_info = function (req, res) {
  let sessionID = req.query.sessionID;
  let sessionModel = require('../model/session').model;

  sessionModel.findOne({'_id': sessionID}).then(function (session) {
    res.status(200).send(session);
  }).catch(function (err) {
    console.error('Error finding session: ' + err);
    res.status(500).send();
  });
};

module.exports.get_list_student = function (req, res) {
  let studentID = req.query.studentID;
  let sessionModel = require('../model/session').model;

  sessionModel.find({'student._id': studentID}).sort({'startTime': 1}).then(function (sessions) {
    if (sessions) {
      res.status(200).send(sessions);
    } else {
      res.status(400).send({error: 'no such student'});
    }
  }).catch(function (err) {
    console.error('Error finding sessions by student: ' + err);
    res.status(500).send();
  });
};

module.exports.get_list_deck = function (req, res) {
  let deckID = req.query.deckID;
  let sessionModel = require('../model/session').model;

  sessionModel.find({'deck._id': deckID}).sort({'startTime': 1}).then(function (sessions) {
    if (sessions) {
      res.status(200).send(sessions);
    } else {
      res.status(400).send({error: 'no such deck'});
    }
  }).catch(function (err) {
    console.error('Error finding sesssions by deck: ' + err);
    res.status(500).send();
  });
};

module.exports.delete_session = function (req, res) {
  let sessionID = req.body.sessionID;
  let sessionModel = require('../model/session').model;

  sessionModel.findOne({'_id': sessionID}).remove().then(function (deleted) {
    console.log('deleted = ' + deleted);
    if (JSON.parse(deleted).n == 1) {
      res.status(200).send();
    } else {
      res.status(400).send({error: 'no such session'});
    }
  }).catch(function (err) {
    console.error('Error deleting session: ' + err);
    res.status(500).send();
  })
};