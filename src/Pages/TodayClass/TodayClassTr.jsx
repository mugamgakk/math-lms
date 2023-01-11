// yeonju
import React, { useState, useEffect } from "react";
import AssessmentModal from "./AssessmentModal";
import AttModal from "./AttModal";
import PrintModal_clinic from "../../components/PrintModal_clinic";
import Icon from "../../components/Icon";
import { toggleBodyScroll } from "../../methods/methods";
import styled from "styled-components";
import ResultPopMoal from "../DetailClass/modal/ResultPopModal";

const HoverOrange = styled.span`
    font-weight: 400;
    color: #444;
    cursor: pointer;
    &:hover{
        color : #ea7851
    }
`

function TodayClassTr({ data, bookTit }) {
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
                    data.state1.status === 1
                        ? "active"
                        : data.state1.status === -1
                        ? "disabled"
                        : ""
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state1.per}
            </div>
            <div
                className={`state2 fc br ${
                    data.state2.status === 1
                        ? "active"
                        : data.state2.status === -1
                        ? "disabled"
                        : ""
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state2.per}
            </div>
            {data.state3.status == -1 ? (
                <div
                    className="state3 disabled fc br"
                    style={{ width: "9.846%", flexDirection: "column" }}
                ></div>
            ) : (
                <div
                    className={`state3 fc br ${data.state3.status === 1 ? "active" : ""}`}
                    style={{ width: "9.846%", flexDirection: "column" }}
                >
                    {data.state3.audio ? (
                        <button
                            className={`playBtn ${data.state3.new ? "new" : ""}`}
                            onClick={() => setAssModal(true)}
                        >
                            <Icon icon={"play"} style={{ fontSize: "14px", color: "#444" }} />
                        </button>
                    ) : (
                        <button className="playBtn disabled" style={{ cursor: "default" }}>
                            <Icon icon={"play"} style={{ fontSize: "14px", color: "#ccc" }} />
                        </button>
                    )}
                    {data.state3.assessment ? (
                        <div>
                            <button
                                className="asse btn-table-orange"
                                onClick={() => setAssModal(true)}
                                style={{ fontSize: "14px" }}
                            >
                                <div>이해 {data.state3.uds}</div>
                                <div>전달 {data.state3.send}</div>
                            </button>
                        </div>
                    ) : (
                        <button className="btn-table" onClick={() => setAssModal(true)}>
                            수행 평가
                        </button>
                    )}
                </div>
            )}

            <div
                className={`state4 fc br ${
                    data.state4.status === 1
                        ? "active"
                        : data.state4.status === -1
                        ? "disabled"
                        : ""
                }`}
                style={{ width: "9.846%" }}
            >
                {/* <ResultPopMoal/> */}
                <HoverOrange>{data.state4.per}</HoverOrange>
            </div>

            <div
                className={`state4 fc br f-column ${
                    data.state5.status === 1
                        ? "active"
                        : data.state5.status === -1
                        ? "disabled"
                        : ""
                }`}
                style={{ width: "9.846%" }}
            >
                {data.state5.per}
                {data.state5.per?.includes("/") && (
                    <button
                        className="btn-table-orange-border btn-icon"
                        onClick={() => closeModal(true)}
                    >
                        <Icon icon={"print"} />
                        인쇄
                    </button>
                )}
            </div>

            <div
                className={`fc ${
                    data.tedo.status === 1 ? "active" : data.tedo.status === -1 ? "disabled" : ""
                }`}
                style={{ width: "11.37%" }}
            >
                <button
                    className={data.tedo.active ? "btn-table-orange" : "btn-table"}
                    onClick={() => setAttModal(true)}
                >
                    학습 태도
                </button>
                {attModal && <AttModal setAttModal={setAttModal} />}
                {assModal && <AssessmentModal closeModal={setAssModal} />}
                {printModal && (
                    <PrintModal_clinic
                        title="맞춤 클리닉"
                        closeModal={closeModal}
                        cls_seq={data.cls_seq}
                    />
                )}
            </div>
        </>
    );
}
export default TodayClassTr;
