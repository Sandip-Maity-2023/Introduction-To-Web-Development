/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/


// import React from "react";
// import Home from "./home/Home";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Courses from "./courses/Courses";
// import Signup from "./components/Signup";
// import { Toaster } from "react-hot-toast";
// import { useAuth } from "./context/AuthProvider";

// function App() {
//   const [authUser, setAuthUser] = useAuth();
//   console.log(authUser);
//   return (
//     <>
//       <div className="dark:bg-slate-900 dark:text-white">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/course"
//             element={authUser ? <Courses /> : <Navigate to="/signup" />}
//           />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//         <Toaster />
//       </div>
//     </>
//   );
// }

// export default App;


import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className= "container">
          <Switch>
              <Route exact path = "/" component = {ListEmployeeComponent}></Route>
              <Route path = "/employees" component = {ListEmployeeComponent}></Route>
              <Route path = "/add-employee" component = {AddEmployeeComponent} ></Route>
              <Route path = "/edit-employee/:id" component = {AddEmployeeComponent}></Route>
            </Switch>
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
