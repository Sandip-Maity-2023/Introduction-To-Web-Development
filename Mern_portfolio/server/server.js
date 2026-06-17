// const express=require('express');
// const cors=require('cors');
// const dotenv=require('dotenv');
import portfolioRoutes from "./routes/portfolioRoute.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
app.use("/api/v1/portfolio", portfolioRoutes);

//port
const PORT=process.env.PORT || 5000;

//listen
app.listen(PORT,()=>{
    console.log(`Server Running On PORT ${PORT} `)
});

app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

