import React from "react";
import Navbar from "./Components/landingpage/utils/nav";
import LandingPage from "./Components/landingpage/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./Components/auth/auth";
import MovieDetails from "./Components/bookseatsinterface/intermediate";
import { HashRouter, Routes, Route } from "react-router-dom";
import BookTickets from "./Components/bookseatsinterface/bookingcomponents/booktickets";
import FAQ from "./Components/others/faq";
import ProgressBarComponent from "./Components/bookseatsinterface/progressbar";
import UserProfilePage from "./Components/landingpage/utils/profile";
import AboutUs from "./Components/others/aboutus";
function App() {
  return (
    <HashRouter>
      <div
        style={{ fontFamily: "'Open Sans', sans-serif" }}
        className={`container-fluid p-0 min-vh-100 ${
          localStorage.getItem("darkmode") === "yes" ? "bg-dark" : "bg-light"
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/booktickets/:id" element={<ProgressBarComponent />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;