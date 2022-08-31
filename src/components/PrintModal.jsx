import React, { useState } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄

function PrintModal({ closeModal, title = "제목임" }) {
    const printComponent = React.useRef();

    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);

    const checkState = (checked, ele) => {
        if (checked) {
            setCheckData([...checkData, ele]);
        } else {
            setCheckData(checkData.filter((data) => data !== ele));
        }
    };

    return (
        <>
            <div className="modal">
                <div className="dim"></div>
                <div className="printModal cmmnModal">
                    <div className="printModal-head cmmnModal-head">
                        <div className="tit">{title}</div>
                        <button className="close" onClick={() => closeModal(false)}>
                            X
                        </button>
                    </div>
                    <div className="printModal-body cmmnModal-body">
                        <div className="btn-area">
                            <div className="btn-area__left">
                                <button
                                    className={viewState === "question" ? "btn active" : "btn"}
                                    onClick={() => setViewState("question")}
                                >
                                    문제 보기
                                </button>
                                <button
                                    className={viewState === "solution" ? "btn active" : "btn"}
                                    onClick={() => setViewState("solution")}
                                >
                                    풀이 보기
                                </button>
                            </div>
                            <div className="btn-area__right">
                                <button className={"btn" + `${checkData.includes("question") ? " active" : ''}`}>
                                    <input
                                        type="checkbox"
                                        id="question"
                                        checked={checkData.includes("question") ? true : false}
                                        onChange={(e) => {
                                            checkState(e.target.checked, "question");
                                        }}
                                    />
                                    <label htmlFor="question">문제지</label>
                                </button>

                                <button className={"btn" + `${checkData.includes("solution") ? " active" : ''}`}>
                                    <input
                                        type="checkbox"
                                        id="solution"
                                        checked={checkData.includes("solution") ? true : false}
                                        onChange={(e) => {
                                            checkState(e.target.checked, "solution");
                                        }}
                                    />
                                    <label htmlFor="solution">풀이지</label>
                                </button>
                                <ReactToPrint
                                    trigger={() => <button className="btn">인쇄하기</button>}
                                    content={() => printComponent.current}
                                />
                                    <div style={{ display: "none" }}>
                                        <div ref={printComponent}>
                                            {
                                                checkData.includes("question") && <div>문제</div>
                                            }
                                            {
                                                checkData.includes("solution") && <div>정답</div>
                                            }
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="contents">
                            {
                                {
                                    question: <div>문제</div>,
                                    solution: <div>정답</div>,
                                }[viewState]
                            }
                        </div>
                    </div>
                    <div className="printModal-foot cmmnModal-foot">
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrintModal;
