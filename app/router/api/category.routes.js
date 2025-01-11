const express = require("express");
const routeLabel = require("route-label");
const categoryApiController = require("../../webservices/categoryApi.controller");
const Router = express.Router();

const namedRouter = routeLabel(Router);

namedRouter.post(
  "category.create",
  "/product-category/create",
  categoryApiController.createCategory
);

namedRouter.get(
  "category.all",
  "/categories",
  categoryApiController.getAllCategories
)



module.exports = Router;
