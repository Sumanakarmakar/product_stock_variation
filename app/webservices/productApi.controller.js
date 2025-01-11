const { getRelativePath } = require("../helper/ImageUpload");
const productRepositories = require("../modules/product/repositories/product.repositories");
const fs = require("fs");
const path = require("path");

class ProductApiController {
  async createProduct(req, res) {
    try {
      const { title, description, categoryId } =
        req.body;
      const productData = {
        title,
        description,
        categoryId,
      };
      
      const savedProductData = await productRepositories.newProduct(
        productData
      );
      if (savedProductData) {
        return res.status(201).json({
          status: 200,
          message: "New Product created successfully",
          data: savedProductData,
        });
      } else {
        // fs.unlink(
        //   "./public/uploads/product/" + path.basename(req.file.path),
        //   (err) => {
        //     console.log(`Error in removing the pic ${err}`);
        //   }
        // );
        return res.status(400).json({
          message: "Error occured in creating product",
        });
      }
    } catch (error) {
      console.log(`Error in creating product ${error}`);
    //   fs.unlink(
    //     "./public/uploads/product/" + path.basename(req.file.path),
    //     (err) => {
    //       console.log(`Error in removing the pic ${err}`);
    //     }
    //   );
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new ProductApiController();
