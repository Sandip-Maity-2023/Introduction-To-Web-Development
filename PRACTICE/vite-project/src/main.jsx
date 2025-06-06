import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  // <h1>Hello, Vite + React! hello i am learning React Js</h1> // Temporary content for testing purposes
)
