import React, { useState } from 'react';
import ContentHeader from '../components/ContentHeader';
import useStudentsStore from '../store/useStudentsStore';
import StudentsSearch from '../components/StudentsSearch';
import AlertBox from '../components/AlertBox';
import UserInfo from '../components/UserInfo';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Evaluation() {
    const location = useLocation();
    const navigate = useNavigate();

    let [current, setCurrent] = useState("");

    const resetStudent = useStudentsStore(state => state.resetStudent);
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    // url 변화
    useEffect(()=>{
        location.pathname.includes("routine")
        ? setCurrent("재원생 정기평가")
        : setCurrent("진단평가")
    },[location.pathname])

    return (
        <>
            {location.pathname === "/evaluation" && <Navigate to="/evaluation/routine" />}

            <ContentHeader
                title={"평가 관리"}
                location={["마이페이지", "수학 학습 관리", "평가 관리"]}
                icon="evaluation"
                current={current}
            />

            <div className="row">
                <StudentsSearch>
                    <ul className='content-tabs2'>
                        <li
                            onClick={() => {
                                navigate("/evaluation/routine");
                                resetStudent();
                            }}
                            className={`${location.pathname.includes("routine")
                                    ? "active"
                                    : ""
                                }`}
                        >재원생 정기평가</li>
                        <li
                            onClick={() => {
                                navigate("/evaluation/jindan");
                                resetStudent();
                            }}
                            className={`${location.pathname.includes("jindan")
                                    ? "active"
                                    : ""
                                }`}
                        >진단평가</li>
                    </ul>
                </StudentsSearch>
                <div className="bg bg-content">

                    {
                        clickStudent === null
                            ? <AlertBox name={current} />
                            : (
                                <>
                                    <UserInfo clickStudent={clickStudent} />
                                    <Outlet />
                                </>
                            )
                    }
                </div>
            </div>



        </>
    );
}

export default Evaluation;