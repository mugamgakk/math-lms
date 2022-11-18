import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../Pages/Home';

function Authentication() {
    

    return (
        <>
        {
            localStorage.getItem("GplumMathIsLogin") ? <Home/> : <Navigate to="/login" />
        }
        </>

    )
}

export default Authentication;