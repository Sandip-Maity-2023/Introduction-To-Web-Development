let score =33;
let scoreString = score.toString(); // Convert number to string
let scoreNumber = Number(scoreString); // Convert string back to number 
console.log("Score as string:", scoreString); // "33"
console.log("Score as number:", scoreNumber); // 33
//1:03

let num=33

let s=String(num);
console.log(s); // "33"
console.log(typeof s); // "string"

let value=3
let neg=-value;
console.log(neg);
console.log(2+2)
console.log(2**2)
console.log(value==null)

const heros=["krrish","superman","batman"]

let myobj={
    name:"john",
    age:30
}

const myFunction=function(){
    console.log("Hello from myFunction!");
}

let myth=myobj

myth.name="doe"

console.log(myth.name); 
console.log(myobj.age);

const name="Sandip";
const age1=25;

console.log(`my name is ${name} and age is ${age1}`)

const game=new String('hiteshhc') //run in inspect element console
console.log(game[3]); // String { "hiteshhc" }
console.log(game.length); // 8
console.log(game.toUpperCase()); // "HITESHHC"
console.log(game.charAt(3)); // "hiteshhc"
//2:30