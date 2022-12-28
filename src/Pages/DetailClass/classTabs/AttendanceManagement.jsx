import dayjs from "dayjs";
import React, { memo } from "react";
import { useState } from "react";
import styled from "styled-components";
import ajax from "../../../ajax";
import ChangeMonth from "../../../components/ChangeMonth";
import useStudentsStore from "../../../store/useStudentsStore";
import AttendanceDay from "../AttendanceDay";
import AttendanceReason from "../modal/AttendanceReason";
import FadeLoader from "react-spinners/FadeLoader";
import { useRef } from "react";
import CustomDatePickerMonth from "../../../components/CustomDatePickerMonth";
import { useEffect } from "react";

export const Box = styled.div`
    width: 14.2857%;
    height: 107.83px;
    background-color: ${(props) => props.bg};
    padding: 10px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
`;

const override = {
    position: "absolute",
    left: "50%",
    top: "200px",
    transform: "translateY(-50%)",
};

const bg = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(256,256,256,0.6)",
    zIndex: 1,
};

function AttendanceManagement() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [data, setData] = useState();
    // 데이터
    let [firstDay, setFirstDay] = useState(new Date());
    // 사유 모달
    let [modal, setModal] = useState(false);

    // 클릭한 날짜
    let [clickDay, setClickDay] = useState(1);
    // 스피너
    let [spin, setSpin] = useState(true);

    // 변경유무
    let changeState = useRef(false);

    let [month, setMonth] = useState(new Date());

    // 셀렉트 변경시
    const changeData = ({ day, attd }) => {
        let copy = [...data];

        copy[day - 1].attd = attd;

        changeState.current = true;

        setData(copy);
    };

    const getData = async (date = new Date()) => {
        setSpin(true);
        const 날짜 = dayjs(date).format("YYYYMM");
        // 202210

        const 마지막날짜 = dayjs(날짜).daysInMonth();

        const dataArr = [];

        for (let i = 1; i <= 마지막날짜; i++) {
            dataArr.push(i);
        }

        setData(dataArr);

        const data = {
            mode: "view",
            usr_seq: clickStudent.usr_seq,
            ym: 날짜,
        };
        const res = await ajax("/class_daily.php", { data });

        for (let i = 1; i <= 마지막날짜; i++) {
            for (const key of res.data) {
                if (i === parseInt(key.daynum)) {
                    dataArr[i - 1] = key;
                }
            }
        }

        setData(dataArr);
        setTimeout(() => {
            setSpin(false);
        }, 300);
    };

    // 저장
    const saveAttendance = async () => {
        let arr = [];

        data.forEach((a) => {
            if (typeof a === "object") {
                // delete a.daynum
                arr.push(a);
            }
        });

        const param = {
            mode: "update",
            usr_seq: parseInt(clickStudent.usr_seq),
            list: arr,
        };

        const res = await ajax("/class_daily.php", { data: param });
    };

    useEffect(() => {
        getData(month);
    }, [month, clickStudent]);

    return (
        <>
            {modal && (
                <AttendanceReason
                    month={month}
                    setModal={setModal}
                    clickStudent={clickStudent}
                    clickDay={clickDay}
                />
            )}

            <div className="AttendanceManagement-header" style={{ marginTop: "20px" }}>
                <div className="d-flex">
                    <ChangeMonth
                        style={{ marginRight: "10px" }}
                        value={month}
                        onChange={(ele) => {
                            setMonth(ele);
                        }}
                    />
                    <CustomDatePickerMonth
                        maxDate={new Date()}
                        value={month}
                        onChange={(day) => {
                            setMonth(day);
                        }}
                    />
                </div>
                <div>
                    <button
                        className="btn-grey mr-10"
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
                        선택 → 출석
                    </button>
                    <button
                        className="btn-green"
                        style={{width : "100px"}}
                        onClick={() => {
                            if (window.confirm("저장하시겠습니까?") === false) {
                                return;
                            } else {
                                saveAttendance();
                            }
                        }}
                    >
                        출결 저장
                    </button>
                </div>
            </div>

            <div className="lms-calendar">
                <div className="lms-calendar-header">
                    <div className="D">Sun</div>
                    <div className="D">Mon</div>
                    <div className="D">Tus</div>
                    <div className="D">Wed</div>
                    <div className="D">Thu</div>
                    <div className="D">Fri</div>
                    <div className="D">Sat</div>
                </div>
                <div className="lms-calendar-body">
                    <BeforeMonth month={month} />
                    {data &&
                        data.map((a, i) => {
                            return (
                                <AttendanceDay
                                    item={a}
                                    key={i}
                                    changeData={changeData}
                                    setModal={setModal}
                                    setClickDay={setClickDay}
                                    currentMonth={ dayjs(month).format("YYYYMMDD")}
                                />
                            );
                        })}

                    <NextMonth month={month} />
                </div>
                {spin && (
                    <div style={bg}>
                        <FadeLoader color={"#00A37F"} cssOverride={override} size={150} />
                    </div>
                )}
            </div>
        </>
    );
}

const BeforeMonth = memo(({ month }) => {
    let { $y, $M } = dayjs(month);

    // 이전 달의 마지막 날 날짜와 요일 구하기
    const startDay = new Date($y, $M, 0);
    const prevDate = startDay.getDate();
    const prevDay = startDay.getDay();

    let arr = [];
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
        arr.push(
            <div key={i} className="day not-day">
                <div className="num">{i}</div>
            </div>
        );
    }

    if (arr.length === 7) {
        return [];
    } else {
        return arr;
    }
});

const NextMonth = memo(({ month }) => {
    let { $y, $M } = dayjs(month);

    // 이전 달의 마지막 날 날짜와 요일 구하기
    const startDay = new Date($y, $M + 1, 0);
    const prevDay = startDay.getDay();

    let arr = [];
    for (let i = 1; i <= 7 - (prevDay + 1); i++) {
        arr.push(
            <div key={i} className="day not-day">
                <div className="num">{i}</div>
            </div>
        );
    }

    return arr;
});

export default AttendanceManagement;
