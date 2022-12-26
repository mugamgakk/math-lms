import React, { useState } from "react";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import Icon from "../../components/Icon";
import SelectBase from "../../components/ui/select/SelectBase";
import CustomDatePicker from "../../components/CustomDatePicker";
import Checkbox from "../../components/Checkbox";
import PlusLearningGradingTextBookModal from "./PlusLearningGradingTextBookModal";
import PrintModal from "../../components/PrintModal_clinic";
import ReportModal from "./ReportModal";
import ajax from "../../ajax";
import dayjs from "dayjs";
import { useEffect } from "react";

const data = [
    {
        id: 1,
        교과서: "교학사",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 },
        tb_seq: 124,
    },
    {
        id: 2,
        교과서: "금성",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 },
        tb_seq: 254,
    },
    {
        id: 3,
        교과서: "동아(강)",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 },
        tb_seq: 322,
    },
];

const studyBook = [
    { value: null, label: "교과서 (전체)" },
    { value: "H", label: "교학사" },
    { value: "G", label: "금성" },
    { value: "K", label: "동아(강)" },
    { value: "P", label: "동아(박)" },
    { value: "M", label: "미래엔" },
    { value: "V", label: "비상" },
    { value: "S", label: "신사고" },
    { value: "J", label: "지학사" },
    { value: "R", label: "천재(류)" },
    { value: "L", label: "천재(이)" },
    { value: "C", label: "천재교육" },
];

const studyState = [
    { value: null, label: "상태" },
    { value: "P", label: "오픈전" },
    { value: "S", label: "학습 중" },
    { value: "C", label: "학습 완료" },
];

function TextBook() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [plusData, setPlusData] = useState(null);

    let [selectBook, setSelectBook] = useState(studyBook[0]);
    let [selectState, setSelectState] = useState(studyState[0]);

    let [startDay, setStartDay] = useState(new Date());
    let [endDay, setEndDay] = useState(new Date());

    let [reportModal, setReportModal] = useState(false);

    const getData = async () => {
        const data = {
            mode: "tb_list",
            usr_seq: clickStudent.usr_seq,
            qstatus: selectState.value,
            qtb: selectBook.value,
            sdate: dayjs(startDay).format("YYYY-MM-DD"),
            edate: dayjs(endDay).format("YYYY-MM-DD"),
        };

        let res = await ajax("/class_plus.php", { data });

        setPlusData(res.data.tb_list);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <UserInfo clickStudent={clickStudent} />

            {reportModal && <ReportModal setModal={setReportModal} />}

            <div className="fj" style={{ margin: "20px 0" }}>
                <p className="text-alert">
                    ※ 학습하는 교재의 학년 , 학기에 해당하는 교과서별 내신적중 를 오픈 , 출력할 수
                    있습니다 학년 학기별 공통
                    <br />※ 기간을 설정하여 결과 리포트를 인쇄할 수 있습니다. (저장되지 않음)
                </p>
                <button className="btn-grey btn-icon">
                    <Icon icon={"reload"} /> 조회 초기화
                </button>
            </div>

            <div className="fj">
                <div>
                    <button className="btn-grey-border mr-10">선택 오픈</button>
                    <button className="btn-grey-border mr-10">선택 인쇄</button>
                    <button
                        className="btn-green mr-10"
                        onClick={() => {
                            setReportModal(true);
                        }}
                    >
                        결과 리포트
                    </button>
                    <SelectBase
                        onChange={(ele) => {
                            setSelectBook(ele);
                        }}
                        width="130px"
                        options={studyBook}
                        value={selectBook}
                        className="mr-10"
                    />
                    <SelectBase
                        onChange={(ele) => {
                            setSelectState(ele);
                        }}
                        width="130px"
                        options={studyState}
                        value={selectState}
                        defaultValue="상태"
                    />
                </div>

                <div className="fa">
                    <CustomDatePicker
                        value={startDay}
                        width="130px"
                        onChange={(day) => {
                            setStartDay(day);
                        }}
                        label={true}
                    />
                    <span className="water">~</span>
                    <CustomDatePicker
                        value={endDay}
                        width="130px"
                        onChange={(day) => {
                            setEndDay(day);
                        }}
                        label={true}
                        className="mr-10"
                    />
                    <button className="btn-grey">조회</button>
                </div>
            </div>

            <table className="table tableA TextBook-table" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th style={{ width: "8%" }}>
                            <Checkbox /> 선택
                        </th>
                        <th style={{ width: "10%" }}>교과서</th>
                        <th style={{ width: "12%" }}>대단원</th>
                        <th style={{ width: "20%" }}>소단원</th>
                        <th style={{ width: "16.66666%" }}>상태</th>
                        <th style={{ width: "16.66666%" }}>채점</th>
                        <th style={{ width: "16.66666%" }}>시험지</th>
                    </tr>
                </thead>
                <tbody className="scroll">
                    {plusData?.map((ele, i) => {
                        return <Tr ele={ele} key={i} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ ele }) => {
    console.log(ele);

    let [modal, setModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    // 오픈 취소
    const plusClose = async ()=>{
        let res = await ajax("/class_plus.php", {data : {
            mode : "tb_close",
            arr_tb_seq : [ele.tb_seq]
        }});
    }

    // 재응시
    const plusRetry = async ()=>{
        let res = await ajax("/class_plus.php", {data : {
            mode : "tb_retry",
            arr_tb_seq : [ele.tb_seq]
        }});
    }

    return (
        <tr>
            <td style={{ width: "8%" }}>
                <Checkbox />
            </td>
            <td style={{ width: "10%" }}>{ele.tb_name}</td>
            <td style={{ width: "12%" }}>{ele.ltitle}</td>
            <td style={{ width: "20%" }}>{ele.utitle}</td>
            <td style={{ width: "16.66666%" }}>
                <div className="text-center">
                {
                    {
                        P: "오픈전",
                        S: "학습중",
                        C: "완료",
                    }[ele.tb_status]
                }
                <div>
                <button className="btn-table" onClick={plusClose}>오픈 취소</button>
                </div>
                </div>
            </td>
            <td style={{ width: "16.66666%" }}>
                <div className="text-center">
                    <p>
                        {ele.tb_per_score}점 ({ele.tb_std_score}/{ele.tb_max_score})
                    </p>
                    <button className="btn-table mb-5" onClick={plusRetry}>재응시</button>
                    <button
                        className="btn-table"
                        onClick={() => {
                            setModal(!modal);
                        }}
                    >
                        채점하기
                    </button>
                    {modal && (
                        <PlusLearningGradingTextBookModal setModal={setModal} tb_seq={ele.tb_seq} />
                    )}
                </div>
            </td>
            <td style={{ width: "16.66666%" }}>
                {printModal && <PrintModal title="교과서 적중문제" closeModal={setPrintModal} />}
                <button
                    className="btn-table"
                    onClick={() => {
                        setPrintModal(true);
                    }}
                >
                    인쇄
                </button>
            </td>
        </tr>
    );
};

export default TextBook;
