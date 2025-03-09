
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import ChatModal from "./components/ChatModal";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      {/* {loading && <Loader />} Show loading overlay------------ */}
      <Routes>
        {/* Home Page without Navbar 
      Add things which without NavBar*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* All Other Pages with Navbar */}
        <Route
          path="/*"
          element={
            <div className="App bg-white">
              {/* {!loading && <Navbar />} Hide Navbar while loading------------ */}
              <Navbar />
              <Routes>
                <Route path="/home/:teamId" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/chat" element={<ChatModal/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route element = {<ProtectedRoute />} >
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
