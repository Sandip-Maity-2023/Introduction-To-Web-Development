import './App.css';
import Newsapp from './components/Newsapp';
import Sidebar from './components/Side';
import Footer from './components/Footer';
import Email from './components/Email'; 
import WeatherWidget from './components/Weather';
// import Camera from './components/Camera';
import { signOut } from 'firebase/auth';
import "bootstrap/dist/css/bootstrap.min.css";

//import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

import Login from "./components/Login";
//import SignUp from "./components/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Profile from "./components/profile";
import { useState,useEffect } from "react";
import { auth } from "./components/Firebase";

import Logout from './components/Logout';
function App(){


  
const [user, setUser] = useState();
 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  //if(!user) return <Login onLogin={setUser}/>
 const onLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  const onLogout = () => {
    setUser(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

 // If NOT logged in → show login page
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
{/* LOGOUT BUTTON */}
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button
          onClick={handleLogout}
          style={{
            position: "fixed",
            left: "91%",
            marginTop: "60px",
            background: "#ff4d4d",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>


      <Newsapp user={user}/>
      <WeatherWidget city="Kolkata" />
      {/* <Route path="/camera" element={<Camera />} /> */}
      <Sidebar/>
      <Email/>
      <Footer/>
      <ToastContainer/>
    </>
  );
}
export default App;



// import React, { useEffect } from "react";
// //import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./components/Login";
// import SignUp from "./components/Register";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Profile from "./components/profile";
// import { useState } from "react";
// import { auth } from "./components/Firebase";

// function App() {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   });
//   return (
//     <Router>
//       <div className="App">
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             <Routes>
//               <Route
//                 path="/"
//                 element={user ? <Navigate to="/profile" /> : <Login />}
//               />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<SignUp />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;