import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import DatePicker from "react-date-picker"; // 데이트 피커
import { useMemo } from 'react';
import LbtModal from './modal/LbtModal';

let LbtBookArea = styled.div`
    width: 100%;
    height: 100px;
    line-height: 100px;
    border: 1px solid #ddd;
    text-align: center;
    margin-top: 10px;
`;

const 과목 = ["수학", "영어", "도덕", "체육", "미술", "김치"];



function LbtDayOption() {

    let oneMonthAgo = useMemo(()=>{
        var now = new Date();
        var oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return oneMonthAgo
    },[])

    let [startDay, setStartDay] = useState(oneMonthAgo),
        [lastDay, setLastDay] = useState(new Date()),
        [subjectArr, setSubjectArr] = useState([]),
        [option, setOption] = useState(false)

    let [modal, setModal] = useState(false);
    let [modalState, setModalState] = useState();



    useEffect(() => {
        if (option) {
            let arr = [];

            과목.forEach((a) => {
                arr.push(a);
            });

            setSubjectArr(arr);
        }
    }, [option]);
    

    const checkedAll = (checked) => {
        if (checked) {
            setSubjectArr([...과목]);
        } else {
            setSubjectArr([]);
        }
    };

    const checkedOne = (checked, book) => {
        if (checked) {
            setSubjectArr([...subjectArr, book]);
        } else {
            setSubjectArr(subjectArr.filter((ele) => ele !== book));
        }
    };


    const optionBtn = () => {
        if (startDay !== "" && lastDay !== "") {
            setOption(true);
        }
    };


    return ( 
        <div className="lbt-option">
                {modal && <LbtModal setModal={setModal} modalState={modalState} />}

                <div className="row">
                    <div className="left">
                        <p>1. 학습 기간을 설정해 주세요</p>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                    </div>
                    <div className="right">
                        <DatePicker
                            className="datepicker-base"
                            onChange={(day)=>{setStartDay(day)}}
                            value={startDay}
                            maxDate={new Date()}
                            clearIcon={null}
                            openCalendarOnFocus={false}
                            format={"yyyy-MM-dd"}
                        />
                        ~
                        <DatePicker
                            className="datepicker-base"
                            onChange={(day)=>{setLastDay(day)}}
                            value={lastDay}
                            maxDate={new Date()}
                            clearIcon={null}
                            openCalendarOnFocus={false}
                            format={"yyyy-MM-dd"}
                        />
                        <button className="btn" onClick={optionBtn}>
                            설정
                        </button>
                        {option === false ? (
                            <LbtBookArea>학습 기간을 설정해주세요</LbtBookArea>
                        ) : (
                            <div className="lbt-bookarea">
                                <div key={"과목 전체"}>
                                    <label htmlFor={"과목 전체"}>{"과목 전체"}</label>
                                    <input
                                        type="checkbox"
                                        id={"과목 전체"}
                                        checked={subjectArr.length === 과목.length ? true : false}
                                        onChange={(e) => {
                                            checkedAll(e.target.checked);
                                        }}
                                    />
                                </div>

                                {과목.map((book) => {
                                    return (
                                        <div key={book}>
                                            <label htmlFor={book}>{book}</label>
                                            <input
                                                type="checkbox"
                                                id={book}
                                                onChange={(e) => {
                                                    checkedOne(e.target.checked, book);
                                                }}
                                                checked={subjectArr.includes(book) ? true : false}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button
                        className="btn"
                        onClick={() => {
                            setOption(false);
                            setSubjectArr([]);
                        }}
                    >
                        초기화
                    </button>
                    <button className="btn"
                    onClick={()=>{
                        setModal(true);
                        setModalState("생성")
                    }}
                    >생성</button>
                </div>
            </div>
     );
}

export default LbtDayOption;