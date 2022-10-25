import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ContentHeader from "../components/ContentHeader";
import SkeletonTable from "../components/SkeletonTable";
import AttendanceItem from "./Attendance/AttendanceItem";
import AttendanceSearch from "./Attendance/AttendanceSearch";

function Attendance() {
    // 전체 체크
    let [allCheck, setAllCheck] = useState(0);

    // 스켈레톤
    let [skeleton, setSkeleton] = useState(true);

    // 반 리스트
    let [chulCheckList, setChulCheckList] = useState([]);

    useEffect(() => {
        axios.post("http://192.168.11.178:8080/attendace/list").then((res) => {
            setChulCheckList(res.data.list);
            setSkeleton(false);
        });

    }, []);

    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={"마이페이지 > 수학 학습 관리 > 오늘의 수업"}
            />

            <div className="bg">

            <header className="fj mb-3">
                <div></div>
                <AttendanceSearch />
            </header>


                <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th style={{width : "25%"}}>학생명(아이디)</th>
                            <th style={{width : "15%"}}>
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
                            <th style={{width : "60%"}}>출결 사유</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {skeleton ? (
                            <SkeletonTable R={4} D={3} />
                        ) : (
                            chulCheckList.map((list) => {
                                return (
                                    <AttendanceItem
                                        list={list}
                                        key={list._id}
                                        allCheck={allCheck}
                                    />
                                );
                            })
                        )}
                    </tbody>
                </table>
                </div>
                </div>
        </>
    );
}

export default Attendance;
