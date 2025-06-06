// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


/*
import './App.css'
import Navbar from './components/Navbar';
function App(){
  const name='learn coding';
  return (
    <div>
      <Navbar/>
      <img src="harry.jpg" alt=""/>
      <h1>Hello, Everyone Vite + React!</h1>
      <p>Welcome to your heartest cool application.</p>
      <ul>
        <li>components</li>
        <li>CSS and Tailwind</li>
      </ul>
      <><nav/></> 
    </div>
  );
}
export default App;
//40
*/

import './App.css';
import HeroSection from "./components/Hero";
import Navigation from "./components/Navigation";

const App=()=>{
  return(
  <div>
    <Navigation />
    <HeroSection />
    <h1>Welcome to the Vite + React App!</h1>
    <p>This is a simple application to demonstrate the use of components.</p>
</div>
);
};

export default App;

