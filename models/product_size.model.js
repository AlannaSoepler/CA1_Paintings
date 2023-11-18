const { Schema, model } = require('mongoose');

const product_sizeSchema = new Schema(
  {
    sale_size: {
      type: String,
      required: [true, 'Name field is required'],
    },
    regular_size: {
      type: String,
      required: [true, 'Address field is required'],
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

module.exports = model('Product_size', product_sizeSchema);
