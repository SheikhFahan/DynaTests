import React, { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import AuthContext from '../Context/AuthContext';

const PrivateRoutes = () => {
    const {name} = useContext(AuthContext)
  return (
        name ? <Outlet/> : <Navigate to= "/login"/>
    )
}

export default PrivateRoutes