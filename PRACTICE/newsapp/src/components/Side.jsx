import {useState} from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars,faHome,faClock,faDownload,faThumbsUp,faVideo,faList } from "@fortawesome/free-solid-svg-icons";

const Sidebar=()=>{
    const [open,setOpen]=useState(false);
const handleToggle=()=>{
    setOpen(!open);
    if(onToggle) onToggle(!open);
};

  return (
    <div style={{display:"flex"}}>
        <nav style={
            {
                height:"60px",
                display:"flex",
                alignItems:"center",
                padding:"0 20px",
                background:"#fff",
                borderBottom:"1px solid #ddd",
                width:"100%",
                borderRadius:"15px"
            }
        }>  
            <FontAwesomeIcon icon={faBars} size="lg" style={{cursor:"pointer",margin:"15px"}} onClick={handleToggle}/>
                <h2><span style={{color:"blue"}}>N</span>ews<span style={{color:"blue"}}>S</span>phere</h2>
        </nav>
        <div style={{
            position:"fixed",
            top:0,
            left:open?0:"-250px",
            width:"250px",
            height:"100vh",
            backgroundColor:"#fff",
            boxShadow:"2px 0px 5px rgba(0,0,0,0.5)",
            transition:"left 0.3s ease-in-out",
            zIndex:1000,
            padding:"20px",
            borderRight:"1px solid #ddd"
        }}>
            <h3 style={{marginBottom:"15px"}}>Menu</h3>
            <ul style={{listStyle:"none",padding:0,lineHeight:"2rem"}}>
                <li><FontAwesomeIcon icon={faHome}/>Home</li>
                <li><FontAwesomeIcon icon={faVideo}/>Shorts</li>
                <li><FontAwesomeIcon icon={faList}/>History</li>
                <li><FontAwesomeIcon icon={faClock}/>Downloads</li>
                <li><FontAwesomeIcon icon={faDownload}/>Saved</li>
            </ul>
        </div>
        {open && (<div onClick={()=>setOpen(false)} style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.3)",
            zIndex:500
        }}></div>
    )}
    </div>
  )
}

export default Sidebar;