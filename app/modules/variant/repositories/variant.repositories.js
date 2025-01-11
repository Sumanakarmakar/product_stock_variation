const { default: mongoose } = require("mongoose");
const VariantModel = require("../model/variant.model");



class ProductVariantRepositories {

    async newVariant(data){
        try {
          const result=await VariantModel.create(data)
          return result  
        } catch (error) {
            console.log(error);
        }
    }

    async getProductVariant(id){
        const completeProduct = await VariantModel.aggregate([
            {
              $match: { _id: new mongoose.Types.ObjectId(id) },
            },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product_details",
              },
            },
            {
              $unwind: "$product_details",
            },
            
          ]);
          return completeProduct;
    }

}

module.exports=new ProductVariantRepositories()