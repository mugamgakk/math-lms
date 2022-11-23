import dayjs from "dayjs";
import React, { useState, memo } from "react";
import LbtModal from "./modal/LbtModal";
import useStudentsStore from "../../store/useStudentsStore";
import useLbtStore from "../../store/useLbtStore";
import LmsDatePicker from "../../components/LmsDatePicker";

const today = new Date();
const oneMonthAgo = dayjs(today).subtract(1, "M").$d;

const list = ["중2-1 노벰", "중2-2 엑사스", "중2-2 노벰", "중2-1 엑사스"];

const LbtDayOption = memo(({ dataNum }) => {
    let [value, setValue] = useState({
        startDay: oneMonthAgo,
        endDay: today,
        option: false,
        checkList: list,
    });

    let [createModal, setCreateModal] = useState(false);
    let clickStudent = useStudentsStore((state) => state.clickStudent);
    let setCreateInfo = useLbtStore((state) => state.setCreateInfo);

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

    const createLbt = () => {
        if (dataNum > 50) {
            alert("분석표가 최대 50개까지 저장됩니다. (현재 갯수 50개)");
            return;
        }

        if (value.checkList.length === 0) {
            alert("학습 분석표를 생성할 교재를 선택해주세요");
            return;
        }

        let option = {
            name: clickStudent.um_nm,
            age: clickStudent.school_grade,
            date:
                dayjs(value.startDay).format("YYYY.MM.DD") +
                " ~ " +
                dayjs(value.endDay).format("YYYY.MM.DD"),
            book: [...value.checkList],
        };

        if (value.option === false) {
            alert("학습 기간을 설정해 주세요.");
            return;
        }

        setCreateInfo(option);
        setCreateModal(true);
    };

    return (
        <div className="LbtDayOption">
            {createModal && <LbtModal value={value} setCreateModal={setCreateModal} />}

            <div className="option">
                <div className="fa fj" style={{ marginBottom: "20px" }}>
                    <p>1. 학습기간을 설정해 주세요.</p>
                    <div className="fa">
                        <LmsDatePicker
                            onChange={(day) => setValue({ ...value, startDay: day })}
                            maxDate={today}
                            value={value.startDay}
                            style={{ marginRight: "10px" }}
                        />
                        <span style={{ marginRight: "10px" }}>~</span>
                        <LmsDatePicker
                            onChange={(day) => setValue({ ...value, endDay: day })}
                            maxDate={today}
                            value={value.endDay}
                            style={{ marginRight: "10px" }}
                        />
                        <button
                            className="btn-grey"
                            onClick={() => {
                                setValue({ ...value, option: true });
                            }}
                        >
                            설정
                        </button>
                    </div>
                </div>
                <div className="fj" style={{ alignItems: "flex-start" }}>
                    <div>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                        <div style={{marginTop : "54px"}}>
                            <button
                                className="btn-grey mr-10"
                                onClick={() => {
                                    setValue({
                                        ...value,
                                        option: false,
                                        startDay: oneMonthAgo,
                                        endDay: today,
                                    });
                                }}
                            >
                                초기화
                            </button>
                            <button className="btn-green" onClick={createLbt}>
                                생성
                            </button>
                        </div>
                    </div>
                    {value.option === false ? (
                        <p>
                            학습 기간을 설정해 주세요.
                        </p>
                    ) : (
                        <div className="book-list">
                            <div className="title">
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
                            <ul className="book">
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
                </div>

            </div>
        </div>
    );
});

export default LbtDayOption;
