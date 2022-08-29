import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-date-picker"; // 데이트 피커
import { useMemo } from "react";
import LbtModal from "./modal/LbtModal";
import LbtBookCheckbox from "./LbtBookCheckbox";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import { setLbtOption } from "../../feature/studentsListSlice";

let LbtBookArea = styled.div`
    width: 400px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ddd;
    text-align: center;
    margin-top: 10px;
    background-color: #ccc;
`;

function LbtDayOption() {
    let oneMonthAgo = useMemo(() => {
        var now = new Date();
        var oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return oneMonthAgo;
    }, []);

    let dispatch = useDispatch();

    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [lastDay, setLastDay] = useState(new Date());
    let [option, setOption] = useState(false);
    let [modal, setModal] = useState(false);
    let [subjectArr, setSubjectArr] = useState([]);

    const optionBtn = () => {
        if (startDay !== "" && lastDay !== "") {
            setOption(true);
        }
    };

    const createLbt = () => {
        if (option === false) {
            alert("학습 분석표를 설정하세요");
        } else {

            let {$y, $M, $D} = dayjs(startDay)
            let a = dayjs(lastDay);

            let obj = {
                startDay : [$y, $M + 1, $D],
                lastDay : [a.$y, a.$M + 1, a.$D],
                subjectArr
            }

            dispatch(setLbtOption(obj))


            setModal(true);
        }
    };


    return (
        <div className="lbt-option">
            {modal && (
                <LbtModal
                    setModal={setModal}
                    startDay={startDay}
                    lastDay={lastDay}
                    subjectArr={subjectArr}
                />
            )}

            <div>
                <ol className="lbt-option__list">
                    <li>
                        <p>1. 학습 기간을 설정해 주세요</p>
                        <div>
                            <DatePicker
                                className="datepicker-base"
                                onChange={(day) => {
                                    setStartDay(day);
                                }}
                                value={startDay}
                                maxDate={new Date()}
                                clearIcon={null}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
                            />
                            ~
                            <DatePicker
                                className="datepicker-base"
                                onChange={(day) => {
                                    setLastDay(day);
                                }}
                                value={lastDay}
                                maxDate={new Date()}
                                clearIcon={null}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
                            />
                            <button className="btn" onClick={optionBtn}>
                                설정
                            </button>
                        </div>
                    </li>
                    <li>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                        <div>
                            {option === false ? (
                                <LbtBookArea>학습 기간을 설정해주세요</LbtBookArea>
                            ) : (
                                <LbtBookCheckbox
                                    option={option}
                                    subjectArr={subjectArr}
                                    setSubjectArr={setSubjectArr}
                                />
                            )}
                        </div>
                    </li>
                </ol>
            </div>

            <div style={{ textAlign: "center" }}>
                <button
                    className="btn"
                    onClick={() => {
                        setOption(false);
                        // setSubjectArr([]);
                    }}
                >
                    초기화
                </button>
                <button className="btn" onClick={createLbt}>
                    생성
                </button>
            </div>
        </div>
    );
}

export default LbtDayOption;
