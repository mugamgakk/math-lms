import React from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import DatePicker from "react-date-picker";
import { useState } from "react";
import styled from "styled-components";
import { useCallback } from "react";
import { memo } from "react";
import Icon from "../../components/Icon";
import CustomDatePicker from "../../components/CustomDatePicker";

const Btn = styled.button`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #664e3d;
    background-color : #fff;
    color : #664e3d;
    font-weight : 600;
    margin-right : 17.5px;

    &:last-child{
        margin-right : 0;
    }

    &.active{
        color : #fa4646;
        border-color : #fa4646;
        position : relative;
        background-color : #fedada;
        box-shadow : 0px 0px 0px 3px #fedada;
    }


`;

const data = [];
for (let i = 0; i < 30; i++) {
    data[i] = { id: i + 1, 정답: Math.floor(Math.random() * 5) + 1, 학생답: null };
}

data[16].정답 = [1, 2, 3];
data[16].학생답 = [];

const 학년 = [
    "초등 2학년",
    "초등 3학년",
    "초등 4학년",
    "초등 5학년",
    "초등 6학년",
    "중등 1학년",
    "중등 2학년",
    "중등 3학년",
];

function ResultSave({ setModal }) {
    let [result, setResult] = useState([data.slice(0, 10), data.slice(10, 20), data.slice(20, 30)]);
    let [info, setInfo] = useState({
        resDay: new Date(),
        name: "",
        school: "",
        call: "",
        grade: "",
        semester: "",
    });

    const checkResult = useCallback((테이블인덱스, 배열인덱스, 답) => {
        // console.log(테이블인덱스, 배열인덱스, 답)

        let copyArr = [...result];
        // console.log(copyArr);

        if (Array.isArray(답)) {
            let 기존값 = copyArr[테이블인덱스][배열인덱스].학생답;

            if (기존값.includes(...답)) {
                copyArr[테이블인덱스][배열인덱스].학생답 = 기존값.filter((a) => a !== 답[0]);
            } else {
                copyArr[테이블인덱스][배열인덱스].학생답 = [...기존값, ...답];
            }
        } else {
            let 기존값 = copyArr[테이블인덱스][배열인덱스].학생답;
            if (기존값 === 답) {
                copyArr[테이블인덱스][배열인덱스].학생답 = null;
            } else {
                copyArr[테이블인덱스][배열인덱스].학생답 = 답;
            }
        }

        setResult(copyArr);
    }, []);

    return (
        <div className="modal">
            <div className="modal-content" style={{ width: "1200px" }}>
                <div className="modal-header">
                    <h2 className="modal-title">진단평가 결과 등록</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body" style={{ padding: "35px" }}>
                    <table className="table-base result-reg-list">
                        <tbody>
                            <tr>
                                <th colSpan={2}>예약 명단</th>
                                <td colSpan={6} style={{ textAlign: "left" }}>
                                    <CustomDatePicker
                                        onChange={(el) => {
                                            setInfo({ ...info, resDay: el });
                                        }}
                                        value={info.resDay}
                                        style={{marginRight : "20px"}}
                                    />
                                    <SelectBase defaultValue="이름" width={"200px"} />
                                </td>
                            </tr>
                            <tr>
                                <th>학생명</th>
                                <td>
                                    <input type="text" className="textInput" />
                                </td>
                                <th>학교</th>
                                <td>
                                    <input type="text" className="textInput" />
                                </td>
                                <th>학년</th>
                                <td>
                                    <SelectBase/>
                                </td>
                                <th>평가일</th>
                                <td>
                                    <CustomDatePicker
                                    label={true}/>
                                </td>
                            </tr>
                            <tr>
                                <th>평가지</th>
                                <td style={{textAlign : "left"}} colSpan={3}>
                                    <SelectBase defaultValue="학년" width="150px"/>
                                    <SelectBase defaultValue="학기" width="150px"/>
                                </td>
                                <th>연락처</th>
                                <td colSpan={3}><input type="text" className="textInput" /></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="fj">
                        {result.map((a, arrIndex) => {
                            return (
                                <Table
                                    tableList={a}
                                    result={result}
                                    key={arrIndex}
                                    checkResult={checkResult}
                                    arrIndex={arrIndex}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="modal-footer">
                <button
                            className="btn-grey-border mr-10"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            취소
                        </button>
                        <button
                            className="btn-orange"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "입력한 답안을 모두 확인하세요. 완료하시겠습니까?"
                                    )
                                ) {
                                    setModal(false);
                                    // modal(false)
                                }
                            }}
                        >
                            입력완료
                        </button>
                        
                </div>
            </div>
        </div>
    );
}

const Table = memo(({ tableList, checkResult, arrIndex }) => {
    return (
        <table className="table-base result-list-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>정답</th>
                    <th>학생 답</th>
                </tr>
            </thead>
            <tbody>
            {tableList.map((dd, index) => {
                    return (
                        <tr key={dd.id}>
                            <td>{dd.id}</td>
                            <td>{Array.isArray(dd.정답) ? dd.정답.join(", ") : <Btn>{dd.정답}</Btn> }</td>
                            <td className="result-button">
                                    {
                                        Array.isArray(dd.정답)
                                        ? (
                                            <>
                                                <Btn className={dd.학생답?.includes(1) ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, [1])}}>1</Btn>
                                                <Btn className={dd.학생답?.includes(2) ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, [2])}}>2</Btn>
                                                <Btn className={dd.학생답?.includes(3) ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, [3])}}>3</Btn>
                                                <Btn className={dd.학생답?.includes(4) ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, [4])}}>4</Btn>
                                                <Btn className={dd.학생답?.includes(5) ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, [5])}}>5</Btn>
                                            </>
                                        )
                                        : (<>
                                            <Btn className={dd.학생답 === 1 ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, 1)}}>1</Btn>
                                            <Btn className={dd.학생답 === 2 ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, 2)}}>2</Btn>
                                            <Btn className={dd.학생답 === 3 ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, 3)}}>3</Btn>
                                            <Btn className={dd.학생답 === 4 ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, 4)}}>4</Btn>
                                            <Btn className={dd.학생답 === 5 ? "active" : ""} onClick={()=>{checkResult(arrIndex ,index, 5)}}>5</Btn>
                                    </>
                                        )
                                    }
                                    
                                </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
});

export default ResultSave;
