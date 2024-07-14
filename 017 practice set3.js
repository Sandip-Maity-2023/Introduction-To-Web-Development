/*   Qs. Create a function using the "function"
keyword that takes a string as an argument & returns the number of vowels in the string. */

/* Qs. Create an arrow function to perform the same task. */


function countVowels(str){
    let count=0;
    for(const char of str){
        if(char==="a" || char==="e" || char==="i"||char==="o"||char==="u"){
        count++;
    }
}
return count;
}

const countVow=(str) =>{
    let count=0;
    for(const char of str){
        if(char==="a" || char==="e" || char==="i"||char==="o"||char==="u"){
        count++;
    }
}
return count;
};

"abc".toUpperCase();
//

/* 
let arr=[1,2,3,4,5];
arr.forEach(function printVal(val){
    console.log(val);
});
*/
 let arr=[1,2,3,4,5];
 arr.forEach((val) =>{
    console.log(val);
 });

 let array=["Pune","Delhi","Mumbai"];

 array.forEach((val,idx,array)=>{
    console.log(val.toUpperCase(),idx,array);
 });

/* Qs. For a given array of numbers,print the square of each value using the forEach loop. 
let nums=[2,3,4,5,6];
let calcSquare=(num)=>{
    console.log(num*num);  //num**2
};
nums.forEach(calcSquare);
*/
let nums=[67,84,49];
nums.map((val)=>{
    console.log(val);
});

let calcSquare=(num)=>{
    console.log(num*num);  //num**2
};


 let newArr=nums.map((val)=>{
    return val*val;
 });
 console.log(newArr);
//
let arr2=[1,2,3,4,5,6,7];

let evenArr=arr2.filter((val)=>{
    //return val%2!==0;
    return val>3;
});
console.log(evenArr);


//reduce
const array1=[1,2,3,4];
//0+1+2+3+4
const initialValue=0;
const sumWithInitial=array1.reduce((accumulator,currentValue)=>accumulator + currentValue,initialValue,);
console.log(sumWithInitial);

let arr3=[1,2,3,4];

const output=arr3.reduce((res,curr)=>{
    return res+curr;
});
const output1=arr3.reduce((prev,curr)=>{
    return prev>curr ? prev :curr;  //if small < sign
});
console.log(output); //10
console.log(output1);

5.32



