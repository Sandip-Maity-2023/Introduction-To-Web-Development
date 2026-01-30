import React from 'react'
import {Routes,Route} from 'react-router-dom'
import SignUp from "./pages/SignUp"
import SignIn from './pages/SignIn'
export const serverUrl="http://localhost:8000"
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import { Navigate } from 'react-router-dom'
import UseGetCurrentUser from './hooks/useGetCurrentUser'
import UseGetCity from './hooks/useGetCity'

function App() {
  UseGetCurrentUser();
  UseGetCity()
  const {userData} =useSelector(state=>state.user)

  return (
    <Routes>
      <Route path="/signup" element={!userData?<SignUp />:<Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"}/>} />
      <Route path="/forgot-password" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>} />
     <Route path="/" element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App;