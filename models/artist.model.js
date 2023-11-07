const { Schema, model } = require('mongoose');

const artistSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Full name field is required'],
    },
    first_name: {
      type: String,
      required: [true, 'First name field is required'],
    },
    middle_name: {
      type: String,
      required: [false, 'Middle name field is not required'],
    },
    last_name: {
      type: String,
      required: [true, 'Last name field is required'],
    },
    nationality: {
      type: String,
      required: [true, 'Nationality date field is required'],
    },
    style: {
      type: String,
      required: [true, 'Style date field is required'],
    },
    birth: {
      type: Date,
      required: [true, 'Date of birth field is required'],
    },
    death: {
      type: Date,
      required: [true, 'Date of passing field is required'],
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

module.exports = model('Artist', artistSchema);
