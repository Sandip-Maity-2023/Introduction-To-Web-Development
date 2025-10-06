import React,{useState} from 'react'
import "../App.css"
 //import "https://cdn.tailwindcss.com"

export default function Navbar({selectedTab,setselectedTab}) {

  const [Dropdown,setDropdown]=useState("");

  const toggle=(menu)=>{
    setDropdown(Dropdown===menu ? "":menu);
  }
  return (
    <nav className='navbar'>
       <h2 className='logo' style={{color:'yellow',fontFamily:'serif'}}>ALGORITHM  VISUALIZER </h2>
        <ul className="nav-links">
            <li className={selectedTab==='sorting' ? 'active':" "} onClick={()=>setselectedTab('sorting')}>Sorting</li>
            <li className={selectedTab==='searching' ? 'active':" "} onClick={()=>setselectedTab('searching')}>Searching</li>
            <li className={selectedTab==='tree' ? 'active':" "} onClick={()=>setselectedTab('tree')}>Tree</li>
            <li className={selectedTab==='graph' ? 'active':" "} onClick={()=>setselectedTab('graph')}>Graph</li>
        </ul>
        
    </nav>
  )
}