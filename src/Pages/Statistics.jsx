import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import styled from "styled-components";
import StatisticsSearch from "./Statistics/StatisticsSearch";

const Box = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props) => props.bg};
    padding: 10px;
    width: 100%;
    z-index: 100;
`;

function Statistics() {
    let [standard, setStandard] = useState(false);

    return (
        <div className="Statistics container">
            <ContentHeader title={"학습 포인트 현황"} />
            <div className="wrap container" style={{ position: "relative", paddingTop: "100px" }}>
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
                                    <td>교재 학습(개념서)</td>
                                    <td>소단원 개념 학습 완료(모든 단계 완료)</td>
                                    <td>2캐럿(20 포인트)</td>
                                </tr>
                                <tr>
                                    <td>교재 학습(개념서)</td>
                                    <td>소단원 개념 학습 완료(모든 단계 완료)</td>
                                    <td>2캐럿(20 포인트)</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </Box>

                <div className="Statistics-search fj">
                    <div>
                        <button className="btn">초기화</button>
                        <button className="btn">다운로드</button>
                    </div>
                    <StatisticsSearch />
                </div>

                <table></table>
            </div>
        </div>
    );
}

export default Statistics;
