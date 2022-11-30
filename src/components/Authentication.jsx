import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import { getCookie } from '../cookie';

function Authentication() {
    
    return getCookie("gplumLMSlogin") ? <Home/> : <Navigate to="/login" />

}

export default Authentication;