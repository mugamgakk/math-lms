import dayjs from "dayjs";
import React, { useState, memo } from "react";
import LbtModal from "./modal/LbtModal";
import DatePicker from "react-date-picker"; // 데이트 피커
import styled from "styled-components";
import useStudentsStore from "../../store/useStudentsStore";
import useLbtStore from "../../store/useLbtStore";
import LmsDatePicker from "../../components/LmsDatePicker";

const today = new Date();
const oneMonthAgo = dayjs(today).subtract(1, "M").$d;

const Box = styled.div`
    width: 500px;
    height: 70px;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

const list = ["중2-1 노벰", "중2-2 엑사스", "중2-2 노벰", "중2-1 엑사스"];

const LbtDayOption = memo(()=> {
    let [value, setValue] = useState({
        startDay: oneMonthAgo,
        endDay: today,
        option: false,
        checkList: list,
    });

    let [createModal, setCreateModal] = useState(false);
    let clickStudent = useStudentsStore(state=>state.clickStudent);
    let setCreateInfo = useLbtStore(state=>state.setCreateInfo);

    const checkAll = (checked) => {
        if (checked) {
            setValue({ ...value, checkList: list });
        } else {
            setValue({ ...value, checkList: [] });
        }
    };

    const oneCheck = (checked, ele) => {
        if (checked) {
            let copy = { ...value };
            copy.checkList.push(ele);
            setValue(copy);
        } else {
            let result = value.checkList.filter((a) => a !== ele);
            setValue({ ...value, checkList: result });
        }
    };

    const createLbt = ()=>{
        let option = {
            name : clickStudent.um_nm,
            age : clickStudent.school_grade,
            date : dayjs(value.startDay).format("YYYY.MM.DD") + " ~ " +  dayjs(value.endDay).format("YYYY.MM.DD"),
            book : [...value.checkList]
        };

        if(value.option === false){
            alert("학습 기간을 설정해 주세요.");
            return 
        }

        setCreateInfo(option);
        setCreateModal(true);
    }

    return (
        <div>
            {
                createModal && <LbtModal value={value} setCreateModal={setCreateModal}/>
            }
            <ol>
                <li className="fj mb-3">
                    1. 학습기간을 설정해 주세요.
                    <div className="d-flex">
                        <LmsDatePicker
                            onChange={day=> setValue({ ...value, startDay: day })}
                            maxDate={today}
                            value={value.startDay}
                        />
                        ~
                        <LmsDatePicker
                            onChange={day=> setValue({ ...value, endDay: day })}
                            maxDate={today}
                            value={value.endDay}
                        />
                        <button
                            className="btn"
                            onClick={() => {
                                setValue({ ...value, option: true });
                            }}
                        >
                            설정
                        </button>
                    </div>
                </li>
                <li className="fj">
                    2. 학습 분석표를 생성할 교재를 선택해 주세요.
                    {value.option === false ? (
                        <Box>학습 기간을 설정해 주세요.</Box>
                    ) : (
                        <div className="book-list">
                            <div>
                                <label htmlFor="학습한교재">학습한 교재</label>
                                <input
                                    type="checkbox"
                                    id="학습한교재"
                                    checked={list.length === value.checkList.length}
                                    onChange={(e) => {
                                        checkAll(e.target.checked);
                                    }}
                                />
                            </div>
                            <ul>
                                {list.map((a) => {
                                    return (
                                        <li key={a}>
                                            <input
                                                type="checkbox"
                                                id={a}
                                                checked={value.checkList.includes(a)}
                                                onChange={(e) => {
                                                    oneCheck(e.target.checked, a);
                                                }}
                                            />
                                            <label htmlFor={a}>{a}</label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </li>
            </ol>
            <div className="text-center">
                <button
                    className="btn"
                    onClick={() => {
                        setValue({ ...value, option: false, startDay : oneMonthAgo, endDay : today });
                    }}
                >
                    초기화
                </button>
                <button className="btn" onClick={createLbt}>
                    생성
                </button>
            </div>
            <style jsx>
                    {`
                        .book-list{
                            display : flex;
                            padding : 10px;
                            border: 1px solid #dee2e6;
                        }

                        .book-list ul{
                            margin-left : 20px;
                            height : 70px;
                            overflow : auto;
                        }
                    `}
            </style>
        </div>
    );
})

export default LbtDayOption;

