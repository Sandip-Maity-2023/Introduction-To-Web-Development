// Qs1. create a const object called "product" to store information shown in the Picture.
const product={
    product_name:"parker jotter Standard CT Ball Pen(black)",
    price:270,
    discount:75,
    rating:4,
};
console.log(product);

//Q2. Create a const object called "profile" to store information shown in the picture.
const profile={
username:"@shradhakhapra",
isFollow:false,
followers:123,
following:4,
};
console.log(typeof profile);
console.log(typeof profile["username"]);
console.log(typeof profile["isFollow"]);

//Arithmetic Operator
let a=4;
let b=8;
// console.log("a+b=",a+b);
// console.log("a-b=",a-b);
// console.log("a/b=",a/b);
// console.log("a*b=",a*b);
// console.log("a%b=",a%b); 
// console.log("a^b=",a**b); ctrl+/=comment   //1:30:20

//unary Operator
console.log("a=",a,"b=",b);
a=a+1; //or a++
console.log("a",a);
b=b-1; //or b--
console.log("a++=",a++);
console.log("++a=",++a);
// comparison operator
let c=8;
let d=9;//number
let e="9"; //string->number

console.log("c==d",c==d); 
console.log("d==c",d==c);
console.log("8!=9",c!=d);

//Equal to == Equal to & type ===
console.log("d===e",d===e);

//&& logical AND
// || Logical OR
// ! logical not
console.log("!(6<5)=",!(6<5)); //true

//Conditional statements

let age=16;

if(age>18){
    console.log("you can vote");
}
if(age<18){
    console.log("you can't vote");
}


let mode="dark";
let color;

 if(mode==="dark"){
    color="black";
 }else
//  (mode==="light")
{
    color="white";
 }
 console.log(color);
 //odd or even
 let num=10;
 if(num%2==0){
    console.log(num,"is even");
 }else{
    console.log(num,"is odd");
 }

 //syntax->rules
 if(age<18){
    console.log("junior");
 }else if(age>60){
    console.log("senior");
 }else{
    console.log("middle");
 }


 let Mode="dark";
 let Color;
 if(Mode==="dark"){
    Color="black";
 }else if(Mode==="pink"){
    Color="pink";
 }else if(Mode==="blue"){
    Color="blue";
 }else{
    Color="white";
 }
 console.log(color);


 //TERNARY OPERATOR

 let Age=25;
 let result= Age>=18 ? console.log("adult"): console.log("not adult");

 //MDN Docs for theory of html,css,javaScript



 //Qs1. Get user to input a number using prompt("Enter a number:").Check if  the number is a multiple of 5 or not.
 alert("what are you doing ?"); //one time popup
 
 prompt("do better than before");  //can take input
  let number=prompt("Enter a number:");
  if(number % 5===0){
    console.log(num,"is multiple of 5");
  }else{
    console.log(num,"is not multiple of 5");
  }
  

  /* Qs2. write a code which can give grades to students according to their scores:
  80-100,A
  70-89,B 
  60-69,C 
  50-59,D 
  0-49,F */
  let score=prompt("Enter your score(0-100):");
  let grade;

  if(score>=90 && score<=100){
    grade="A";
  }else if(score>=70 && score<=89){
    grade="B";
  }else if( score>=50 && score<=69){
    grade="C";
  }else if(score>=40 && score<=59){
    gade="D";
  }else(score>=0 && score<=49)
    grade="F";
  
  console.log("According to your scores,your grade is: ",grade);
