 /*
 let div=document.querySelector("div");
 console.log(div);

 let id =div.getAttribute("id");
 console.log(id);

 let name=div.getAttribute("name");
 console.log(name);
 
let para=document.querySelector("p");
console.log(para.getAttribute("class"));
console.log(para.setAttribute("class","newClass"));
*/

/*
let div=document.querySelector("div");
div.style.backgroundColor="green";
div.style.backgroundColor="purple";

div.style.fontSize="26px";
div.innerText="Hello!";
 */

let newBtn=document.createElement("button");
newBtn.innerText="click me!";
console.log(newBtn);

//let div=document.querySelector("div");
//div.append(newBtn);
//div.prepend(newBtn);
//div.after(newBtn);
//div.before(newBtn);

let p=document.querySelector("p");
p.after(newBtn);
//p.before(newBtn);

let newHeading=document.createElement("h1");
newHeading.innerHTML="<i>Hi, I am new!</i>";

document.querySelector("body").prepend(newHeading);

/*
let para=document.querySelector("p");
para.remove();

newHeading.remove();
*/

//read it appendChild()
//        removeChild()

/*
Qs. Create a new button Element. Give it a text "click me",background color of red & text color of white.
 insert the button as the first element inside the body tag.


 Qs. Create a <p> tag in html,give it a class & some styling.
Now create a new class in CSS and try to append this class to the <p> element

Did you notice ,how you overwrite the class name when you add a new element 
solve this problem using classList.
*/




