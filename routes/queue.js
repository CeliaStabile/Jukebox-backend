var express = require('express');
var router = express.Router();
require('../models/connection');
const Party = require('../models/parties');
const { checkBody } = require('../modules/checkBody');


// copier toutes les chansons présentes dans la queue du DJ
router.put('/copyqueueitems/:name', function(req, res, next) {
    const newQueueItems = req.body;
    Party.updateOne({name: req.params.name}, { $push: { queueItems: { $each: newQueueItems }}})
    .then(result => {
      res.json({ result: true, message: 'Bien rajouté au queueItem' });
    })
    .catch(error => {
      console.error(error);
      res.json({ result: false, message: 'problème' });
    });
  });

  //copier la chanson nowPlaying dans la base de donnée
  router.put('/copynowplaying/:name', function(req, res, next) {

    if (!checkBody(req.body, ['title', 'artist', 'url_image','uri'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }

    const newNowPlaying = {
      title: req.body.title,
      artist: req.body.artist,
      url_image: req.body.url_image,
      uri: req.body.uri,
    };
    Party.updateOne({name: req.params.name}, { $set: { nowPlaying: newNowPlaying }})
    .then(result => {
      res.json({ result: true, message: 'Bien rajouté a nowPlaying' });
    })
    .catch(error => {
      console.error(error);
      res.json({ result: false, message: 'problème' });
    });
  });

//vider tous les queue items
//a utiliser comme ça dans front http://localhost:3000/queue/queueitems/retro8891
router.delete('/queueitems/:name', function(req, res, next) {
    Party.updateOne({ name: req.params.name }, { $set: { queueItems: [] } })
      .then(data => {
        res.json({ result: true, message: 'queueItem vidé' });
      })
      .catch(error => {
        res.json({ result: false, error: 'erreur' });
      });
  });


//route delete pour vider nowPlaying
router.delete('/nowplaying/:name', function(req, res, next) {
    Party.updateOne({ name: req.params.name }, { $set: { nowPlaying: {}} })
      .then(data => {
        res.json({ result: true, message: 'nowplaying vidé' });
      })
      .catch(error => {
        res.json({ result: false, error: 'erreur' });
      });
  });


// route get pour récupérer l'ensemble du queueItem en fonction du nom de la soirée
router.get('/queueitems/:name', function(req, res, next) {
  Party.findOne({name: req.params.name}, 'queueItems')
    .then(result => {
      res.json({ result: true, queueItems: result.queueItems });
    })
    .catch(error => {
      console.error(error);
      res.json({ result: false, message: 'problème' });
    });
});



// route get pour récupérer la chanson nowPlaying en fonction du nom de la soirée
router.get('/nowplaying/:name', function(req, res, next) {
    Party.findOne({name: req.params.name}, 'nowPlaying')
      .then(result => {
        res.json({ result: true, nowPlaying: result.nowPlaying });
      })
      .catch(error => {
        console.error(error);
        res.json({ result: false, message: 'problème' });
      });
  });
  
  
  module.exports = router;