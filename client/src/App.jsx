import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* {loading && <Loader />} Show loading overlay------------ */}
      <Routes>
        {/* Home Page without Navbar 
      Add things which without NavBar*/}
        <Route path="/" element={<LandingPage />} />

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
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
