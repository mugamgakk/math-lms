import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import AttendanceItem from "./Attendance/AttendanceItem";
import AttendanceSearch from "./Attendance/AttendanceSearch";

const data = [
    {
        id: 1,
        name: "강수학",
        userId: "kangsh",
        출결: "조퇴",
        사유: "ㅁㄴㅇㅁㄴㅇㅁㄴㅇ",
        반이름: "중등 월화수 A",
    },
    { id: 2, name: "강시후", userId: "kshhhh", 출결: null, 사유: "", 반이름: "중등 월화수 A" },
    { id: 3, name: "김민찬", userId: "minck", 출결: null, 사유: "", 반이름: "중등 월화수 A" },
    { id: 4, name: "박연아", userId: "parkya", 출결: null, 사유: "", 반이름: "중등 월화수 B" },
    { id: 5, name: "오지연", userId: "yonnii", 출결: null, 사유: "", 반이름: "중등 월화수 B" },
];

function Attendance() {
    // 전체 체크
    let [allCheck, setAllCheck] = useState(0);

    // 날짜
    let [date, setDate] = useState(new Date());

    // 반 리스트
    let [chulCheckList, setChulCheckList] = useState(data);

    return (
        <div className="container">
            <ContentHeader
                title="출석 체크"
                location={"마이페이지 > 수학 학습 관리 > 오늘의 수업"}
            />

        
            <header className="fj mb-3">
                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            console.log(data);
                        }}
                    >
                        저장
                    </button>
                </div>

                <AttendanceSearch
                    data={data}
                    chulCheckList={chulCheckList}
                    setChulCheckList={setChulCheckList}
                />
            </header>

            <table>
                <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>학생명(아이디)</th>
                        <th>
                            출결 체크
                            <br />
                            <button
                                className="btn"
                                onClick={() => {
                                    setAllCheck(allCheck + 1);
                                }}
                            >
                                모두출석
                            </button>
                        </th>
                        <th>출결 사유</th>
                    </tr>
                </thead>
                <tbody>
                    {chulCheckList.map((list) => {
                        return <AttendanceItem list={list} key={list.id} allCheck={allCheck} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Attendance;
