var express = require('express');
var router = express.Router();
require('../models/connection');
const Party = require('../models/parties');


//pour avoir la liste de la liste de suggestion
 router.get('/:name', function(req, res, next){
    Party.findOne({ name : req.params.name})
    .then(data => {
        const tab = data.suggestions;
        //console.log('data', tab)
        res.json({ success: true, suggestions: tab })
    })})
        




//pour ajouter une nouvelle suggestion dans le tableau Suggestions de la database
// ajout condition si uri chanson déjà en db
router.put('/new', function(req, res, next) {
    const newSuggestion = {
      title: req.body.title,
      artist: req.body.artist,
      url_image: req.body.url_image,
      uri: req.body.uri,
      likeCount: 0
    };
    Party.updateOne({name: req.body.name}, { $push: { suggestions: newSuggestion }})
    .then(result => {
      res.json({ success: true, message: 'Suggestion bien ajouté à liste !' });
    })
    .catch(error => {
      console.error(error);
      res.json({ success: false, message: 'Sorry il y a un soucis vérifie si le chemin est bon' });
    });
  });
  
  
  
  
          
  
  // les invités peuvent envoyés des likes et increment le compteur ( comme dans hackatweet)    
  
  // router.put('/like/:name/:uri', (req, res) => {
  //   Party.updateOne({ name: req.params.name, "suggestions.uri": req.params.uri }, { $inc: { "suggestions.$.likeCount": 1 } })
  //     .then(data => {
  //       res.json({ result: true, message: 'A voté' });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(500).json({ error: 'Probleme, soit uri ou name ? ' });
  //     });
  // });
  router.put('/like/:name/:uri', (req, res) => {
    Party.findOneAndUpdate(
      { name: req.params.name, "suggestions.uri": req.params.uri },
      { $inc: { "suggestions.$.likeCount": 1 } },
      { new: true } // Return the updated document
    )
    .then(updatedParty => {
      // Find the updated suggestion
      const updatedSuggestion = updatedParty.suggestions.find(s => s.uri === req.params.uri);
  
      res.json({
        result: true,
        message: 'A voté',
        likeCount: updatedSuggestion.likeCount
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Problème lors de la mise à jour des likes' });
    });
  });
  
      
  router.put('/dislike/:name/:uri', (req, res) => {
    Party.findOneAndUpdate(
      { name: req.params.name, "suggestions.uri": req.params.uri },
      { $inc: { "suggestions.$.likeCount": -1 } },
      { new: true } // Return the updated document
    )
    .then(updatedParty => {
      // Find the updated suggestion
      const updatedSuggestion = updatedParty.suggestions.find(s => s.uri === req.params.uri);
  
      res.json({
        result: true,
        message: 'a supprimé son vote',
        likeCount: updatedSuggestion.likeCount
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Problème lors de la mise à jour des likes' });
    });
  });
  
  
  
  //pour supprimer une suggestion si envoyer dans la playlist queue à revoir le chemin ???
  router.delete('/:name/:uri', function(req, res, next) {
    Party.updateOne({ name: req.params.name }, { $pull: { suggestions: { uri: req.params.uri } } })
      .then(data => {
        res.json({ result: true, message: 'Chanson bien envoyée' });
      })
      .catch(error => {
        res.json({ result: false, error: 'erreur' });
      });
  });

  router.put('/:name/:uri', function(req, res, next) {
    Party.updateOne(
      { name: req.params.name },
      { $pull: { suggestions: { uri: req.params.uri } } }
    )
    .then(data => {
      res.json({ result: true, message: 'Suggestion supprimée avec succès' });
    })
    .catch(error => {
      res.json({ result: false, error: 'Erreur lors de la suppression de la suggestion' });
    });
  });
  

module.exports = router;