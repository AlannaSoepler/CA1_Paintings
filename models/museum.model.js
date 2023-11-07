const { Schema, model } = require('mongoose');

const museumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is required'],
    },
    address: {
      type: String,
      required: [true, 'Address field is required'],
    },
    city: {
      type: String,
      required: [false, 'City field is not required'],
    },
    state: {
      type: String,
      required: [true, 'State field is required'],
    },
    postal_code: {
      type: String,
      required: [true, 'Postal code date field is required'],
    },
    country: {
      type: String,
      required: [true, 'Country date field is required'],
    },
    phone: {
      type: String,
      required: [false, 'Phone field is not required'],
    },
    url: {
      type: String,
      required: [false, 'url field is not required'],
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
