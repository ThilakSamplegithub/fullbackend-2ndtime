const {Router}=require("express")
const { notesModel } = require("../Models/notes.model")
const notesRouter=Router()
notesRouter.post("/add",async(req,res)=>{
try{
    const{author,title}=req.body
    // req.body.userId=req.userId
    console.log(req.body,"is going to be added")
 const note=await notesModel.create({author,title,userId:req.userId})
 res.send({note})
}catch(err){
    res.send(err.message)
}
})
notesRouter.get("/",async(req,res)=>{
    try{
const notes=await notesModel.find().populate('userId')
console.log(notes)
res.status(201).send(notes)
    }catch(err){
        res.status(400).send(err.message)
    }
})
notesRouter.patch("/update/:id",async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
       const note= await notesModel.findOne({_id:id})
       console.log(note)
       console.log(typeof note.userId)
       if(String(note.userId)!==req.userId){
        res.status(400).send(`you are not authorised`)
       }else{
        const updatedNote= await notesModel.updateOne({_id:id},{$set:req.body})
        return res.status(200).json({msg:updatedNote})
       }
    }catch(err){
        res.send(err.message)
    }
})
notesRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
       const note= await notesModel.findOne({_id:id})
       console.log(typeof note.userId)
       if(req.userId!==String(note.userId)){
        res.status(200).send(`you are not authorized`)
       }else{
        const updatedNote= await notesModel.deleteOne({_id:id})
        res.status(200).send({msg:`deleted successfully`})
       }
    }catch(err){
        res.send(err.message)
    }
})
module.exports={notesRouter}