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



module.exports = Router;
