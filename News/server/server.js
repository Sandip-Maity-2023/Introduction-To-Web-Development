require("dotenv").config(); //used for environment variables like API keys

const express = require("express"); //used to create the server
const cors = require("cors"); //used to allow cross-origin requests 
const axios = require("axios"); //used to make HTTP requests
const { parse } = require("dotenv");
const app = express(); //create an instance of express

app.use(cors()); //use cors middleware to allow cross-origin requests
app.use(express.urlencoded({extended:true})); //used to parse URL-encoded bodies

const API_KEY = process.env.API_KEY; //get the API key from environment variables

function fetchNews(Url,res){
    axios.get(Url)
        .then(response=>{
            if(response.data.totalResults >0){
                res.json({
                    status:"200",
                    message:"Successfully fetched the data",
                    data: response.data
                });

            }else{
                res.json({
                    status:"200",
                    success:true,
                    message:"No more results to show"
                });
            }
        })
        .catch(error=>{
            res.json({
                status:"500",
                success:false,
                message:"Failed to fetch the data",
                error: error.message
            });
        });
}

//all news
app.get("/all-news",(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) || 40;
    let page=parseInt(req.query.page) || 1;
    let Url=`https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(Url,res);
});

//country
app.options("/country/:iso",cors());
app.get("/country/:iso",(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) || 80;
    let page=parseInt(req.query.page) || 1;
    const country=req.params.iso; //default to US if no country is provided
    let Url=`https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
})
//top-headlines
app.options("/top-headlines",cors());
app.get("/top-headlines",(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) || 80;
    let page=parseInt(req.query.page) || 1;
    let category=req.query.category || "business";
    let Url=`https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(Url,res);
})

//port
const PORT=process.env.PORT || 3000; //set the port to the environment variable PORT or 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); //start the server and listen on the specified port
// ae14fe61f0814ca087c50202cbbbc381