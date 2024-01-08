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
import CategoriesPage from "./Pages/CategoriesPage";
import ProfileCard from "./Pages/ProfilePage";
import CombinationQuestions from "./Components/CombinationQuestions";
import GroupTestUpload from "./Pages/GroupTestUpload";
import TestManagementPage from "./Pages/TestManagementDashboardPage";
import CreateCategoriesComp from "./Components/CreateCategoriesComp";
import CreateCombinedCategories from "./Components/CreateCombinedCategories";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavbarComp />
          
          <Routes>
          <Route index element={<Hero />}  />
            <Route element={<PrivateRoutes />}>
              <Route path='/categories' element={<CategoriesPage />} />;
              <Route path="/test" element={<QuestionCard />} />
              <Route path="/profile" element={<ProfileCard/>} />
              <Route path='/dyn_test/:categoryId' element ={<QuestionCard />} />
              <Route path='/institution_dashboard/create_group_test/' element ={<GroupTestUpload />} />
              <Route path='/institution_dashboard' element ={<TestManagementPage />} />
              <Route path='/comb_dyn_test/:categoryId' element ={<CombinationQuestions />} />
              <Route path='/institution_dashboard/create_categories/' element ={<CreateCategoriesComp />} />
              <Route path='/institution_dashboard/create_combined_categories/' element ={<CreateCombinedCategories />} />
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
