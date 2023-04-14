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
  
  router.put('/like/:name/:uri', (req, res) => {
    Party.updateOne({ name: req.params.name, "suggestions.uri": req.params.uri }, { $inc: { "suggestions.$.likeCount": 1 } })
      .then(data => {
        res.json({ result: true, message: 'A voté' });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Probleme, soit uri ou name ? ' });
      });
  });
  
      
  //pour supprimer une suggestion si envoyer dans la playlist queue
  router.delete('/:name', function(req, res, next) {
    Party.updateOne({ name: req.params.name }, { $pull: { suggestions: { uri: req.body.uri } } })
      .then(data => {
        res.json({ result: true, message: 'Suggestion bien supprimée de la liste' });
      })
      .catch(error => {
        res.json({ result: false, error: 'soit la party non repertoriée ou uri non connu' });
      });
  });
  

module.exports = router;