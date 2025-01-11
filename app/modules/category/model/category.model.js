const mongoose=require('mongoose')
const {Schema}=mongoose

const CategorySchema=new Schema({
    catName: {
        type: String
    }
},
{
    versionKey: 0
})

const CategoryModel=mongoose.model("category", CategorySchema)
module.exports=CategoryModel