module.exports.post_create = function (req, res) {
  let name = req.body.name;
  let classID = req.body.classID;
  let deckModel = require('../model/deck').model;
  let classModel = require('../model/class').model;

  classModel.findOne({'_id': classID}).then(function (classHere) {
    if (classHere) {
      let newDeck = new deckModel({
        name: name,
        class: classHere
      });
      return newDeck.save();
    } else {
      res.status(400).send({error: 'no such class'});
    }
  }).then(function (newDeck) {
    res.status(200).send(newDeck);
  }).catch(function (err) {
    console.log('Error creating deck: ' + err);
    res.status(500).send();
  });
};

module.exports.get_info = function (req, res) {
  let deckID = req.query.deckID;
  let deckModel = require('../model/deck').model;

  deckModel.findOne({'_id': deckID}).then(function (deck) {
    res.status(200).send(deck);
  }).catch(function (err) {
    console.error('Error getting info for deck: ' + err);
    res.status(500).send();
  })
};

module.exports.get_decks = function (req, res) {
  let classID = req.query.classID;
  let deckModel = require('../model/deck').model;

  deckModel.find({'class._id': classID}).sort({'name': 1}).then(function (decks) {
    res.status(200).send(decks);
  }).catch(function (err) {
    console.error('Error getting decks: ' + err);
    res.status(500).send();
  })
};

module.exports.delete_deck = function (req, res) {
  let deckID = req.body.deckID;
  let deckModel = require('../model/deck').model;

  let deckDeletion = deckModel.findOne({'_id': deckID}).remove().then(function (deleted) {
    if (JSON.parse(deleted).n == 1) {
      res.status(200).send();
    } else {
      res.status(400).send({error: 'no such deck'});
    }
  });
};