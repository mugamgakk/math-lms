import React, { useEffect, useState } from "react";
import ChangeMonth from "../../../components/ChangeMonth";
import styled from "styled-components";
import AttendanceDay from "../AttendanceDay";

const 팔월 = [];

for(let i = 1; i <= 31; i++ ){
    팔월.push(i)

}

팔월[12] = {day : 12, state : "결석", 설명 : "더워서 출석 못함"}
팔월[22] = {day : 22, state : "출석", 설명 : "오늘도 출석함"}
팔월[8] = {day : 8, state : "선택"}



const AttendanceModal = styled.div`
    border : 1px solid #ccc;
    position : absolute;
    background-color : #fff;
    right: 100px;
    bottom : 100px;
    padding : 20px;
`


function AttendanceManagement() {
    let [week, setWeek] = useState([]);
    let [been, setBeen] = useState([]);
    let [day, setDay] = useState(팔월);
    let [modal, setModal] = useState(false);
    let [exnum, setExnum] = useState();

    return (
        <div className="AttendanceManagement">


            {
                modal == true && (
                    <AttendanceModal>
                        <h4>출결사유</h4>
                        <textarea style={{width : '100%', height : '70px'}} value={day[exnum].설명} ></textarea>
                        <button className="btn" onClick={()=>{setModal(false)}}>취소</button>
                        <button className="btn">저장</button>
                    </AttendanceModal>
                )
            }
            

            <div className="row AttendanceManagement-header">
                <div>
                    <button className="btn" onClick={()=>{
                        let arr = [...day];

                        arr.forEach(function(a){
                            if(a.state === '선택'){
                                a.state = '출석'
                            }
                        })


                        setDay(arr);

                    }}>선택을 모두 출석으로</button>
                </div>

                <ChangeMonth setWeek={setWeek} setBeen={setBeen} />

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
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {been.map((a, i) => {
                    return (
                        <div
                            style={{
                                width: "calc(100% / 7)",
                                height: "110px",
                                backgroundColor: "#ccc",
                            }}
                            key={i}
                        ></div>
                    );
                })}

                {
                    day.map((a, i) => {

                        return (
                            <AttendanceDay date={a} key={i} setModal={setModal} setExnum={setExnum} />
                        );
                    })
                }
            </div>
        </div>
    );
}


export default AttendanceManagement;
