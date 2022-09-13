import React, { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) => props.bg};
    padding: 10px;
    width: 100%;
    z-index: 100;
`;

function StatisticsStandard() {
    let [standard, setStandard] = useState(false);

    return (
        <div style={{ position: "relative", paddingTop: "100px" }}>
            <Box bg="orange">
                <h4>지플럼 수학 학습 포인트 지급 기준</h4>
                <button
                    className="btn"
                    onClick={() => {
                        setStandard(!standard);
                    }}
                >
                    {standard ? "닫기" : "확인"}
                </button>
                {standard && (
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>학습 포인트 발생 이벤트</th>
                                <th>지급 포인트</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>교재 학습(개념서)</td>
                                <td>소단원 개념 학습 완료(모든 단계 완료)</td>
                                <td>2캐럿(20 포인트)</td>
                            </tr>
                            <tr>
                                <td>교재 학습 만점 보너스</td>
                                <td>개념 확인하기 / 유형 학습 문제 풀이 만점 추가 지급</td>
                                <td>1캐럿(10 포인트)</td>
                            </tr>
                            <tr>
                                <td>돌발 퀴즈 정답</td>
                                <td>개념 강의 학습 중 돌발퀴즈 정답(1회차)</td>
                                <td>1미네랄(5 포인트)</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Box>
        </div>
    );
}

export default StatisticsStandard;
