import dayjs from "dayjs";
import React, { useState, memo } from "react";
import LbtModal from "./modal/LbtModal";
import LbtResultModal from "./modal/LbtResultModal";
import useStudentsStore from "../../store/useStudentsStore";
import Checkbox from "../../components/Checkbox";
import ajax from "../../ajax";
import CustomDatePickerMonth from "../../components/CustomDatePickerMonth";
import { useRef } from "react";
import { useQueryClient } from "react-query";

const today = new Date();

const LbtDayOption = memo(({ lbtListNum }) => {
    let clickStudent = useStudentsStore((state) => state.clickStudent);
    const queryClient = useQueryClient();

    // 날짜
    let [month, setMonth] = useState(today);

    // 생성 모달
    let [createModal, setCreateModal] = useState(false);
    // 결과 모달
    let [resultLbtModal, setResultLbtModal] = useState(false);

    // 학습교재
    let [bookList, setBookList] = useState([]);

    // 체크된 교재
    let [checkList, setCheckList] = useState([]);

    const allCheck = (checked) => {
        checked ? setCheckList(bookList) : setCheckList([]);
    };

    const oneCheck = (checked, ele) => {
        checked
            ? setCheckList([...checkList, ele])
            : setCheckList(checkList.filter((a) => a !== ele));
    };

    const bookOption = async () => {
        const data = {
            mode: "analytics_book",
            sdate: dateFormat().start,
            edate: dateFormat().end,
            usr_seq: clickStudent.usr_seq,
        };

        const res = await ajax("/class_result.php", { data });
        // const res = await axios("/json/detailclass_table_book.json");

        const { bk_list, wrong_list } = res.data;

        setCheckList([...bk_list]);
        setBookList([...bk_list]);
    };

    const dateFormat = () => {
        let obj = {
            start: dayjs(month).format("YYYY-MM") + "-01",
        };

        let a = dayjs(month).format("YYYY-MM");
        let b = dayjs(new Date()).format("YYYY-MM");

        if (a === b) {
            obj.end = dayjs(new Date()).format("YYYY-MM-DD");
        } else {
            obj.end = dayjs(month).format("YYYY-MM") + "-" + dayjs(month).daysInMonth();
        }

        return obj;
    };

    const sendLBTData = {
        clickStudent: clickStudent,
        startDay: dateFormat().start,
        endDay: dateFormat().end,
        checkList,
    };

    let printSeqNum = useRef(0);

    // 생성후 함수
    const afterCraeteModal = () => {
        // 모달 닫기
        setCreateModal(false);

        // 생성후 리스트 데이터 다시 호출
        queryClient.invalidateQueries("analytics_list");

        ajax("/class_result.php", {
            data: {
                mode: "analytics_list",
                usr_seq: clickStudent.usr_seq,
            },
        }).then((res) => {
            console.log(res.data)
            // 새로 생성된 첫번째 데이터 prt_seq
            let createdData = res.data[0];
            printSeqNum.current = createdData.prt_seq;

            // 결과 모달 오픈
            setResultLbtModal(true);
        });
    };

    return (
        <div className="LbtDayOption">
            {createModal && (
                <LbtModal
                    setCreateModal={setCreateModal}
                    sendLBTData={sendLBTData}
                    afterCraeteModal={afterCraeteModal}
                />
            )}

            {/* 학습분석표 결과 */}
            {resultLbtModal && (
                <LbtResultModal
                    setResultLbtModal={setResultLbtModal}
                    printSeq={printSeqNum.current}
                />
            )}

            <div className="option">
                <div className="option-left">
                    <div>
                        <div className="fa" style={{ marginBottom: "18px" }}>
                            <CustomDatePickerMonth
                                value={month}
                                onChange={(day) => {
                                    setMonth(day);
                                    setBookList([]);
                                }}
                                maxDate={today}
                                label={true}
                                className="mr-10"
                                style={{ marginRight: "10px" }}
                            />
                            <button
                                className="btn-grey-border"
                                style={{ width: "70px" }}
                                onClick={bookOption}
                            >
                                설정
                            </button>
                        </div>
                        <div className="option-box">
                            {bookList.length === 0 ? (
                                <p className="option-box-alert">학습 기간을 먼저 설정해 주세요.</p>
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
                                            onChange={(e) => {
                                                allCheck(e.currentTarget.checked);
                                            }}
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
                                                        onChange={(e) => {
                                                            oneCheck(e.currentTarget.checked, ele);
                                                        }}
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
                <div className="option-right">
                    <p>1. 학습 기간을 설정해 주세요.</p>
                    <p>2. 학습 분석표를 생성할 교재를 선택해 주세요. </p>
                    <div>
                        <button
                            className="btn-grey-border mr-10"
                            onClick={() => {
                                setBookList([]);
                            }}
                        >
                            초기화
                        </button>
                        <button
                            className="btn-green"
                            onClick={() => {
                                if (bookList.length === 0) {
                                    alert("학습기간을 설정 후 교재를 선택해주세요");
                                    return;
                                }
                                if (lbtListNum === 50) {
                                    alert(
                                        "종합 학습 분석표는 최대 50개까지 저장 가능합니다. 목륵을 정리해 주세요"
                                    );
                                    return;
                                }
                                setCreateModal(true);
                            }}
                        >
                            생성
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default LbtDayOption;
