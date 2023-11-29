import logo from "./logo.svg";
import "./App.css";
import QuestionCard from "./Components/QuestionCard";
import NavbarComp from "./Components/NavbarComp";
import Hero from "./Components/Hero";

import RegisterPage from "./Pages/RegisterPage";

import AuthContext, { AuthProvider } from "./Context/AuthContext";

import PrivateRoutes from "./Utils/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
       <Router>
       <AuthProvider>
          <NavbarComp />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/test" element={<QuestionCard />} />
            </Route>
          </Routes>
          
          <Routes>
          <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Hero />} />
          </Routes>
        </AuthProvider>
       </Router>
    </>
  );
}

export default App;
