module.exports.post_create = function (req, res) {
  let deckID = req.body.deckID;
  let cardModel = require('../model/card').model;
  let deckModel = require('../model/deck').model;

  deckModel.findOne({'_id': deckID}).then(function (deck) {
    if (deck) {
      let newCard = new cardModel({
        deck: deck,
        dataType: req.body.dataType,
        front: req.body.front,
        back: req.body.back
      });

      return newCard.save();
    } else {
      res.status(400).send({error: 'no such deck'});
    }
  }).then(function (newCard) {
    res.status(200).send(newCard);
  }).catch(function (err) {
    console.error('Error creating card: ' + err);
    res.status(500).send();
  });
};

module.exports.post_update = function (req, res) {
  let cardID = req.body.cardID;
  let cardModel = require('../model/card').model;

  let newData = {};
  if (req.body.dataType) {
    newData.dataType = req.body.dataType;
  }
  if (req.body.front) {
    newData.front = req.body.front;
  }
  if (req.body.back) {
    newData.back = req.body.back;
  }

  cardModel.findOneAndUpdate({'_id': cardID}, newData, {upsert: false}).then(function (update) {
    console.log('update = ' + update);
    res.status(200).send();
  });
};

module.exports.get_info = function (req, res) {
  let cardID = req.query.cardID;
  let cardModel = require('../model/card').model;

  cardModel.findOne({'_id': cardID}).then(function (card) {
    res.status(200).send(card);
  }).catch(function (err) {
    console.error('Error finding card: ' + err);
    res.status(500).send();
  })
};

module.exports.get_list = function (req, res) {
  let deckID = req.query.deckID;
  let cardModel = require('../model/card').model;

  cardModel.find({'deck._id': deckID}).then(function (cards) {
    res.status(200).send(cards);
  }).catch(function (err) {
    console.error('Error finding cards: ' + err);
    res.status(500).send();
  });
};

module.exports.delete_card = function (req, res) {
  let cardID = req.body.cardID;
  let cardModel = require('../model/card').model;

  cardModel.findOne({'_id': cardID}).remove().then(function (deleted) {
    if (JSON.parse(deleted).n == 1) {
      res.status(200).send();
    } else {
      res.status(400).send({error: 'no such card'});
    }
  }).catch(function (err) {
    console.error('Error finding card: ' + err);
    res.status(500).send();
  });
};