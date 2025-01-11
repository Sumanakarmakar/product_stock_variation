const mongoose = require("mongoose");
const { Schema } = mongoose;

const VariantSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    color: { type: String, required: true },
    size: { type: String, required: false }, // for t-shirts
    ram: { type: Number, required: false }, // for mobile
    stock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: 0,
  }
);

const VariantModel = mongoose.model("variant", VariantSchema);
module.exports = VariantModel;
