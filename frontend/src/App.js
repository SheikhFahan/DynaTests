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
          <Route index element={<Hero />}  />
            <Route element={<PrivateRoutes />}>
              <Route path="/test" element={<QuestionCard />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
