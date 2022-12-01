import React from "react";
import Icon from "../../components/Icon";
import { falseModal } from "../../methods/methods";

function StatisticsStandard({setStandard}) {
    return (
        <div className="modal StatisticsStandard" onClick={(e)=>{ falseModal(e,setStandard) }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">학습 포인트 기준</h2>
                    <button className="btn" onClick={()=>{setStandard(false)}}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">지플럼 수학 학습 포인트 지급 기준</strong>
                    </div>
                    <div className="StatisticsStandard-body">
                        <table>
                            <colgroup>
                                <col style={{width : "33.8809%"}}/>
                                <col style={{width : "37.3716%"}}/>
                                <col style={{width : "28.7474%"}}/>
                            </colgroup>
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
                                    <td>2캐럿 (20 포인트)</td>
                                </tr>
                                <tr>
                                    <td>교재 학습(유형서)</td>
                                    <td>소단원 유형 학습 완료(모든 단계 완료)</td>
                                    <td>2캐럿 (20 포인트)</td>
                                </tr>
                                <tr>
                                    <td>교재 학습 만점 보너스</td>
                                    <td>개념 확인하기 / 유형 학습 문제 풀이 만점 추가 지급</td>
                                    <td>1캐럿 (10 포인트)</td>
                                </tr>
                                <tr>
                                    <td>돌발 퀴즈 정답</td>
                                    <td>개념 강의 학습 중 돌발퀴즈 정답 (1회차)</td>
                                    <td>1미네랄 (5 포인트)</td>
                                </tr>
                                <tr>
                                    <td>플러스 학습</td>
                                    <td>서술형 따라잡기 / 교과서별 내신 적중 단위 학습 완료</td>
                                    <td>1미네랄 (5 포인트)</td>
                                </tr>
                                <tr>
                                    <td>정기 평가</td>
                                    <td>단원평가 / 총괄평가 등 응시 완료</td>
                                    <td>2캐럿 (20 포인트)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey" onClick={()=>{setStandard(false)}}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default StatisticsStandard;
