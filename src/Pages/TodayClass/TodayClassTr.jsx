// yeonju
import React, { useState, useEffect } from "react";
import AssessmentModal from "./AssessmentModal";
import AttModal from "./AttModal";
import PrintModal from "../../components/PrintModal";
import Icon from "../../components/Icon";
import { toggleBodyScroll } from "../../methods/methods";
function TodayClassTr({ data }) {
    // 모달 상태 관리
    let [attModal, setAttModal] = useState(false);
    let [assModal, setAssModal] = useState(false);
    let [printModal, closeModal] = useState(false);

    useEffect(() => {
        if (attModal || assModal || printModal) {
            toggleBodyScroll(true);
        } else {
            toggleBodyScroll(false);
        }
    }, [attModal, assModal, printModal]);

    return (
        <>
            <div
                className={`state1 fc br ${
                    data.state1 ? data.state1 == "100%" && "active" : "disabled"
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state1}
            </div>
            <div
                className={`state2 fc br ${
                    data.state2 ? data.state1 == "100%" && "active" : "disabled"
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state2}
            </div>
            <div
                className={`state3 fc br ${
                    data.state3 ? data.state1 == "100%" && "active" : "disabled"
                }`}
                style={{ width: "9.846%", flexDirection: "column" }}
            >
                {data.state3 && (
                    <button
                        className={`playBtn ${data.state3.newplay ? "new" : ""}`}
                        onClick={() => setAssModal(true)}
                    >
                        <Icon icon={"play"} style={{ fontSize: "14px", color: "#444" }} />
                    </button>
                )}
                {data.state3 ? (
                    data.state3?.assessment ? (
                        <div className={data.state1 === "100%" ? "active" : ""}>
                            <button
                                className="asse btn-orange"
                                onClick={() => setAssModal(true)}
                                style={{ fontSize: "14px" }}
                            >
                                <div style={{marginRight : "8px"}}>이해 {data.state3.uds}</div>
                                <div>전달 {data.state3.send}</div>
                            </button>
                        </div>
                    ) : (
                        <button className="btn-table" onClick={() => setAssModal(true)}>
                            수행 평가
                        </button>
                    )
                ) : null}
            </div>
            <div
                className={`state4 fc br ${
                    data.state4 ? data.state1 == "100%" && "active" : "disabled"
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state4}
            </div>
            <div
                className={`state5 fc br ${data.state5 ? "" : "disabled"}`}
                style={{ width: "9.846%" }}
            >
                {data.state5 ? (
                    data.state5 == "Pass" ? (
                        "Pass"
                    ) : (
                        <>
                            <div style={{}}>{data.state5}</div>
                            <button
                                className="btn-table btn-icon"
                                onClick={() => closeModal(true)}
                                style={{ width: "100px" }}
                            >
                                <Icon icon={"print"} style={{ color: "#666" }} />
                                인쇄
                            </button>
                        </>
                    )
                ) : null}
            </div>
            <div className="fc" style={{ width: "11.37%" }}>
                <button className="btn-table" onClick={() => setAttModal(true)}>
                    학습 태도
                </button>
                {attModal ? <AttModal setAttModal={setAttModal} /> : null}
                {assModal ? <AssessmentModal setAssModal={setAssModal} /> : null}
                {printModal ? (
                    <PrintModal
                        title="맞춤 클리닉"
                        closeModal={closeModal}
                        cls_seq={data.cls_seq}
                    />
                ) : null}
            </div>
        </>
    );
}
export default TodayClassTr;
