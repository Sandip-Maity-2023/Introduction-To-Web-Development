import { curry } from 'lodash';
import React,{useState} from 'react'

function Event() {
    const [name,setname]=useState("");
    const handleSubmit=(event)=>{
        event.preventDefault();
        alert(`Form submitted with name:${name}`);
    };

  return (
    <div style={styles.container}>
        <form action="submit" onSubmit={handleSubmit} style={styles.form}>
            <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='Enter your name' style={styles.input} required/>
            <button type='submit' style={styles.button}>Submit</button>
        </form>
    </div>
  )
}

const styles={
    container:{
display:'flex',
justifyContent:'center',
alignItems:'flex-start',
height:'50vh',
backgroundColor:'#f0f0f0',
paddingTop:'50px',
    },
    form:{
textAlign:'center',
padding:'20px',
backgroundColor:'green',
borderRadius:'15px',
boxShadow:'0 4x 8px rgba(255,0,255,0.5)'
    },
    input:{
padding:'10px',
fontSize:'18px',
marginButton:'14px',
borderRadius:'10px',
border:'1px solid #ccc',
width:'200px',
margin:'10px',

    },
    button:{
padding:'10px 20px',
fontSize:'16px',
borderRadius:'12px',
border:'1px solid #ddd',
backgroundColor:'yellow',
color:'red',
cursor:'pointer',
marginTop:'20px',
    },
};

export default Event