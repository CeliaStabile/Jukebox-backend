const mongoose = require('mongoose');

const queueItemsSchema = mongoose.Schema({
    title: String,
    artist: String,
    url_image: String,
    uri: String,
});

const suggestionsSchema = mongoose.Schema({
    title: String,
    artist: String,
    url_image: String,
    uri: String,
    likeCount: Number,
});

const nowPlayingSchema = mongoose.Schema({
    title: String,
    artist: String,
    url_image: String,
    uri: String,
});

const partySchema = mongoose.Schema({
    name: String,
    nowPlaying: {
        type: nowPlayingSchema,
        default: {}
      },
    queueItems: [queueItemsSchema],
    suggestions: [suggestionsSchema],
  });

const Party = mongoose.model('parties', partySchema);

module.exports = Party;