import dayjs from "dayjs";
import React, { memo } from "react";
import { useState } from "react";
import styled from "styled-components";
import ajax from "../../../ajax";
import ChangeMonth from "../../../components/ChangeMonth";
import useStudentsStore from "../../../store/useStudentsStore";
import AttendanceDay from "../AttendanceDay";
import AttendanceReason from "../modal/AttendanceReason";

export const Box = styled.div`
    width: 109.38px;
    height: 109.38px;
    background-color: ${(props) => props.bg};
    padding: 10px;
`;



function AttendanceManagement() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [data, setData] = useState();
    // 데이터
    let [firstDay, setFirstDay] = useState(new Date());
    let [modal, setModal] = useState(false);

    // 셀렉트 변경시
    const changeData = ({ day, attd }) => {
        let copy = [...data];

        copy[day - 1].attd = attd;

        setData(copy);
    };

    const getData = async (date = new Date()) => {
        const 날짜 = dayjs(date).format("YYYYMM");
        // 202210

        const 마지막날짜 = dayjs(날짜).daysInMonth();

        const data = {
            mode: "view",
            usr_seq: clickStudent.usr_seq,
            ym: 날짜,
        };
        const res = await ajax("/class_daily.php", { data });

        const dataArr = [];

        for (let i = 1; i <= 마지막날짜; i++) {
            dataArr.push(i);

            for (const key of res.data) {
                if (i === parseInt(key.daynum)) {
                    dataArr[i - 1] = key;
                }
            }
        }

        setData(dataArr);
    };

    // 저장
    const saveAttendance = async () => {
        let arr = [];

        // console.log(data)

        data.forEach((a) => {
            if (typeof a === "object") {
                arr.push(a);
            }
        });

        const param = {
            mode: "update",
            usr_seq: clickStudent.usr_seq,
            list: arr,
        };

        console.log(param);

        const res = await ajax("/class_daily.php", { data: param });

        console.log(res);
    };

    return (
        <>
            {modal && (
                <AttendanceReason firstDay={firstDay} setModal={setModal} clickStudent={clickStudent}/>
            )}

            <header className="fj">
                <div>
                    <button
                        className="btn"
                        onClick={() => {
                            let copy = [...data];

                            for (let key of copy) {
                                if (typeof key === "object") {
                                    key.attd = "P";
                                }
                            }

                            setData(copy);
                        }}
                    >
                        선택에서 출석
                    </button>
                </div>
                <ChangeMonth
                    onChange={(ele) => {
                        getData(ele);
                        setFirstDay(ele);
                    }}
                />
                <div>
                    <button className="btn" onClick={saveAttendance}>
                        출결저장
                    </button>
                </div>
            </header>
            <table>
                <thead>
                    <tr>
                        <th style={{ color: "red" }}>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th style={{ color: "red" }}>토</th>
                    </tr>
                </thead>
            </table>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <BeforeMonth firstDay={firstDay} />
                {data &&
                    data.map((a, i) => {
                        return (
                            <AttendanceDay
                                item={a}
                                key={i}
                                changeData={changeData}
                                setModal={setModal}
                                firstDay={firstDay}
                                clickStudent={clickStudent}
                            />
                        );
                    })}

                <NextMonth firstDay={firstDay} />
            </div>
        </>
    );
}

const BeforeMonth = memo(({ firstDay }) => {
    let { $y, $M } = dayjs(firstDay);

    // 이전 달의 마지막 날 날짜와 요일 구하기
    const startDay = new Date($y, $M, 0);
    const prevDate = startDay.getDate();
    const prevDay = startDay.getDay();

    let arr = [];
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
        arr.push(
            <Box key={i} bg="#ddd">
                {i}
            </Box>
        );
    }

    if (arr.length === 7) {
        return [];
    } else {
        return arr;
    }
});

const NextMonth = memo(({ firstDay }) => {
    let { $y, $M } = dayjs(firstDay);

    // 이전 달의 마지막 날 날짜와 요일 구하기
    const startDay = new Date($y, $M + 1, 0);
    const prevDay = startDay.getDay();

    let arr = [];
    for (let i = 1; i <= 7 - (prevDay + 1); i++) {
        arr.push(
            <Box key={i} bg="#ddd">
                {i}
            </Box>
        );
    }

    return arr;
});

export default AttendanceManagement;
