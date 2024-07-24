/*
async function hello(){
console.log("hello");
}



function api(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("weather data");
            resolve(200);
        },2000);
    });
}

async function getWeatherData(){
    await api();    //1st
    await api();    //2nd
}
*/


function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("data",dataId);
            resolve("success");
        },2000);
    });
}

//Async-await
async function getAllData(){
    console.log("getting data0....");
    await getData(1);
    console.log("getting data1....");
    await getData(2);
    console.log("getting data2....");
    await getData(3);
    console.log("getting data3....");
    await getData(4);
    console.log("getting data4....");
}


(async function getAllData(){
    await getData(1);
    console.log("getting data1....");
    await getData(2);
    console.log("getting data2....");
    await getData(3);
    console.log("getting data3....");
    await getData(4);
    console.log("getting data4....");
    await getData(5);
    console.log("getting data5....");

})();  //this code automatically get executed


// IIFE => Immediately Invoked Function Expression


//API API API API API API API//

     //fetch API Application Programming Interface//

const URL="https://cat-fact.herokuapp.com/facts";
const factPara=document.querySelector("#fact");
const btn=document.querySelector("#btn");



//let promise=fetch(URL);
//console.log(promise);
/*
const getFacts=async () =>{
    console.log("getting data...");
    
let response=await fetch(URL);
console.log(response);   //JSON format
console.log(response.status);

let data=await response.json();  //json convert text into readable format
//console.log(data[0].text);
factPara.innerText=data[1].text;
 };
*/

//it can be written as---
function getFacts(){
    fetch(URL).then((response)=>{
        return response.json();

    })
    .then((data)=>{
        console.log(data);
        factPara.innerText=data[2].text;
    });
}
 btn.addEventListener("click",getFacts);
//understanding terms
/*
AJAX
JSON
json()
*/






















