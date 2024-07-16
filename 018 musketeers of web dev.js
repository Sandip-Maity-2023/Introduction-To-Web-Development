console.log("hello");
//alert("apna college");
console.dir(document.body);
//document.body.childNodes[3].innerText="abcd";
/*
let button=document.getElementById("myId");  //h1
console.dir("button");


let headings=document.getElementsByClassName("myClass");
console.dir(headings);
console.log(headings);


let parahs=document.getElementsByTagName("p");
console.dir(parahs);

let firstEl=document.querySelector("p");  //1st element
console.dir(firstEl);

let allEl=document.querySelectorAll("p"); //all element
console.log(allEl);

let firstElement=document.querySelector(".myClass");  //1st class element
console.dir(firstElement);

let allElement=document.querySelectorAll(".myClass"); //all class element
console.log(allElement);

console.dir(document.body.firstChild);

*/

let div=document.querySelector("div");
console.log(div);
console.dir(div);


///Qs. Create a H2 heading element with text-"Hello JavaScript".Append "from Apna College students" to this text using JSON.
 
///Qs. create 3 divs with common class name-"box".Access them & add some unique of them
 
let h2=document.querySelector("h2");
console.dir(h2.innerText);

h2.innerText=h2.innerText+"from Apna College students";

let divs=document.querySelectorAll(".box");
console.log(divs);
console.log(divs[0]);

//amm zindaki
divs[0].innerText="new unique value 1";
divs[1].innerText="new unique value 2";
divs[2].innerText="new unique value 3";
//mentos bali zindaki
let idx=1;
for(div of divs){
    console.log(div);
    console.log(div.innertext);
    div.innerText=`new unique value ${idx}`;
    idx++;
}









