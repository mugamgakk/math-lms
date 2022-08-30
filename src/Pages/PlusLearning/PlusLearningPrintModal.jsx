import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

function PlusLearningPrintModal({ res, setPrintModal }) {
    let { clickStudent } = useSelector((state) => state.plusLearningSlice);
    let [tab, setTab] = useState("problem");
    let [checkTab, setCheckTab] = useState(["problem"]);
    const printComponent = useRef();

    const checkboxToggle = (param) => {
        if (checkTab.includes(param)) {
            setCheckTab(checkTab.filter((a) => a !== param));
        } else {
            setCheckTab([...checkTab, param]);
        }
    };

    return (
        <div className="PlusLearningPrintModal">
            <div className="modal">
                <header className="fj">
                    <h4>
                        [서술형 따라잡기] {clickStudent.name} {res.대단원} {res.주제}
                    </h4>
                    <button className="btn" onClick={()=>{setPrintModal(false)}}>x</button>
                </header>
                <div className="contents">
                    <div className="fj">
                        <div className="problem-btn">
                            <button
                                type="button"
                                onClick={() => {
                                    setTab("problem");
                                }}
                                className={"btn " + `${tab === "problem" ? "active" : ""}`}
                            >
                                문제 보기
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setTab("answer");
                                }}
                                className={"btn " + `${tab === "answer" ? "active" : ""}`}
                            >
                                모범 답안 보기
                            </button>
                        </div>
                        <div className="print-btn">
                            <button
                                onClick={() => {
                                    checkboxToggle("problem");
                                }}
                                className={
                                    "btn " + `${checkTab.includes("problem") ? "active" : ""}`
                                }
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        checkboxToggle("problem");
                                    }}
                                    checked={checkTab.includes("problem") ? true : false}
                                />
                                문제지
                            </button>
                            <button
                                onClick={() => {
                                    checkboxToggle("answer");
                                }}
                                className={
                                    "btn " + `${checkTab.includes("answer") ? "active" : ""}`
                                }
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        checkboxToggle("answer");
                                    }}
                                    checked={checkTab.includes("answer") ? true : false}
                                />
                                모범 답안
                            </button>

                            <ReactToPrint
                                trigger={() => <button className="btn">인쇄하기</button>}
                                content={() => printComponent.current}
                            />
                        </div>
                    </div>

                    {/* 보기  */}
                    {
                        {
                            problem: <div>문제지 입니동</div>,
                            answer: <div>답안지 입니동</div>,
                        }[tab]
                    }

                    {/* 인쇄 */}
                    <div className="d-none">
                        <div ref={printComponent}>

                            {checkTab.includes("problem") && <div>문제지 입니동</div>}
                            {checkTab.includes("answer") && <div>답안지 입니동</div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlusLearningPrintModal;
