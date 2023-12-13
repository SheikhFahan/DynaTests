import {jwtDecode} from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  let [AuthTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("AuthTokens")
      ? JSON.parse(localStorage.getItem("AuthTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("AuthTokens")
      ? jwtDecode(localStorage.getItem("AuthTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
 
 
  let loginUser = async (e) => {
    try{
        e.preventDefault();
    const body = JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value,
    });
    let response = await axios.post("http://127.0.0.1:8000/api/token/", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(response.data)
    if(response.status === 200){
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("AuthTokens", JSON.stringify(data));
    }else{
        alert("something went wrong");
    }
    }catch(error){
        alert("username or password not correct")
    }
    
  };
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("AuthTokens");
    <Navigate to='/login' />
  }

  const contextData = {
    user: user,
    loginUser: loginUser, 
    logoutUser : logoutUser,
    AuthTokens : AuthTokens,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
