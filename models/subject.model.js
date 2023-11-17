const { Schema, model } = require('mongoose');

const museumSchema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Name field is required'],
    },
    works: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Work',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Museum', museumSchema);
