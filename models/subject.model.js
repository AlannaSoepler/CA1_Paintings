const { Schema, model } = require('mongoose');

const subjectSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Name field is required'],
    },
  },
  { timestamps: true }
);

module.exports = model('Subject', subjectSchema);
