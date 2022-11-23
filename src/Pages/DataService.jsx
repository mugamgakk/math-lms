import React, { useState, useEffect} from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ContentHeader from "../components/ContentHeader";

function DataService() {
    
    const location = useLocation();
    const navigate = useNavigate();


    return ( 
        <>
            {location.pathname === "/data-service" && <Navigate to="/data-service/reference" />}

            <div className="referenceNotification">

                <ContentHeader title={"자료 및 알림"}/>
                <div className="bg contents pt-10">
                    <div className="contents-head">
                        <ul className='content-tabs'>
                            <li 
                            onClick={()=>{
                                navigate("/data-service/reference")
                            }}
                            className={`${
                                location.pathname.includes("reference")
                                    ? "active"
                                    : ""
                            }`}
                            >자료실</li>
                            <li 
                            onClick={()=>{
                                navigate("/data-service/notification")
                            }}
                            className={`${
                                location.pathname.includes("notification")
                                    ? "active"
                                    : ""
                            }`}
                            >학습 알림</li>
                        </ul>
                    </div>
                
                    <Outlet/>
                </div>
            </div>
        </>
     );
}

export default DataService;