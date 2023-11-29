import jwt_decode from 'jwt-decode';
import {createContext, useState, useEffect} from 'react';
import {userNavigate} from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;
const contextValue = {
    'name': 'fahan', // Replace with your actual basename
  };
export const AuthProvider  = ({ children }) => {
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};