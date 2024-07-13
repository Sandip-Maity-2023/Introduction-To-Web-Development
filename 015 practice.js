/* let fullName=prompt("Enter your full name without spaces: ");
let userName="@"+fullName+fullName.length;


console.log(userName);

 let marks ={
    stu1:97,
    stu2:82,
    stu3:34,
};
*/
let marks=[90,34,74,67,45,68,65];
console.log(marks);
console.log(marks.length); ///property

let heroes=['Ironman','Thor','hulk','shaktiman','spiderman'];
console.log(heroes);
//strings immutable
//array mutable

//for loop
for(let idx=0;idx<heroes.length;idx++){
    console.log(heroes[idx]);
}

//for of
for(let hero of heroes){
    console.log(hero);
}

let cities=["Delhi","Mumbai","Hyderabad","Gurgaon","Bangalor"];
 for(let city of cities){
    console.log(city);
 }
 for(let city of cities){
    console.log(city.toUpperCase());
 }

 /// Qs.For a given array with marks of students->[37,38,99,40,] Find the average marks of the entire class.
let marks1=[38,94,93,96,30];
let sum=0;
//sum=sum[0] +sum[1]+sum[2]+sum[3]+sum[4];
for(let i of marks1){
    sum+=i;
}
let avg=sum/marks1.length;
// console.log("avg marks of the class:",avg);
console.log(`avg marks of the class = ${avg}`);   //left upper side symbol

//Qs.For a given array with prices of 5 items->[250,645,300,900,50]
//All items have an offer of 10% OFF on them.Change the array to store final price after applying offer.

let items=[250,645,300,900,50];
let i=0;
for(let val of items){
   // console.log(`value at index ${i}=${val}`);
    let offer=val/10;
    items[i]=items[i]-offer;
    console.log(`value after offer=${items[i]}`);
    i++;
}
for(let i=0;i<items.length;i++){
    let offer=items[i]/10;
    items[i]-=offer;
}
console.log(items);

let fooditems=['potato','tomato','onion','lichi']
console.log(fooditems);
let deleteditem=fooditems.pop();
console.log(fooditems);
console.log("deleted items:",deleteditem);

let marks2=[35,45,32,18,96];
console.log(fooditems.toString());
console.log(fooditems);
console.log(marks2.toString());
console.log(marks2);

let marvelHeroes=["thor","spiderman","ironman","Dr. Strange","hulk"];
let dcHeroes=["superman","batman"];
let indianHeroes=["shaktiman","krrish"];
let Heroes=marvelHeroes.concat(dcHeroes,indianHeroes);
console.log(Heroes);

marvelHeroes.unshift("antman");
let val=marvelHeroes.shift("thor");
console.log("deleted items:",val);

console.log(marvelHeroes);
console.log(marvelHeroes.slice(1,3));

let arr=[1,2,3,4,5,6,7];

//arr.splice(2,2,101,102);
//Add Element
arr.splice(2,0,101);  //index ,no. of deleted items, value

//Delete Element
arr.splice(3,1);

//ReplaceElement
arr.splice(3,1,102);  //arr.splice(4) after index 4, items will be deleted

/*   Qs. Create an array to store companies-> "Bloomberg","Microsoft","Uber","Google","IBM","Netflix"
a. Remove the first company from the array   pop-end delete,shift-start delete
b. Remove Uber & Add Ola in its Place        push -end,unshift-start
c. Add Amazon at the end */

let companies=["Bloomberg","Microsoft","Uber","Google","IBM","Netflix"]
//companies.shift();

console.log(companies.splice(2,1,"Ola"));

companies.push("Amazon");
console.log(companies);

