import React from "react";
import styled from "styled-components";
import EvaluationPrint from "./EvaluationPrint";

const Box = styled.div`
    padding: 20px;
    background-color: orangered;
    color: white
`;

function EvaluationJindanContent() {
    return (
        <div className="EvaluationJindanContent">
            <Box>
                진단 평가 진행 순서 <br/>
                1. 학년 학기를 선택하여 진단 평가지를 인쇄 합니다 . 학생의 현재
                학년 학기의 직전 단계 를 선택하세요 <br/>
                 2. 학생이 응시 완료한 평가지를 보고 문제별
                답안을 입력합니다 <br/>
                3. 진단 평가 분석표를 바탕으로 상담을 실시합니다 . 분석표 인쇄
                가능 <br/>
                ※ 진단평가 결과는 등록 회원의 학습 정보로 연동할 수 있습니다 . (1 회 한) <br/>
                ※ 연동하지 않은 평가 결과는 개인 정보 보호 정책에 따라 1 년 후 삭제됩니다 .
            </Box>

            <EvaluationPrint/>

        </div>
    );
}

export default EvaluationJindanContent;
