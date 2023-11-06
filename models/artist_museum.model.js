// relationship.js

const { Schema, model } = require('mongoose');

const artist_museumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  museum: {
    type: Schema.Types.ObjectId,
    ref: 'Museum',
  },
});

module.exports = model('artist_museum', artist_museumSchema);
