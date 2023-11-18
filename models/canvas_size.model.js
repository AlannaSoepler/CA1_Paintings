const { Schema, model } = require('mongoose');

const canvas_sizeSchema = new Schema(
  {
    width: {
      type: Number,
      required: [true, 'Full name field is required'],
    },
    height: {
      type: Number,
      required: [true, 'First name field is required'],
    },
    label: {
      type: String,
      required: [false, 'Middle name field is not required'],
    },
    product_size: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Canvas_Size',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Canvas_size', canvas_sizeSchema);
