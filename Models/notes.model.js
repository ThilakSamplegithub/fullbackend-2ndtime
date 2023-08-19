const mongoose=require('mongoose')
const notesSchema=mongoose.Schema({
    author:{type:String,required:true},
    title:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{versionKey:false})
 const notesModel= mongoose.model("Notes",notesSchema)
 module.exports={notesModel}