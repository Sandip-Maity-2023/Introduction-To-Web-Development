// import React from 'react'

// function Child(props) {
//     const childStyle={
//         marginTop:'20px',
//         fontSize:'18px',
//         color:'#333',
//     };
    
//   return (
//     <div style={childStyle}>
//         <h2>Hello,{props.name}!</h2>
//         <p>You are {props.age} years old</p>
//         <p>You live in {props.city}</p>
//         <button onClick={props.onClick}>Click Me!</button>
//         <h3>Hello,{props.nam}</h3>
        
//     </div>
//   );
// }
//  Child.defaultProps={
// nam:'Guest',
// onClick:()=>alert("Defult click"),
//     };
// export default Child;

import React from "react";

export const Header=()=>{
  return <h1>Welcome to My website</h1>
}

export const Footer=()=>{
  return <Footer>&copy 2025 My Website</Footer>
}

export default function MainContent(){
  return <div><h2>This is main content of the website</h2></div>
}