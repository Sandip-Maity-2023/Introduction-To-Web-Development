import React from 'react'
import {Routes,Route} from 'react-router-dom'
import SignUp from "./pages/SignUp"
import SignIn from './pages/SignIn'
export const serverUrl="http://localhost:8000"
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App;