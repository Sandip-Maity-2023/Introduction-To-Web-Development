console.log("Hello World!");
const accountId=14563 // const is used for constants, which cannot be reassigned can't be changed later
let email="hitest@gmail.com"
var password="hitest123"
city="New Delhi"
console.log(accountId);
//accountId=14564 // this will throw an error because accountId is a constant
email="12sandip125@gmail.com"
pass="sandip@2004"
city="New Delhi"
console.table([email,pass,city])

/*
prefer not to use var,
because of issue in block scope and functional scope
*/
alert("hello world");
console.log("Hello World!")  //; console.log("HelloWorld!")  //js details ecma OR MDN

console.log("HelloWorld!")

let age=10;
let isLoggedIn=true;
console.log(typeof age); // number
console.log(typeof isLoggedIn); // boolean
console.log(typeof email); // string
console.log(typeof null); // object (this is a known bug in JavaScript)
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number (NaN is a special value in JavaScript)
console.log(typeof Symbol("foo")); // symbol (ES6 feature)
console.log(typeof BigInt(1234567890123456789012345678901234567890)); // bigint (ES11 feature)
console.log(typeof {name: "John", age: 30}); // object (this is an object literal)
console.log(typeof [1, 2, 3]); // object (arrays are also objects in JavaScript)
console.log(typeof function() {}); // function (functions are also objects in JavaScript)
console.log(typeof new Date()); // object (Date is a built-in object in JavaScript)
console.log(typeof /abc/); // object (regular expressions are also objects in JavaScript)
console.log(typeof new Map()); // object (Map is a built-in object in JavaScript)
console.log(typeof new Set()); // object (Set is a built-in object in JavaScript)
console.log(typeof new WeakMap()); // object (WeakMap is a built-in object in JavaScript)
console.log(typeof new WeakSet()); // object (WeakSet is a built-in object in JavaScript)
console.log(typeof new ArrayBuffer(8)); // object (ArrayBuffer is a built-in object in JavaScript)
console.log(typeof new DataView(new ArrayBuffer(8))); // object (DataView is a built-in object in JavaScript)
console.log(typeof new Int8Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Uint8Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Float32Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Float64Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Int16Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Uint16Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Int32Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Uint32Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new BigInt64Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new BigUint64Array(8)); // object (Typed Arrays are also objects in JavaScript)
console.log(typeof new Error("Error message")); // object (Error is a built-in object in JavaScript)
console.log(typeof new RegExp("abc")); // object (RegExp is a built-in object in JavaScript)
console.log(typeof new Promise((resolve, reject) => {})); // object (Promise is a built-in object in JavaScript)
console.log(typeof new Proxy({}, {})); // object (Proxy is a built-in object in JavaScript)
console.log(typeof new Intl.DateTimeFormat()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.NumberFormat()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Collator()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.ListFormat()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.RelativeTimeFormat()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.PluralRules()); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Locale("en-US")); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.DisplayNames("en-US")); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Segmenter("en-US")); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.DateTimeFormat("en-US", {timeZone: "America/New_York"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Collator("en-US", {sensitivity: "base"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.ListFormat("en-US", {type: "conjunction"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.RelativeTimeFormat("en-US", {numeric: "auto"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.PluralRules("en-US", {type: "cardinal"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Locale("en-US", {calendar: "gregory"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.DisplayNames("en-US", {type: "language"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new Intl.Segmenter("en-US", {granularity: "word"})); // object (Intl is a built-in object in JavaScript)
console.log(typeof new WeakRef({})); // object (WeakRef is a built-in object in JavaScript)
console.log(typeof new FinalizationRegistry(() => {})); // object (FinalizationRegistry is a built-in object in JavaScript)
console.log(typeof new SharedArrayBuffer(8)); // object (SharedArrayBuffer is a built-in object in JavaScript)
console.log(typeof new Atomics()); // object (Atomics is a built-in object in JavaScript)
console.log(typeof new TextDecoder("utf-8")); // object (TextDecoder is a built-in object in JavaScript)
console.log(typeof new TextEncoder()); // object (TextEncoder is a built-in object in JavaScript)
console.log(typeof new URL("https://example.com")); // object (URL is a built-in object in JavaScript)

















