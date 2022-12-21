import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import StudentsSearch from "../components/StudentsSearch";
import useStudentsStore from "../store/useStudentsStore";
import AlertBox from "../components/AlertBox";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PlusLearning() {
    const navigate = useNavigate();
    const location = useLocation();

    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let { resetStudent } = useStudentsStore((state) => state);
    let [current, setCurrent] = useState("")

    // url 변화
    useEffect(() => {
        resetStudent();

        location.pathname.includes("narrative")
            ? setCurrent("서술형 따라잡기")
            : setCurrent("교과서 적중문제")
    }, [location.pathname])

    return (
        <>
            {/* /plus-learning 로 입장시 초기값 서술형으로 리다이렉트 */}
            {location.pathname === "/plus-learning" && <Navigate to="/plus-learning/narrative" />}
            <ContentHeader
                title={"플러스 러닝"}
                location={["마이페이지", "수학 학습 관리", "플러스 학습"]}
                icon="plusLearning"
                current={current}
            />
            <div className="row layout-height">
                <StudentsSearch>
                    <div className="student-list-tab">
                        <ul>
                            <li
                                className={`${current === "서술형 따라잡기" ? " active" : ""}`}
                                onClick={() => {
                                    navigate("/plus-learning/narrative");
                                }}>
                                서술형 따라잡기
                            </li>
                            <li
                            className={`${current === "교과서 적중문제" ? " active" : ""}`}
                            onClick={() => {
                                navigate("/plus-learning/textBook");
                            }}
                        >
                            교과서 적중문제
                        </li>
                        </ul>
                    </div>
                </StudentsSearch>
                <div className="bg bg-content">
                    {clickStudent === null ? (
                        <AlertBox bg="pink" name={current} />
                    ) : (
                        <>
                            <Outlet />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default PlusLearning;
