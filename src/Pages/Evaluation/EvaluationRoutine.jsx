import React from "react";
import EvaluationRoutineContent from "./EvaluationRoutineContent";
import styled from "styled-components";
import style from "../../style/style-module/EvaluationOrder.module.scss";
import StudentsSearch from "../../components/StudentsSearch";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import AlertBox from "../../components/AlertBox";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";

const Box = styled.div`
    padding: 5px;
    background: #ccc;
`;

function EvaluationRoutine() {
    const navigate = useNavigate();
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    return (
        <>
            <ContentHeader
                title={"평가 관리"}
                location={["마이페이지", "수학 학습 관리", "평가 관리"]}
                icon="evaluation"
                current="재원생 정기평가"
            />

            <div className="row layout-height">
                <StudentsSearch>
                    <ul className="content-tabs2">
                        <li
                            onClick={() => {
                                navigate("/evaluation/routine");
                            }}
                            className={`active`}
                        >
                            재원생 정기평가
                        </li>
                        <li
                            onClick={() => {
                                navigate("/evaluation/jindan");
                            }}
                        >
                            진단평가
                        </li>
                    </ul>
                </StudentsSearch>

                <div className="bg bg-content">
                    {clickStudent === null ? <AlertBox name="재원생 정기평가" /> : <EvaluationRoutineContent />}
                </div>
            </div>
        </>
    );
}

export default EvaluationRoutine;
