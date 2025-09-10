let ob={
    fname:'sourav',
    lname:'maity',
    age:23,
    get fullname(){
        return `${this.fname} ${this.lname} ${this.age}`;
    },
    set fullname(name){
        [this.fname,this.lname]=name.split(' ');
    }
};

console.log(ob.fullname);
ob.fullname='Ravi Kumar';
console.log(ob.fname);
console.log(ob.lname);

Object.defineProperty(ob,'status',{
    value:'active',
    writable:false,
    configurable:false,
    enumerable:true
});

Object.defineProperty(ob,'country',{
    value:'India',
    enumerable:false
});
console.log(ob.country);
console.log(Object.keys(ob));
console.log(ob.hasOwnProperty('age'));
ob.fname='Sandip';
console.log(ob.fullname,ob['age']);

ob.status='inactive';
console.log(ob.status);


function iterate(){
    let ex={
        book:"Sherlook Holmes",
        author:"Athur Conan Doyle",
        genre:"Mystry"
    };
    Object.keys(ex).forEach(key=>{
        const value=ex[key];
        console.log(`${key}:${value}`);
    });

    Object.entries(ex).map(entry=>{
        let key=entry[0];
        let value=entry[1];
        console.log(key,value);
    });

    for(let key in ex){
        if(ex.hasOwnProperty(key)){
            value=ex[key];
            console.log(key,value);
        }
    }
}
iterate();

let emp={
    id:"9995",
    name:"sandip",
    address:"kolkata"
}

console.log(emp);
let ep=emp;

console.log(ep);
ep.name="manash";

console.log(ep);
console.log(emp);

let am={
    id:101,
    name:"suman",
    address:"New Delhi",
    details: function(){
        return "student name:"+this.id+this.name+this.address;
    }
}

let ma=JSON.parse(JSON.stringify(am));
ma.id=202;
console.log(ma);

console.log(am);

const lodash=require('lodash');
console.log("\n");
let deep=lodash.cloneDeep(am);
console.log(am)
console.log(deep);
deep.address="Mumbai";
console.log(deep);


