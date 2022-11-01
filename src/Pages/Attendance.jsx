import axios from "axios";
import React, { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ContentHeader from "../components/ContentHeader";
import DateNext from "../components/DateNext";
import SearchBtn from "../components/ui/button/SearchBtn";
import ClassSelect from "../components/ui/select/ClassSelect";
import AttendanceTableList from "./Attendance/AttendanceTableList";

function Attendance() {
    // 리스트
    let [list, setList] = useState([]);

    //날짜
    let [date, setDate] = useState(new Date());
    // 검색어
    let [search, setSearch] = useState("");
    // 초기값
    let initialData = useRef();

    const updateData = useCallback(({ _id, attendance, reason }) => {
            if (attendance) {
                let copy = [...list];
                copy.forEach((att) => {
                    if (att._id === _id) {
                        att.attendance = attendance;
                    }
                });
                setList(copy);
            }

            if (reason || reason === "") {
                let copy = [...list];
                copy.forEach((att) => {
                    if (att._id === _id) {
                        att.reason = reason;
                    }
                });
                setList(copy);
            }
        },[list]);

    useEffect(() => {
        axios.post("http://192.168.11.178:8080/attendace/list").then((res) => {
            let arr = [];

            for (let ele of res.data.list) {
                arr.push({ ...ele });
            }

            initialData.current = arr;

            setList([...res.data.list]);
        });
    }, []);

    return (
        <>
            <ContentHeader
                title="출석 체크"
                location={"마이페이지 > 수학 학습 관리 > 오늘의 수업"}
            />

            <div className="bg">
                <header className="mb-3">
                    <DateNext value={date} onChange={(ele) => setDate(ele)} />
                    <div className="fj">
                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    let copy = [...list];
                                    copy.forEach((a) => {
                                        a.attendance = "출석";
                                        a.reason = "";
                                    });
                                    setList(copy);
                                }}
                            >
                                모두 출석
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    let arr = [];

                                    for (let ele of initialData.current) {
                                        arr.push({ ...ele });
                                    }
                                    setList(arr);
                                }}
                            >
                                초기화
                            </button>
                        </div>
                        <div>
                            <ClassSelect width={"200px"} />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="학생"
                                style={{ width: "200px", margin: "0 5px" }}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <SearchBtn />
                        </div>
                    </div>
                </header>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "25%" }}>학생명(아이디)</th>
                            <th style={{ width: "15%" }}>출결 체크</th>
                            <th style={{ width: "60%" }}>출결 사유</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((ele) => {
                                return (
                                    <AttendanceTableList
                                        updateData={updateData}
                                        ele={ele}
                                        key={ele._id}
                                    />
                                );
                            })}
                    </tbody>
                </table>

                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            console.log(list);
                        }}
                    >
                        출결내용 저장
                    </button>
                </div>
            </div>
        </>
    );
}

export default Attendance;
