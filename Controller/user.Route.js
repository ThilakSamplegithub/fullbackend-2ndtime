const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("../Models/user.model")
const userRouter=Router()
userRouter.post("/register",async(req,res)=>{
    try{
const {email,pass,name}=req.body
  bcrypt.hash(pass,5,async(err,hashed)=>{
    if(err){
        res.send("not hashed")
    }else{
        console.log(hashed)
       const user= await userModel.create({email,pass:hashed,name})
       res.status(200).json({msg:user})
    }
  })
    }catch(err){
        res.send({err:err.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    try{
const {email,pass}=req.body
      const user= await userModel.findOne({email})
      if(!user){
        res.status(200).send({msg:`No such user found`})
      }else{
        console.log(user)
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(err){
                res.send(err.message)
            }else{
                const token=jwt.sign({userId:user._id,user:user.name},"masai",{expiresIn:"7h"})
               return res.status(201).json({msg:'logged in successfully',token})
            }
        })
      }
    }catch(err){
        res.send(err.message)
    }
})
module.exports={userRouter}