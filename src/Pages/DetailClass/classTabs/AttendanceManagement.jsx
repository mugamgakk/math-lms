import React, { useEffect, useState } from "react";
import ChangeMonth from "../../../components/ChangeMonth";
import styled from "styled-components";
import AttendanceDay from "../AttendanceDay";

const 팔월 = [];

for (let i = 1; i <= 31; i++) {
    팔월.push(i);
}

팔월[11] = { day: 12, state: "결석", 설명: "더워서 출석 못함" };
팔월[21] = { day: 22, state: "출석", 설명: "오늘도 출석함" };
팔월[7] = { day: 8, state: "선택" };

const AttendanceModal = styled.div`
    border: 1px solid #ccc;
    position: absolute;
    background-color: #fff;
    right: 100px;
    bottom: 100px;
    padding: 20px;
`;

function AttendanceManagement() {
    let [day, setDay] = useState(팔월);
    let [modal, setModal] = useState(false);
    let [exnum, setExnum] = useState(); // 번호
    let [reason, setReason] = useState(); // 사유
    let [beforeDays, setBeforeDays] = useState();
    let [week, setWeek] = useState();

    console.log(week)

    useEffect(()=>{
        setReason(day[exnum]?.설명)
    },[exnum])


    return (
        <div className="AttendanceManagement">
            {modal == true && (
                <AttendanceModal>
                    <h4>출결사유</h4>
                    <textarea
                        style={{ width: "100%", height: "70px" }}
                        value={reason}
                        onChange={(e)=>{setReason(e.target.value)}}
                    ></textarea>
                    <button
                        className="btn"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        취소
                    </button>
                    <button className="btn">저장</button>
                </AttendanceModal>
            )}

            <div className="row AttendanceManagement-header">
                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            let arr = [...day];

                            arr.forEach(function (a) {
                                if (a.state === "선택") {
                                    a.state = "출석";
                                }
                            });

                            setDay(arr);
                        }}
                    >
                        선택을 모두 출석으로
                    </button>
                </div>

                <ChangeMonth setBeforeDays={setBeforeDays} setWeek={setWeek} />

                <div>
                    <button className="btn">출결저장</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                </thead>
            </table>
            <div className="calendar">
                {beforeDays && beforeDays.map((a, i) => {
                    return (
                        <div key={i} style={{backgroundColor : "#ddd"}}></div>
                    );
                })}

                {week && week.map((a, i) => {
                    return (
                        <AttendanceDay 
                        date={i + 1} 
                        key={i} 
                        setModal={setModal} 
                        setExnum={setExnum} />
                    );
                })}
            </div>
        </div>
    );
}

export default AttendanceManagement;
