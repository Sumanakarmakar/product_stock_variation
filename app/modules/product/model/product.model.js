const mongoose = require("mongoose");
const { Schema } = mongoose;


const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
    versionKey: 0,
  }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
