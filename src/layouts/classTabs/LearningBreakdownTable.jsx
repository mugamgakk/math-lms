import React, { useEffect, useState } from "react";
import LbtModal from "../../components/ui/modal/LbtModal";
import styled from "styled-components";

let LbtBookArea = styled.div`
    width: 100%;
    height: 100px;
    line-height: 100px;
    border: 1px solid #ddd;
    text-align: center;
    margin-top: 10px;
`;

const 과목 = ["수학", "영어", "도덕", "체육", "미술", "김치"];

function LearningBreakdownTable() {
    let [modal, setModal] = useState(false);
    let [startDay, setStartDay] = useState("");
    let [lastDay, setLastDay] = useState("");
    let [option, setOption] = useState(false);
    let [subjectArr, setSubjectArr] = useState([]);

    useEffect(() => {
        if (option) {
            let arr = [];

            과목.forEach((a) => {
                arr.push(a);
            });

            setSubjectArr(arr);
        }
    }, [option]);

    const optionBtn = () => {
        if (startDay !== "" && lastDay !== "") {
            setOption(true);
        }
    };

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

    return (
        <div>
            {modal && <LbtModal setModal={setModal} />}

            <div className="lbt-option">
                <div className="row">
                    <div className="left">
                        <p>1. 학습 기간을 설정해 주세요</p>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                    </div>
                    <div className="right">
                        <input
                            type={"date"}
                            className="form-control"
                            onChange={(e) => {
                                setStartDay(e.target.value);
                            }}
                        />
                        ~
                        <input
                            type={"date"}
                            className="form-control"
                            onChange={(e) => {
                                setLastDay(e.target.value);
                            }}
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
                        }}
                    >
                        초기화
                    </button>
                    <button className="btn">생성</button>
                </div>
            </div>

            <button className="btn">선택 삭제</button>
            <p>[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다</p>

            <table>
                <colgroup>
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>학습기간</th>
                        <th>분석표 생성일</th>
                        <th>학습한 교재</th>
                        <th>생성자</th>
                        <th>학습 분석표</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectArr.map((a) => {
                        return (
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>2022-06-12 ~ 2022-07-25</td>
                                <td>2021-07-02</td>
                                <td>중2-1 노벰, 중2-2 엑사스</td>
                                <td>김교사</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    >
                                        보기
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LearningBreakdownTable;
