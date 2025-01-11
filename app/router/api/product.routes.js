const express = require("express");
const routeLabel = require("route-label");
const Router = express.Router();
const productApiController = require("../../webservices/productApi.controller");

const namedRouter = routeLabel(Router);

namedRouter.post(
  "product.create",
  "/product/create",
  productApiController.createProduct
);
// namedRouter.get(
//   "product.all",
//   "/products",
//   AuthCheck,
//   productApiController.getAllProducts
// );
// namedRouter.get(
//   "product.single",
//   "/product/details/:id",
//   AuthCheck,
//   productApiController.getSingleProduct
// );



module.exports = Router;
