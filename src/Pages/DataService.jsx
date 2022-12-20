import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../components/ContentHeader";

function DataService() {
    const location = useLocation();
    const navigate = useNavigate();

    let [tab, setTab] = useState();

    useEffect(() => {
        location.pathname.includes("reference") ? setTab("자료실") : setTab("학습 알림");
    }, [location.pathname]);

    return (
        <>
            {location.pathname === "/data-service" && <Navigate to="/data-service/reference" />}

                <ContentHeader
                    title={"자료 및 알림"}
                    location={["마이페이지", "수학 학습 관리", "자료 및 알림"]}
                    current={tab}
                    icon="notification"
                />
                <div className="bg contents pt-10 layout-height">
                    <div className="contents-head">
                        <ul className="content-tabs">
                            <li
                                onClick={() => {
                                    navigate("/data-service/reference");
                                }}
                                className={`${tab === "자료실" ? "active" : ""}`}
                            >
                                자료실
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/data-service/notification");
                                }}
                                className={`${tab === "학습 알림" ? "active" : ""}`}
                            >
                                학습 알림
                            </li>
                        </ul>
                    </div>

                    <Outlet />
                </div>
        </>
    );
}

export default DataService;
