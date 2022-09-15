import React from "react";
import AlertBox from "../../components/AlertBox";
import StudentsSearch from "../../components/StudentsSearch";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import EvaluationRoutineContent from "./EvaluationRoutineContent";
import styled from "styled-components";
import style from "../../style/style-module/EvaluationOrder.module.scss";

const Box = styled.div`
    padding: 5px;
    background: #ccc;
`;

function EvaluationRoutine() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    return (
        <div className="row">
            <StudentsSearch />
            {clickStudent === null ? (
                <AlertBox bg="pink" name="재원생 정기평가 관리" />
            ) : (
                <div style={{ width: "840px" }}>
                    <UserInfo clickStudent={clickStudent} />

                    <Box>
                        <h4>정기평가 진행 순서</h4>
                        <ol className={style.evaluation_order}>
                            <li>평가를 진행할 시험지를 선택 오픈합니다.</li>
                            <li>오픈한 평가지를 인쇄하여 학생에게 제공합니다</li>
                            <li>
                                문제별 답안을 입력합니다 학생이 지플럼 학습 화면에서 직접 입력할
                                수도 있습니다
                            </li>
                            <li>자동 생성된 성적표를 확인 후 인쇄합니다</li>
                        </ol>

                        <strong>모든 평가는 1회만 응시 가능합니다.</strong>
                    </Box>

                    <EvaluationRoutineContent />
                </div>
            )}
        </div>
    );
}

export default EvaluationRoutine;
