import React, { useState } from "react";

function ClassManagement(){
    return(
        <>
              <table style={{ margin: '5px 0 0 0' }}>
                <colgroup>
                    <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan={2}>단원</th>
                        <th colSpan={5}>수행현황</th>
                        <th rowSpan={2}>학습 완료</th>
                        <th rowSpan={2}>오답<br/>정복하기<br /><button className="btn">생성</button></th>
                    </tr>
                    <tr>
                        <th>개념 강의</th>
                        <th>개념 확인/<br />기본 문제</th>
                        <th>개념 설명</th>
                        <th>유형 학습</th>
                        <th>맞춤 클리닉</th>
                    </tr>
                </thead>
                
            </table>
        </>
    )
}
export default ClassManagement;