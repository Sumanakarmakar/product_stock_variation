const express = require("express");
const routeLabel = require("route-label");
const variantApiController = require("../../webservices/variantApi.controller");
const { uploadProductImage } = require("../../helper/ImageUpload");
const Router = express.Router();

const namedRouter = routeLabel(Router);

namedRouter.post(
  "product.variant.create",
  "/product-variant/create",
  uploadProductImage.single('image'),
  variantApiController.createvariant
);

namedRouter.get(
  "product.variant.all",
  "/product-variants/:id",
  variantApiController.getProduct
);



module.exports = Router;
