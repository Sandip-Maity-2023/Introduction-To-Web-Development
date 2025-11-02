import React,{useState} from "react";
import Home from "../../pages/Home/Home";
import { AiOutlineDoubleLeft,AiOutlineDoubleRight } from "react-icons/ai";
import "./Layout.css";
import Menus from "../Menus/Menus";
import ErrorBoundary from "../../pages/Home/ErrorBoundary";

const Layout = () => {
const [toggle,settoggle]=useState(true); //toggle will open at first

//change toggle
const handleToggle=()=>{
  settoggle(!toggle);
}


  return (
    <>
      <div className="sidebar-section">
        <div className={toggle ? "sidebar-toggle":"sidebar"}>
          <div className="sidebar-toggle-icons">               {/* it will be icon << >> */}
          
            <p onClick={handleToggle}>
              {toggle ? 
              <AiOutlineDoubleLeft size={30} color="Green"/> :
              <AiOutlineDoubleRight size={30} color="red"/>}
            </p>
          </div>
           <Menus toggle={toggle}/>
        </div>

        {/* main content */}
        <div className={`container ${toggle ? "shifted" : ""}`}>

          <ErrorBoundary><Home/></ErrorBoundary>
          
        </div>
      </div>
    </>
  );
};

export default Layout;
