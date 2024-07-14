
function myfunction(){
    console.log("welcome to Apna College!");
    console.log("we are lerning JS:");
}
myfunction();
myfunction();

console.log("hello!");
"abc".toUpperCase()
"xyz".toLowerCase()
//[1,2,3].push(4);

function Myfunction(msg,n){
    //parameter->input
    console.log(msg*n);
}
Myfunction("I love JS",100);  //argument  NaN not a number

function sum(x,y){
    console.log(x+y);
}

function add(x,y){
    //local variables
    s=x+y;
    console.log("before return");
    return s;
    console.log("after return");
}
let val=add(8,9);
console.log(val);



//sum function
function Sum(a,b){
    return a+b;
}
//Modern JS
const arrowSum=(a,b) =>{
    console.log(a+b);
};

//multiplication function
function mul(a,b){
    return a*b;
}

const arrowMul=(a,b)=>{
    return a*b;
};

const printHello=()=>{
console.log("hello");
};



//const printHello=()=> console.log("hello");
        

