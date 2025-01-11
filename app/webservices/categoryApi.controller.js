const categoryRepositories = require("../modules/category/repositories/category.repositories");


class CategoryApiController {

    async createCategory(req,res){
        try {
            const {catName}=req.body
            const categoryData= {
                catName
            }
            const savedCategoryData=await categoryRepositories.newCategory(categoryData)
            return res.status(201).json({
                status: 200,
                message: "New category created successfully",
                data: savedCategoryData
            })
        } catch (error) {
            console.log(`Error in creating category ${error}`);
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    async getAllCategories(req,res){
        try {
           const allCategories=await categoryRepositories.findAllcategory()
           if(allCategories){
            return res.status(200).json({
                status: 200,
                message: "All categories fetches successfully",
                data: allCategories
            })
           } 
        } catch (error) {
            console.log(`Error in getting all categories ${error}`);
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

}

module.exports=new CategoryApiController()