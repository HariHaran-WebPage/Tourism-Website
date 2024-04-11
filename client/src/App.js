import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menubar from "./MenuBar";
import Home from "./Home";
import AboutUs from "./About";
import TourismPackagesPage from "./Tourism";
import LoginPage from "./Login";
import ContactPage from "./Contact";
import Footer from "./Footer";
import SignupPage from "./Signup";
import AdminDashboard from "./Admindashbord";
import StaffForm from "./Staff";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainContent>
              <Home />
            </MainContent>
          }
        />
        <Route
          path="/about"
          element={
            <MainContent>
              <AboutUs />
            </MainContent>
          }
        />
        <Route
          path="/tourism"
          element={
            <MainContent>
              <TourismPackagesPage />
            </MainContent>
          }
        />
        <Route
          path="/contact"
          element={
            <MainContent>
              <ContactPage />
            </MainContent>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/Admin"
          element={
            <MainContent>
              <AdminDashboard />
            </MainContent>
          }
        />
        <Route
          path="/Staff"
          element={
            <MainContent>
              <StaffForm />
            </MainContent>
          }
        />
      </Routes>
    </Router>
  );
}

function MainContent({ children }) {
  return (
    <>
      <Menubar />
      {children}
      <Footer />
    </>
  );
}

export default App;
