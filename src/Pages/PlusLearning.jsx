import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import StudentsSearch from "../components/StudentsSearch";
import useStudentsStore from "../store/useStudentsStore";
import AlertBox from "../components/AlertBox";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ajax from "../ajax";

function PlusLearning() {
    const navigate = useNavigate();
    const location = useLocation();

    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let { resetStudent } = useStudentsStore((state) => state);
    let [current, setCurrent] = useState("");

    // url 변화
    useEffect(() => {
        location.pathname.includes("plus-learning/narrative")
            ? setCurrent("서술형 따라잡기")
            : setCurrent("교과서 내신적중");
    }, [location.pathname]);

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
                <StudentsSearch grade={current === "교과서 내신적중" ? "M" : null }>
                    <div className="student-list-tab">
                        <ul>
                            <li
                                className={`${current === "서술형 따라잡기" ? " active" : ""}`}
                                onClick={() => {
                                    navigate("/plus-learning/narrative");
                                }}
                            >
                                서술형 따라잡기
                            </li>
                            {clickStudent?.school_grade.includes("중") && (
                                <li
                                    className={`${current === "교과서 내신적중" ? " active" : ""}`}
                                    onClick={() => {
                                        navigate("/plus-learning/textBook");
                                    }}
                                >
                                    교과서 적중문제
                                </li>
                            )}
                        </ul>
                    </div>
                </StudentsSearch>
                <div className="bg bg-content">
                    {clickStudent === null ? (
                        <AlertBox name={current}>
                            <div className="plus-learning-alert">
                                <div className="msg-wrap">
                                    <p className="alert-msg">
                                        ※ [플러스 학습] 학생명(아이디) 클릭 시 학생별 추가 학습
                                        자료의 오픈 및 출력이 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </AlertBox>
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
