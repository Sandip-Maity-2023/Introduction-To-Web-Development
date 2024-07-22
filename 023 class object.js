/*
const student={
    fullName:"sandip maity",
    marks:7.95,
    printMarks:function(){
        console.log("marks=",this.marks);
    },
};

const employee={
calcTax(){
    console.log("tax rate is 10%");
},

/*
calctax2:function(){
    console.log("tax rate is 10%");
}   //we can write it this way
};

const karanArjun={
    salary:50000,
    calcTax(){
        console.log("tax rate is 20%");
    },
};

const karanArjun2={
    salary:50000,
};

const karanArjun3={
    salary:50000,
};

const karanArjun4={
    salary:50000,
};

const karanArjun5={
    salary:50000,
};

karanArjun.__proto__=employee;
karanArjun2.__proto__=employee;
karanArjun3.__proto__=employee;
karanArjun4.__proto__=employee;
karanArjun5.__proto__=employee;




class ToyataCar{
    constructor(brand,mileage){
        console.log("creating new object");
        this.brand=brand;
        this.mileage=mileage;
    }
    start(){
        console.log("start");
    }
    stop(){
        console.log("stop");
    }


//setBrand(brand){
 //   this.brandName=brand;
//}
}

let fortuner= new ToyataCar("fortuner",10); //constructor
//fortuner.setBrand("fortuner");
console.log(fortuner);
let lexus=new ToyataCar("lexus",12);  //constructor
//lexus.setBrand("lexus");
console.log(lexus);

*/

//inheritance


class Parent{
    hello(){
        console.log("hello");
    }
}
class Child extends Parent{}
    let obj = new Child();


class Person{
    constructor(){
        console.log("Enter parent constructor:");
        this.species="homo sapiens";
    }
    eat(){
        console.log("eat");
    }
    sleep(){
        console.log("sleep");
    }
    work(){
        console.log("eat five star,do nothing")
    }
}

class Engineer extends Person{
    constructor(branch){
        console.log("Enter the child constructor:");
        super(); //to invoke parent class constructor
        this.branch=branch;
        console.log("exit child constructor");
    }
    work(){
        console.log("solve problem,build something");  
    }
}
class Doctor extends Person{
    work(){
        console.log("treat patients");
    }
}
let engObj=new Engineer("chemical enggineer");
let eng=new Doctor();



//super Keyword
class Parent1{
    hello(){
        console.log("hello");
    }
}
class Child1 extends Parent1{}
    let obj1 = new Child1();





class Person1{
    constructor(name1){
        //console.log("Enter parent constructor:");
        this.species="homo sapiens";
        this.name1=name1;
    }
    eat(){
        console.log("eat");
    }
    sleep(){
        console.log("sleep");
    }
    work(){
        console.log("eat five star,do nothing")
    }
}

class Engineer1 extends Person1{
    constructor(name1){
        //console.log("Enter the child constructor:");
        super(name1); //to invoke parent class constructor
        this.branch1=this.branch1;
        //console.log("exit child constructor");
    }
    work(){
        super.eat();
        console.log("solve problem,build something");  
    }
}
let engObj1=new Engineer1("sandip");

