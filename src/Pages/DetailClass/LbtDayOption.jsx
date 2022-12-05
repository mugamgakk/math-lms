import dayjs from "dayjs";
import React, { useState, memo } from "react";
import LbtModal from "./modal/LbtModal";
import useStudentsStore from "../../store/useStudentsStore";
import Checkbox from "../../components/Checkbox";
import ajax from "../../ajax";
import CustomDatePicker from "../../components/CustomDatePicker";

const today = new Date();
const oneMonthAgo = dayjs(today).subtract(1, "M").$d;

const LbtDayOption = memo(() => {
    let clickStudent = useStudentsStore((state) => state.clickStudent);
    // 날짜
    let [startDay, setStartDay] = useState(oneMonthAgo);
    let [endDay, setEndDay] = useState(today);

    // 생성 모달
    let [createModal, setCreateModal] = useState(false);

    // 학습교재
    let [bookList, setBookList] = useState([]);

    let [checkList, setCheckList] = useState([]);

    const allCheck = (checked)=>{
        checked ? setCheckList(bookList) : setCheckList([]);
    }

    const oneCheck = (checked, ele)=>{
        checked ? setCheckList([...checkList , ele]) : setCheckList(checkList.filter(a=> a !== ele));
    }

    const bookOption = async () => {
        const data = {
            mode: "analytics_book",
            sdate: dayjs(startDay).format("YYYY-MM-DD"),
            edate: dayjs(endDay).format("YYYY-MM-DD"),
            usr_seq: clickStudent.usr_seq,
        };

        // console.log(data);

        const res = await ajax("/class_result.php", { data });

        const { bk_list, wrong_list } = res.data;

        setCheckList([...bk_list]);
        setBookList([...bk_list]);
    };

    return (
        <div className="LbtDayOption">
            {createModal && <LbtModal setCreateModal={setCreateModal} />}

            <div className="option">
                <div className="fa fj" style={{ marginBottom: "20px" }}>
                    <p>1. 학습기간을 설정해 주세요.</p>
                    <div className="fa">
                        <CustomDatePicker
                            value={startDay}
                            onChange={(day) => setStartDay(day)}
                            maxDate={new Date()}
                            minDate={dayjs(new Date()).subtract(1, "M").$d}
                        />
                        <span className="water">~</span>
                        <CustomDatePicker
                            value={endDay}
                            onChange={(day) => setEndDay(day)}
                            className="mr-10"
                            maxDate={new Date()}
                            minDate={dayjs(new Date()).subtract(1, "M").$d}
                        />
                        <button className="btn-grey" onClick={bookOption}>
                            설정
                        </button>
                    </div>
                </div>
                <div className="fj" style={{ alignItems: "flex-start" }}>
                    <div>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                        <div style={{ marginTop: "54px" }}>
                            <button
                                className="btn-grey mr-10"
                                onClick={() => {
                                    setBookList([]);
                                }}
                            >
                                초기화
                            </button>
                            <button className="btn-green">생성</button>
                        </div>
                    </div>
                    {bookList.length === 0 ? (
                        <p>학습 기간을 설정해 주세요.</p>
                    ) : (
                        <div className="book-list">
                            <div className="title">
                                <label htmlFor="학습한교재" className="mr-10">
                                    학습한 교재
                                </label>
                                <Checkbox
                                    id="학습한교재"
                                    color="orange"
                                    checked={checkList.length === bookList.length}
                                    onChange={(e)=>{ allCheck(e.currentTarget.checked) }}
                                />
                            </div>
                            <ul className="book">
                                {bookList.map((ele) => {
                                    return (
                                        <li key={ele.bk_cd}>
                                            <Checkbox
                                                type="checkbox"
                                                color="orange"
                                                id={ele.bk_cd}
                                                className="mr-10"
                                                checked={checkList.includes(ele)}
                                                onChange={e=>{ oneCheck(e.currentTarget.checked, ele) }}
                                            />
                                            <label htmlFor={ele.bk_cd}>{ele.bk_name}</label>
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
