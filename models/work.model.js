const { Schema, model } = require('mongoose');

const workSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Name field is required'],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  museum: {
    type: Schema.Types.ObjectId,
    ref: 'Museum',
  },
});

module.exports = model('work', workSchema);
