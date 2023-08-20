const express=require("express")
require('dotenv').config()
const {connection}=require("./config/db")
const {userRouter}=require("./Controller/user.Route")
const {notesRouter}=require("./Controller/notes.routes")
const { authMiddleware } = require("./Middlewares/auth.middleware")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send('welcome')
})
app.use("/user",userRouter)
app.use(authMiddleware)
app.use("/notes",notesRouter)
app.listen(process.env.PORT,async()=>{
    try{
        await connection
         console.log(("port",process.env.PORT,"is running"))
    }catch(err){
console.log(err.message)
    }
})