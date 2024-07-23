/*
let DATA="secret information";
class User{
    constructor(name,email){
        this.name=name;
        this.email=email;

    }
viewData(){
    console.log("data=",DATA);
}
}

class Admin extends User{
    constructor(name,email){
        super(name,email);

    }
editData(){
    DATA="some new value";
}
}

let student1=new User("sandip","sandip123@gmail.com");
let student2=new User("rahul","rahul123@gmail.com");

let teacher1=new User("dean","dean123@gmail.com");
//console.log->student1.viewData()
let admin1=new Admin("admin","admin@college.com");



//Error Handling

let a=5;
let b=7;
console.log("a=",a);
console.log("b=",b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);
try{

console.log("a+b=",a+c);//error
} catch(err){
    console.log(err);

}
console.log("a+b=",a+b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);
console.log("a+b=",a+b);





//async await>>promise chains>>callback hell
//Synchronous

console.log("one");
console.log("two");
console.log("three");  //print oderly

//Asynchronous

//Method 1
function hello(){
    console.log("hello");
}

setTimeout(hello,4000);  //1s=2000ms


console.log("one");
console.log("two");
//Method 2
setTimeout(()=>{
    console.log("hello");
},5000);   //timeout
 console.log("three");
 console.log("four");



 //callbacks
 function calculator(a,b){
    console.log(a+b);

 }
 function calculator(a,b,sumCallback){
    sumCallback(a,b);
 }

 calculator(1,2,(a,b)=>{
    console.log(a+b);
 });



const hello1=()=>{
    console.log("hello1");
}
setTimeout(hello1,3000);



//Callback Hell
let age=19;
if(age>=18){
    if(age>=60){
    console.log("senior");
}else{
    console.log("middle");
}
}else{
    console.log("child");
}


for(let i=0;i<5;i++){
    let str="";
    for(let j=0;j<5;j++){
        str=str+j;
    }
    console.log(str);
}

*/



/*
//callbackhell or pyramid of doom

function getData(dataId,getNextData){
//console.log("data",dataId);
setTimeout(()=>{
    console.log("data",dataId);
    if(getNextData){
getNextData();
    }
},5000);
}

*/







function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
console.log("data",dataId);
resolve("success");
        },3000);
    });
}

///we can do this below code by ///promise chain/// and comment out ///1.
//method 1


getData(1)
    .then((res)=>{
        return getData(2);
    })
    .then((res)=>{
        return getData(3);
    })
    .then((res)=>{
        console.log(res);
    });






//method 2

/*
getData(1,()=>{
    console.log("getting data2.....");
    getData(2, ()=>{
        console.log("getting data3.....");
        getData(3,()=>{
            console.log("getting data4....");
            getData(4);
        });
    });
});  //2s

*/



/*
//promises
let promise=new Promise((resolve,reject)=>{
    console.log("I am a promise");
    //resolve("success");
    reject("some error occurred");
});
*/




///1.
function getData1(dataId1,getNextData1){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("data1",dataId1);
            resolve("success");
           // reject("error");
            if(getNextData1){
                getNextData1();
            }
        },5000);
    });
}





const getPromise=()=>{
    return new Promise((resolve,reject)=>{
        console.log("I am Promise");
        resolve("success");
        //reject("error");
    });
};




let promise=getPromise();
promise.then((res)=>{
    console.log("promise fulfilled",res);
});

promise.catch((err)=>{
    console.log("rejected",err);
});






function asyncFunc1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("some data1");
            resolve("success");
        },4000);
    });
}



function asyncFunc2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("some data2");
            resolve("success");
        },4000);
    });
}



/*
console.log("fetching data1............");
let p1=asyncFunc1();
p1.then((res)=>{
    console.log(res);
    console.log("fetching data2........");
let p2=asyncFunc2();
 p2.then((res)=>{
    console.log(res);
});
});
*/



///it can be written like below code

console.log("fetching data1........");
asyncFunc1().then((res)=>{
    console.log("fetching data2........");
asyncFunc2().then((res)=>{
});
});



/*
console.log("fetching data2");
let p2=asyncFunc2();
p2.then((res)=>{
    console.log(res);
})
*/





