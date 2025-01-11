const fs = require("fs");
const path = require("path");
const variantRepositories = require("../modules/variant/repositories/variant.repositories");
const { getRelativePath } = require("../helper/ImageUpload");

class VariantApiController {
  async createvariant(req, res) {
    try {
      const { productId, color, size, stock, ram, price } = req.body;
      const productVariantData = {
        productId,
        color,
        size,
        stock,
        ram,
        price,
      };
      if (req.file) {
        productVariantData.image = getRelativePath(req.file.path);
      }
      const savedVariantData = await variantRepositories.newVariant(
        productVariantData
      );
      if (savedVariantData) {
        return res.status(201).json({
          status: 200,
          message: "New Product variant created successfully",
          data: savedVariantData,
        });
      } else {
        fs.unlink(
          "./public/uploads/product/" + path.basename(req.file.path),
          (err) => {
            console.log(`Error in removing the pic ${err}`);
          }
        );
      }
    } catch (error) {
      console.log(`Error in creating product variant ${error}`);
      fs.unlink(
        "./public/uploads/product/" + path.basename(req.file.path),
        (err) => {
          console.log(`Error in removing the pic ${err}`);
        }
      );
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }

  async getProduct(req, res) {
    try {
        const data=await variantRepositories.getProductVariant(req.params.id)
        if(data){
            return res.status(200).json({
                status: 200,
                message: "Product variants fetched successfully",
                data: data
            })
        }
    } catch (error) {
      console.log(`Error in getting product variant ${error}`);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = new VariantApiController();
