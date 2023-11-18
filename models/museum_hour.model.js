const { Schema, model } = require('mongoose');

const museum_hourSchema = new Schema(
  {
    day: {
      type: String,
      required: [true, 'Name field is required'],
    },
    open: {
      type: String,
      required: [true, 'Address field is required'],
    },
    close: {
      type: String,
      required: [false, 'City field is not required'],
    },
  },
  { timestamps: true }
);

module.exports = model('Museum_hour', museum_hourSchema);
