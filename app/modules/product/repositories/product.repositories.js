const ProductModel = require("../model/product.model");


class ProductRepositories {

    async newProduct(data){
        try {
          const result=await ProductModel.create(data)
          return result  
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports=new ProductRepositories()