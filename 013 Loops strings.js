for(let i=1;i<=5;i++){
    console.log("I love you.");
}
let sum=0;
let n=5;
for(let i=1;i<=n;i++){
    sum+=i;
}
console.log(sum,"=sum");
console.log("loop has ended");

let i=1;
while(i<=10){
    console.log("Akash institute of Technology");
    i++;
}
// for-of loop
// let str="Apna College";
let size=0;
for(let val of str){        //iterator->characters
    console.log("var=",val);
    size++;
}
console.log("string size=",size); //10

//for-in loop
let student={
    name:"Rahul Kumar",
    age:20,
    sgpa:7.6,
    isPass:true
};
for(let key in student){
    console.log("key=",key,"value=",student[key]);
}

// Qs1.print all even numbers from 0 to 100.
for(let i=1;i<=100;i++){
    if(i%2==0){
        console.log("i",i);
    }
}

//Qs2. create a game where you start with any random game Number.Ask the user to keep guessing the game until the user enters correct Value.
let gameNum=25;
let userNum=prompt("Guess the game number: ");
 while(userNum != gameNum){
    prompt("you entered wrong number.Guess again");
 }
 console.log("congratulations,you entered the right number");


