import React from 'react'

export default function Navbar({selectedTab,setselectedTab}) {

  return (
    <nav className='navbar'>
       <h2 className='logo' style={{color:'yellow',fontFamily:'serif'}}>ALGORITHM  VISUALIZER</h2>
        <ul className="nav-links">
            <li className={selectedTab==='sorting' ? 'active':" "} onClick={()=>setselectedTab('sorting')}>Sorting</li>
            <li className={selectedTab==='searching' ? 'active':" "} onClick={()=>setselectedTab('searching')}>Searching</li>
            <li className={selectedTab==='tree' ? 'active': " "} onClick={()=>setselectedTab('treeTraversal')}>Tree</li>
            <li className={selectedTab==='graph' ? 'active':" "} onClick={()=>setselectedTab('graphTraversal')}>Graph</li>
        </ul>
        
    </nav>
  )
}