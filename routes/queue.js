var express = require('express');
var router = express.Router();
require('../models/connection');
const Party = require('../models/parties');

router.post('/newtweet', (req, res) => {
    // on cherche par le token de l'utilisateur
   User.findOne({ uri : req.body.uri}).then(data => {
    
       if(!data){
         // on crée un nouveau tweet
            const newTweet = new Tweet({
                user : data.id,
                username: data.username,
                firstname: data.firstname,
                message: req.body.message,
                date: Date.now(),
                likes: 0,
                hashtag: hashtags,
            });
          // enregistrement
        newTweet.save().
          then(data => {
            res.json({ result: true , id : data.id, hashtag: hashtags}) })
       }else{
            res.json({ result: false, error: 'chanson déjà présente' });
       }
  
   })
  });
  