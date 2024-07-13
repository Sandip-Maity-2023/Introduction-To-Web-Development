//Strings
 let str="Apna College";
// let str2='Apna College';
// console.log(str);
// console.log(str2);

// console.log(str.length);  //length string
// console.log(str[1]);  //string indices
//  let specialString='this is a template literal';
//  console.log(specialString);

//  let obj={
//     item:"pen",
//     price:10,
//  };
//  console.log("the cost of",obj.item,"is",obj.price,"rupees"); //another way is below
//  console.log('the cost of ${obj.item} is ${obj.price} rupees');
//  console.log(output);

 //template literals
 let SpecialString ='this is a template string';
 console.log(typeof specialString);
 
 let SpecialString1="This is a template literal ${1+2+3}";
 console.log(SpecialString1);

 console.log("Apna\ncollege"); //t is single character
 console.log("Apna\tcollege");
 console.log(str.length);

 //let str="Apna College";
str=str.toUpperCase();
console.log(str);

 str=str.toLowerCase();
 console.log(str);

 let str1 ="    Apna College JS  ";
console.log(str1.trim());

//let str2="a b c d e f g hijklmnopqrstuvwxyz";
  let str2="012345678";
//console.log(str.slice(start,end?)); //return the part of the string
console.log(str2.slice(3,5));
console.log(str2.slice(4));

str1.concat(str2);
let res=str1.concat(str2);  // or  let res ="hello" + str1 + str2;
console.log(res);

let str3="hellololo";
console.log(str3.replace("h"));
console.log(str3.replace("h","y"));

console.log(str3.replace("lo","p"));
console.log(str3.replaceAll("lo","p"));

let str4="ILoveJs";
console.log(str4.charAt(0));
console.log(str4[0]);
str4=str4.replace("I","S");
console.log(str4);