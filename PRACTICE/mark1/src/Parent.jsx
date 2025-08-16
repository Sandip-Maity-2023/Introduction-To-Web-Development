import React from 'react'
import Child from './Child';

function Parent() {
    const parentStyle={
        textAlign:'center',
    };
    const handleClick=()=>{
      alert('Button clicked in Child!');
    };
   
  return (
    <div style={parentStyle}>
     <h1>
        Welcome to the parent component!</h1>
       <Child name='Jiya' age={25} city="New York"/> 
       <Child onClick={handleClick}/>        
    </div>
  );
}

export default Parent;