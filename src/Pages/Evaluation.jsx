import React, { useState } from 'react';
import ContentHeader from '../components/ContentHeader';
import useStudentsStore from '../store/useStudentsStore';
import StudentsSearch from '../components/StudentsSearch';
import AlertBox from '../components/AlertBox';
import UserInfo from '../components/UserInfo';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

function Evaluation() {
    const location = useLocation();
    const navigate = useNavigate();

    const resetStudent = useStudentsStore(state => state.resetStudent);
    const clickStudent = useStudentsStore((state) => state.clickStudent);


    return (
        <>
            {location.pathname === "/evaluation" && <Navigate to="/evaluation/routine" />}

            <ContentHeader
                title={"평가 관리"}
                location={["마이페이지", "수학 학습 관리", "평가 관리"]}
                icon="evaluation"
                current={"재원생정기평가"}
            />

            <div className="row">
                <StudentsSearch />
                <div className="bg bg-content">

                    {
                        clickStudent === null
                            ? <AlertBox />
                            : (
                                <>
                                    <div className="tabs-header">
                                        <ul className='content-tabs'>
                                            <li
                                                onClick={()=>{
                                                    navigate("/evaluation/routine")
                                                }}
                                                className={`${
                                                    location.pathname.includes("routine")
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >재원생 정기평가</li>
                                            <li
                                                onClick={()=>{
                                                    navigate("/evaluation/jindan")
                                                }}
                                                className={`${
                                                    location.pathname.includes("jindan")
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >진단평가</li>
                                        </ul>
                                    </div>
                                    <UserInfo clickStudent={clickStudent} />

                                    <Outlet/>
                                </>
                            )
                    }
                </div>
            </div>



        </>
    );
}

export default Evaluation;