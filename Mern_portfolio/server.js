const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');

//dotenv configuration
dotenv.config();

//rest object
const app=express();

//midlewares
app.use(cors());
app.use(express.json());

//routes
// app.get("/",(req,res)=>{
//     res.send('<h1>Welcome To Node Server</h1>')
// })
app.use("/api/v1/portfolio",require("./routes/portfolioRoute"));

//port
const PORT=process.env.PORT || 5000;

//listen
app.listen(PORT,()=>{
    console.log(`Server Running On PORT ${PORT} `)
});
