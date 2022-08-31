import React from "react";
import { useSelector } from "react-redux";

function EvaluationContent({ tab }) {
    let { clickStudent } = useSelector((state) => state.studentsSearchSlice);

    return (
        <div>
            {clickStudent === null ? (
                <div style={{ padding: "20px", backgroundColor: "yellow" }}>
                    {tab} 학생 이름(아이디)을 클릭하세요.
                    <br />* 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
                </div>
            ) : (
                {
                    재원생정기평가 : <div>123</div>,
                    진단평가 : <div>123</div>
                }[tab]
            )
            }
        </div>
    );
}

export default EvaluationContent;
