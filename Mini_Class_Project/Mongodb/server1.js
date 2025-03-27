const express= require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=3001

const app=express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/patients_data')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Connected to MongoDB")
})

const userSchema=new mongoose.Schema({
    patient_name:String,
    disease:String,
    severity_level:Int8Array,
})

const users=mongoose.model("data",userSchema)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'x.html'))
})

app.post('/post',async(req,res)=>{
    const {patient_name,disease,severity_level}=req.body
    const user=new users({
        patient_name,
        disease,
        severity_level
    })
await user.save()
console.log(user)
res.send("Form Submission Suceessful")

})

app.listen(port,()=>{
    console.log('Server is running on port',port)
})