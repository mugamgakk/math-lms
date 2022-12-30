// yeonju
import React, { useState, useEffect } from "react";
import AssessmentModal from "./AssessmentModal";
import AttModal from "./AttModal";
import PrintModal_clinic from "../../components/PrintModal_clinic";
import Icon from "../../components/Icon";
import { toggleBodyScroll } from "../../methods/methods";
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

    console.log(bookTit)
    return (
        <>
            <div className={`state1 fc br ${data.state1 ? 'active' : 'disabled'}`} style={{ width: "9.846%" }}>{data.state1}</div>
            <div className={`state2 fc br ${bookTit.includes('아르케') ? 'disabled' : (data.state2 ? 'active' : 'disabled')}`} style={{ width: "9.846%" }}>{data.state2}</div>
            <div className={`state3 fc br ${data.state3 ? 'active' : ''}`} style={{ width: "9.846%", flexDirection: "column" }}>
                {data.state3 && (
                    <button
                        className={`playBtn ${data.state3.newplay ? "new" : ""}`}
                        onClick={() => setAssModal(true)}
                    >
                        <Icon icon={"play"} style={{ fontSize: "14px", color: "#444" }} />
                    </button>
                )}
                {
                    data.state3?.assessment ? (
                        <div>
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
                }
            </div>
            <div className={`state4 fc br ${data.state4 ? 'active' : ''}`} style={{ width: "9.846%" }}>
                {data.state4}
            </div>
         
            {
                bookTit.includes('아르케') ? (
                    <div className='state5 fc br disabled' style={{ width: "9.846%" }}></div>
                ) : (
                    <>
                    {
                        data.state5 == 'Pass' ? (
                            <div className='state5 fc br active' style={{ width: "9.846%" }}>
                                <div>Pass</div>
                            </div>
                        ) : (
                            <div className='state5 fc br' style={{ width: "9.846%" }}>
                                <div>{data.state5}</div>
                                <button
                                    className="btn-table btn-icon"
                                    onClick={() => closeModal(true)}
                                    style={{ width: "100px" }} >
                                    <Icon icon={"print"} style={{ color: "#666" }} />
                                    인쇄
                                </button>
                            </div>
    
                        )
                    }
                    </>
                )
            }

            <div className="fc" style={{ width: "11.37%" }}>
                <button className="btn-table" onClick={() => setAttModal(true)}>
                    학습 태도
                </button>
                {attModal ? <AttModal setAttModal={setAttModal} /> : null}
                {assModal ? <AssessmentModal closeModal={setAssModal} /> : null}
                {printModal ? (
                    <PrintModal_clinic
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
