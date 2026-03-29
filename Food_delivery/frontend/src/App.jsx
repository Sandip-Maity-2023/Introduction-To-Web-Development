import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser";
import UseGetCity from "./hooks/UseGetCity";
import UseGetMyShop from "./hooks/UseGetMyShop";

export const serverUrl = "http://localhost:8000";

function App() {
  UseGetCurrentUser();
  UseGetCity();
  UseGetMyShop();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
