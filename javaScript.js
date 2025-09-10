/*
const day="Friday"
switch(day){
    case "Monday":
        console.log("Start of the week")
        break;
    case "Friday":
        console.log("End of the workWeek")
        break;
    default:
        console.log("It's a regural day")

}

const temp=25;
if(temp>43) console.log("It's hot")
else if(temp>=20) console.log("It's warm")
else console.log("it's cold")


//pure function
//find all primes between 1 and 100
function findPrimes(){
    let num=2;
    while(num<=100){
        let isprime=true;
        for(let i=2;i<=Math.sqrt(num);i++){
            if(num%i==0){
                isprime=false;
                break;
            }
        }
        if(isprime) console.log(num);
        num++;
    }
}

//the sum of natural numbers
let n=parseInt(prompt("Enter a number n to calculate the sum of first n natural number:"));
if(isNaN(n) || n<=0){
console.log("please enter a valid positive number.");
}else{
    let sum=0;
    for(let i=1;i<=n;i++) sum+=i;
    console.log("Sum of the first",n,"natural number is:",sum);
}

const sub=["Maths","science","Polity","History"];
let i=0;
let len=sub.length;
let gfg="";
for(;i<len;){
    gfg+=sub[i];
    i++;
}
console.log(gfg);


//nested function
function outerFun(a){
    function innerFun(b){
        return a+b;
    }
    return innerFun;
}

const addTen=outerFun(10);
console.log(addTen(5));   
//here how the run works instead of unexpectations
//10 as a then inner doesn't  not call yet as b value is unknown
//when addTen(5) is passed the inner function is executed and return a+b=10+5=15

//anonumous function
setTimeout(function(){
    console.log("Anonymmous function executed!");
},1000);

//callback function
function num(n,callback){
    return callback(n);
}
const double=(n)=>n*2;
console.log(num(5,double));

//immediately invoked function expression
(function(){
    console.log("This runs immediately");
})();

//arrow function
const a=["oxygen","Helium","Lithium"];
const b=a.map(function(s){
    return s.length;
})

 console.log("Normal way ",b);
 const c=a.map((s)=>s.length);
 console.log("Using arrow function",c)

 //higher order
 function fun(){
    console.log("hello world");
 }
 function fun2(action){
    action();
    action();
 }
 fun2(fun);

 //popular
 const n1=[1,2,4,5];
 const square=n.map((num)=>num*num);
 const k=n1.filter((num)=>num%2==0);
 const sum=n1.reduce((i,j)=>i+j,0);
 n1.forEach((num)=>console.log(num*2));
 const f=n1.find((num)=>num%2===0);
 const ng=n1.some((num)=>num<0);
 const all=n.every((num)=>num>0);
 console.log(square,k,sum,f,ng);

 //advanced
 function add(x,y){
    return x+y;
 }

 function sub(x,y){
    return x-y;
 }

 function mul(x,y){
    return x*y;
 }

 function compose(f,g,m){
    return function(x,y){
        return m(f(g(x,y)));
    };
 }

 //now fixed
  function compose(f,g,m){
    return function(x,y){
        const gx=g(x,y);
        const fx=f(x,y);
        return m(gx,fx);
    };
 }

 var res=compose(add,sub,mul)(3,5);
 console.log(res);


 function mul(x) {
    return function(y) {
        return x * y;
  };
}
var m = mul(2);
console.log(m(5));

//memoization
function memoize(func){
    var cache={};
    return function(arg){
        if(cache[arg]){
            return cache[arg];
        }else{
            var res=func(arg);
            cache[arg]=res;
            return res;
        }
    };
}
const fact=(function(){
const cache={};
return function fac(n){
    if(n<0) throw new Error("Factorial cannot defined for negative numbers");
    if(n===0 || n===1) return 1;
    if(cache[n]){
        console.log("value from cache");
        return cache[n];
    }
    cache[n]=n*fac(n-1);
    return cache[n];
};
})();
console.log(fact(6));

function slow(num){
    console.log("computing...");
    return num*2;
}

var fast=memoize(slow);
console.log(fast(5));
console.log(fast(5));




//callback
function greet(name,callback){
    console.log("hello,"+name);
    callback();
}
function sayGoodbye(){
    console.log("Goodbye");
}
greet("Ajay",sayGoodbye);


const fact1=(n)=>n===0 || n===1?1:Array({length:n},(_,i)=>i+1).reduce(i,j=>i*j,1);
console.log(fact(5))

const c1=[1,2,3,4,5];
for(let i=0;i<Math.floor(c1.length/2);i++){
let temp=c1[i];
c1[i]=c1[c1.length-1-i];
c1[c1.length-1-i]=temp;
}
console.log(c1);

*/
const m=[1,2,3,4,56,4];
const reversed=(function reverse(m){
if(m.length===0) return [];
return [m.pop()].concat(reverse(m));
})([...m]);
console.log(reversed);


let rev=m.reduce((i,j)=>[j,...i],[]);
console.log(rev);

let r =[...m].reverse();
console.log(r);

let w1=[];
while(m.length>0){
    w1.push(m.pop());
}
console.log(w1);
