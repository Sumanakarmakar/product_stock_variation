const CategoryModel = require("../model/category.model");


class CategoryRepositories {

    async newCategory(data){
        try {
          const result=await CategoryModel.create(data)
          return result  
        } catch (error) {
           console.log(error); 
        }
    }

    async findAllcategory(){
      try {
        const result=await CategoryModel.find()
        return result  
      } catch (error) {
         console.log(error); 
      }
    }

}

module.exports=new CategoryRepositories()