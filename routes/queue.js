
var express = require('express');
var router = express.Router();
require('../models/connection');
const Party = require('../models/parties');



// route pour ajouter une musique à la queueItem
router.put('/new', function(req, res, next) {
    const newQueueItem = {
      title: req.body.title,
      artist: req.body.artist,
      url_image: req.body.url_image,
      uri: req.body.uri,
    };
    Party.updateOne({name: req.query.name}, { $push: { queueItems: newQueueItem }})
    .then(result => {
      res.json({ success: true, message: 'Bien rajouté au queueItem' });
    })
    .catch(error => {
      console.error(error);
      res.json({ success: false, message: 'problème' });
    });
  });


// route delete pour vider la queueItem
  router.delete('/:name', function(req, res, next) {
    Party.updateOne({ name: req.params.name }, { $set: { queueItems: [] } })
      .then(data => {
        res.json({ result: true, message: 'queueItem vidé' });
      })
      .catch(error => {
        res.json({ result: false, error: 'erreur' });
      });
  });


// route get pour récupérer l'ensemble du queueItem en fonction du nom de la soirée  



  module.exports = router;