import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import StudentsSearch from "../components/StudentsSearch";
import useStudentsStore from "../store/useStudentsStore";
import AlertBox from "../components/AlertBox";
import Narrative from "./PlusLearning/Narrative";
import TextBook from "./PlusLearning/TextBook";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function PlusLearning() {
    const navigate = useNavigate();
    const location = useLocation();

    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let { resetStudent } = useStudentsStore((state) => state);

    return (
        <>
            {/* /plus-learning 로 입장시 초기값 서술형으로 리다이렉트 */}
            {location.pathname === "/plus-learning" && <Navigate to="/plus-learning/narrative" />}
            <ContentHeader
                title={"플러스 러닝"}
                location={["마이페이지", "수학 학습 관리", "플러스 학습"]}
                icon="plusLearning"
                current={"플러스 러닝"}
            />
            <div className="row">
                <StudentsSearch>
                    {/* <ul className="content-tabs" >
                    <li 
                    className={`${tab === "서술형" ? " active" : ""}`}
                    onClick={() => {
                        clickTab("서술형");
                        setLocation("서술형 따라잡기");
                    }}
                    >서술형 따라잡기</li>
                    <li
                        className={`${tab === "교과서" ? " active" : ""}`}
                        onClick={() => {
                            clickTab("교과서");
                            setLocation("교과서 적중문제");
                        }}
                    >교과서 적중문제</li>
                </ul> */}
                </StudentsSearch>
                <div className="bg bg-content">
                    {clickStudent === null ? (
                        <AlertBox bg="pink" />
                    ) : (
                        <>
                            <div className="tabs-header">
                                <ul className="content-tabs">
                                    <li
                                        className={`${location.pathname.includes("narrative") ? " active" : ""}`}
                                        onClick={() => {
                                            navigate("/plus-learning/narrative");
                                        }}
                                    >
                                        서술형 따라잡기
                                    </li>
                                    <li
                                        className={`${location.pathname.includes("textBook") ? " active" : ""}`}
                                        onClick={() => {
                                            navigate("/plus-learning/textBook");
                                        }}
                                    >
                                        교과서 적중문제
                                    </li>
                                </ul>
                            </div>
                            <Outlet />
                            {/* {
                                        {
                                            서술형: <Narrative />,
                                            교과서: <TextBook />
                                        }[tab]
                                    } */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default PlusLearning;
