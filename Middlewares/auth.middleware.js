const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization
   jwt.verify(token,"masai",(err,decoded)=>{
    if(err){
        res.send({err:err.message})
    }else{
        console.log(decoded,"is decoded")
        req.userId=decoded.userId
        req.user=decoded.user
        next()
    }
   }) 
}
module.exports={authMiddleware}