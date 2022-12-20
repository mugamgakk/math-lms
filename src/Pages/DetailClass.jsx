import React from "react";
import ContentHeader from "../components/ContentHeader";
import StudentsSearch from "../components/StudentsSearch";
import useStudentsStore from "../store/useStudentsStore";
import AlertBox from "../components/AlertBox";
import UserInfo from "../components/UserInfo";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const classItems = [
    { name: "수업관리", href: "management" },
    { name: "오답 정복하기", href: "wrong-answer" },
    { name: "학습 분석표", href: "table" },
    { name: "출결 관리", href: "attend" },
];

function DetailClass() {
    const location = useLocation();
    const navigate = useNavigate();
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [current, setCurrent] = useState("");

    useEffect(()=>{
        classItems.forEach(ele=>{
            if(location.pathname.includes(ele.href)){
                setCurrent(ele.name)
            }
        })
    },[location.pathname])

    return (
        <>
            {location.pathname === "/detail-class" && <Navigate to="/detail-class/management" />}

            <ContentHeader
                title={"학생별 수업 관리"}
                location={["마이페이지", "수학 학습 관리", "학생별 수업 관리"]}
                icon="studentManagement"
                current={current}
            />
            <div className="row layout-height">
                <StudentsSearch />
                <div className="bg bg-content student-content">
                    {clickStudent === null ? (
                        <AlertBox name={current} />
                    ) : (
                        <>
                            <div className="tabs-header">
                                <ul className="content-tabs">
                                    {classItems.map((a,i) => {
                                        return (
                                            <li
                                                key={i}
                                                onClick={()=>{
                                                    navigate("/detail-class/" + a.href)
                                                }}
                                                className={`${
                                                    location.pathname.includes(a.href)
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                {a.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <UserInfo clickStudent={clickStudent} />
                            <Outlet />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailClass;
