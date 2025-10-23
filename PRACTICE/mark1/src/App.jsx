/*
import kgButton from "./kgbutton";

function App(){  //1st letter block


return <div><h1>hello world</h1>

<kgButton></kgButton>

</div>
}
export default App;
*/


/*
https://gemini.google.com/app/b9ebe16078d4fd9c?utm_source=sem&utm_medium=paid-media&utm_campaign=q4enIN_sem7&gclid=CjwKCAiAgeeqBhBAEiwAoDDhny6plvJCSiefJQUEKdJA5-2hH_bF1x3biNPjDptemijd9uCE53UkIxoCTeAQAvD_BwE
https://chatgpt.com/c/6881b116-47e0-8013-a28a-cac776bc02d8

*/
/*
import "./App.css";
import {React,useState} from "react";

function App(){

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [contact,setContact]=useState("");
  const [gender,setGender]=useState("male");
  const [country,setCountry]=useState("");
  const [subjects,setsubjects]=useState({

  english: true,
  maths: false,
  physics:false,
  });
const [resume,setResume]=useState("");
const [url,setUrl]=useState("");
const [selectedOption,setSelectedOption]=useState("");
const [about,setAbout]=useState("");

const handleSumbit=(e)=>{
  e.preventDefault();
  console.log(firstName,lastName,email,contact,gender,country,selectedOption,subjects,resume,url,about);
};

const handleSubjectChange=(sub)=>{
  setsubjects((prev)=>({...prev,
    [sub]: !prev[sub],
  }));
}

const handleReset=()=>{
  setFirstName("");
  setLastName("")
  setEmail("")
  setContact("")
  setGender("male")
  setsubjects({
    english:true,
    maths:false,
    physics:false,
  });
  setResume("")
  setUrl("")
  setSelectedOption("")
  setAbout("");
};

  return (
    <div className="App">
      <h1>Form in React</h1>
      <fieldset>
        <form action="#" method="get">
          <label for="firstname">First Name: </label>
<input type="text"
       name="firstname"
       id="firstname"
       value={firstName}
       onChange={(e)=>setFirstName(e.target.value)}
       placeholder="Enter First Name"/>

<label for="lastname">Last Name</label>
<input type="text"
name="lastname"
id="lastname"
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
placeholder="Enter Last Name"/>

<label for="email">Email</label>
<input type="email"
name="email"
id="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Enter Email" required/>

<label for="tel">Contact</label>
<input type="tel"
name="contact"
id="contact"
value={contact}
onChange={(e)=>setContact(e.target.value)}
placeholder="Enter Contact Number" required
/>

<label for="gender">Gender*</label>
<input type="radio"
name="gender"
id="male"
value="male"
checked={gender==="male"}
onChange={(e)=>setGender(e.target.value)}
/>
Male

<input type="radio"
name="gender"
value="female"
id="female"
checked={gender==="female"}
onChange={(e)=>setGender(e.target.value)}
/>
Female

<input type="radio"
name="gender"
value="other"
id="other"
checked={
  gender==="other"}
  onChange={(e)=>setGender(e.target.value)}
/>
Other


<label for="lang">Your best Subject</label>
<input type="checkbox"
name="lang"
id="english"
checked={subjects.english===true}
onChange={(e)=>handleSubjectChange("english")}
/>
English

<input type="Checkbox"
name="lang"
id="maths"
checked={subjects.maths===true}
onChange={(e)=>handleSubjectChange("maths")}
/>
Maths

<input type="checkbox"
name="lang"
id="physics"
checked={subjects.physics===true}
onChange={(e)=>handleSubjectChange("physics")}
/>
Physics

<br></br>
<label for="file">Upload Resume</label>
<input type="file"
name="file"
id="file"
onChange={(e)=>setResume(e.target.files[0])}
placeholder="Enter Upload File" required
/>

<label for="url">Enter URL*</label>
<input type="url"
name="url"
id="url"
onChange={(e)=>setUrl(e.target.value)}
placeholder="Enter Url" required
/>

<label>Select your choice</label>
<select name="select"
id="select"
value={selectedOption}
onChange={(e)=>setSelectedOption(e.target.value)}>

<option value="" disabled selected={selectedOption===""}>Select Your Ans</option>

<optgroup label="Beginners">
<option value="1">HTML</option>
<option value="2">CSS</option>
<option value="3">JavaScript</option>
</optgroup>

<optgroup label="Advance">
  <option value="4">React Js</option>
  <option value="5">Node Js</option>
  <option value="6">Express Js</option>
  <option value="7">MongoDB</option>
</optgroup>
</select>

<label for="about">About</label>
<textarea name="about"
id="about"
cols="30"
rows="10"
onChange={(e)=>setAbout(e.target.value)}
placeholder="About your self" required
></textarea>

<button type="reset"
value="reset"
onClick={()=>handleReset()}>Reset</button>

<button type="submit">Submit</button>
</form>
      </fieldset>
    </div>
  );
}
export default App;
*/

/*
import Joke from "./Joke.jsx";
function App(){
    return (
        <div className="App">
            <h1>Joke Generator Using React and Joke API</h1>
            <Joke/>
        </div>
    );
}
export default App;
*/

// import React from 'react';
// import Parent from './Parent';
// import Child from './Child';

// function App(){
//   const appStyle={
//     display:'flex',
//     justifyContent:'center',
//     alignItems:'center',
//     height:'100vh',
//     margin:0,
//     fontFamily:'Arial,sans-serif',
//   };
//   return (
//     <div style={appStyle}>
//       <Parent/>
//       <Child nam="Alia"/>
//     </div>
    
//   );
// }
// export default App;

/*
import React from 'react'
import Geeks from './Geek';

import MainContent from './Child';
import {
  Header,Footer
} from "./Child";
/*
function App() {
  return (
    <div>
      <Header/>
      <MainContent/>
      <Footer/>
    </div>
  );
};
*/


/*
import Geeks from './Geek';
import ProductList from './ProductList';
import Event from './Event';

const App=()=>{
const p=[
  {id:1,name:'product 1',price:10},
  {id:2,name:'product 2',price:20},
  {id:3,name:'product 3',price:30}
];


  return(
    <div>
      {/* <Header/>
      <MainContent/>
      <Footer/> 
      <Geeks/>
      <div style={{margin:'5px'}}>

        <h2 style={{color:'green'}}>
          Geeks For Geeks |Reusable components Example
        </h2>
        <ProductList p={p}/>
        <Event/>
      </div>

    </div>
  );
};
export default App;

*/












import React from 'react'
//import Event from './Eventhandle'
import Eventdefault from './Eventhandle'

function App() {
  return (
    <div>
{/* <Event/> */}
<Eventdefault/>
    </div>
  )
}

export default App







