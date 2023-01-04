import React from "react";
import EvaluationRoutineContent from "./EvaluationRoutineContent";
import styled from "styled-components";
import StudentsSearch from "../../components/StudentsSearch";
import {  useNavigate } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import AlertBox from "../../components/AlertBox";
import useStudentsStore from "../../store/useStudentsStore";

const Box = styled.div`
    height : 61px;
    background-color : #f2eeeb;
    padding : 20px 18px;
    margin-top : 123px;
    p{
        color : #eb615a;
        font-weight : 600
    }
`

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
                    <div className="student-list-tab">
                        <ul>
                            <li
                                onClick={() => {
                                    navigate("/evaluation/routine");
                                }}
                                className={`active`}
                            >재원생 정기평가</li>
                            <li
                                onClick={() => {
                                    navigate("/evaluation/jindan");
                                }}
                            >진단평가</li>
                        </ul>
                    </div>
                </StudentsSearch>

                <div className="bg bg-content">
                    {clickStudent === null 
                    ? <AlertBox>
                        <Box><p>※ [재원생 정기평가 관리] 학생명(아이디)를 클릭하세요.</p></Box>
                    </AlertBox>
                    : <EvaluationRoutineContent />}
                </div>
            </div>
        </>
    );
}

export default EvaluationRoutine;
