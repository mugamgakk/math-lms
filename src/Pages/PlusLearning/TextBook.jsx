import React, { useState } from "react";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import Icon from "../../components/Icon";
import SelectBase from "../../components/ui/select/SelectBase";
import CustomDatePicker from "../../components/CustomDatePicker";
import Checkbox from "../../components/Checkbox";
import PlusLearningGradingTextBookModal from "./PlusLearningGradingTextBookModal";
import PrintModal from "../../components/PrintModal_clinic";

const data = [
    {
        id: 1,
        교과서: "교학사",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 }
    },
    {
        id: 2,
        교과서: "금성",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 }
    },
    {
        id: 3,
        교과서: "동아(강)",
        대단원: "1. 수와 식",
        소단원: "1. 유리수와 순환소수",
        상태: "학습완료",
        채점: { totalScore: 25, score: 8, point: "64점", 재응시: 2 }
    }
];

const studyBook = [
    { value: "교과서 (전체)", label: "교과서 (전체)" },
    { value: "교학사", label: "교학사" },
    { value: "금성", label: "금성" },
    { value: "동아(강)", label: "동아(강)" },
    { value: "동아(박)", label: "동아(박)" },
    { value: "미래엔", label: "미래엔" },
    { value: "비상", label: "비상" },
    { value: "신사고", label: "신사고" },
    { value: "지학사", label: "지학사" },
    { value: "천재(류)", label: "천재(류)" },
    { value: "천재(이)", label: "천재(이)" }
];

const studyState = [
    { value: "오픈전", label: "오픈전" },
    { value: "학습 중", label: "학습 중" },
    { value: "학습 완료", label: "학습 완료" }
]


function TextBook() {
    const clickStudent = useStudentsStore(state => state.clickStudent)
    let [plusData, setPlusData] = useState(data);
    let [selectBook, setSelectBook] = useState(studyBook[0]);
    let [selectState, setSelectState] = useState();
    let [startDay, setStartDay] = useState(new Date());
    let [endDay, setEndDay] = useState(new Date());


    return (
        <div>
            <UserInfo clickStudent={clickStudent} />
            <div className="fj" style={{ margin: "20px 0" }}>
                <p className="text-alert">
                    ※ 학습하는 교재의 학년 , 학기에 해당하는 교과서별 내신적중 를 오픈 , 출력할 수
                    있습니다 학년 학기별 공통
                    <br />
                    ※ 기간을 설정하여 결과 리포트를 인쇄할 수 있습니다. (저장되지 않음)
                </p>
                <button className="btn-grey btn-icon"><Icon icon={"reload"} /> 조회 초기화</button>
            </div>

            <div className="fj">
                <div>
                    <button className="btn-grey-border mr-10">선택 오픈</button>
                    <button className="btn-grey-border mr-10">선택 인쇄</button>
                    <button className="btn-green mr-10">결과 리포트</button>
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
                        onChange={(day) => { setStartDay(day) }}
                        label={true}
                    />
                    <span className="water">
                        ~
                    </span>
                    <CustomDatePicker
                        value={endDay}
                        width="130px"
                        onChange={(day) => { setEndDay(day) }}
                        label={true}
                        className="mr-10"
                    />
                    <button className='btn-grey'>조회</button>
                </div>
            </div>

            <table className='table tableA TextBook-table' style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th style={{ width: "8%" }}><Checkbox /> 선택</th>
                        <th style={{ width: "10%" }}>교과서</th>
                        <th style={{ width: "12%" }}>대단원</th>
                        <th style={{ width: "20%" }}>소단원</th>
                        <th style={{ width: "16.66666%" }}>상태</th>
                        <th style={{ width: "16.66666%" }}>채점</th>
                        <th style={{ width: "16.66666%" }}>시험지</th>
                    </tr>
                </thead>
                <tbody className="scroll">
                    {plusData.map((res,i) => {
                        return <Tr ele={res} key={i} />
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ ele }) => {

    let [modal, setModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    return (
        <tr>
            <td style={{ width: "8%" }}><Checkbox /></td>
            <td style={{ width: "10%" }}>{ele.교과서}</td>
            <td style={{ width: "12%" }}>{ele.대단원}</td>
            <td style={{ width: "20%" }}>{ele.소단원}</td>
            <td style={{ width: "16.66666%" }}> <button className="btn-table">{ele.상태}</button> </td>
            <td style={{ width: "16.66666%" }}>
                <div className="text-center">
                    <p> {ele.채점.point} ({ele.채점.score}/{ele.채점.totalScore}) </p>
                    <button className="btn-table mb-5">재응시({ele.채점.재응시})</button>
                    <button className="btn-table" onClick={() => { setModal(!modal) }}>채점하기</button>
                    {
                        modal && <PlusLearningGradingTextBookModal setModal={setModal} />
                    }
                </div>
            </td>
            <td style={{ width: "16.66666%" }}>
                {
                    printModal && <PrintModal title="교과서 적중문제" closeModal={setPrintModal}/>
                }
                <button className="btn-table" onClick={()=>{setPrintModal(true)}}>인쇄</button>
                </td>
        </tr>
    )
}

export default TextBook;
