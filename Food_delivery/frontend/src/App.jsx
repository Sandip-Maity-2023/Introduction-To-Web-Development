import React from 'react'
import {Routes,Route} from 'react-router-dom'
import SignUp from "./pages/SignUp"
import SignIn from './pages/SignIn'
export const serverUrl="http://localhost:8000"
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import { Navigate } from 'react-router-dom'

function App() {
  useGetCurrentUser();
  const {userData} =useSelector(state=>state.user)

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>} />
     <Route path="/" element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App;