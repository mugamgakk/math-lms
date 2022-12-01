import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function Evaluation() {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/evaluation" && <Navigate to="/evaluation/routine" />}
                {/* <JinDanSearch/> */}

                <Outlet />
        </>
    );
}

export default Evaluation;