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
}*/   //we can write it this way
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


//8.56







