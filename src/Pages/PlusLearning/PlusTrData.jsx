import React, { memo, useState } from "react";
import PlusLearningGradingModal from "./PlusLearningGradingModal";
import PlusLearningPrintModal from "./PlusLearningPrintModal";

const PlusTrData = memo(({ res }) => {
    let [gradingModal, setGradingModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    return (
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            <td>{res.대단원}</td>
            <td>{res.주제}</td>
            <td>
                {res.상태}
                <br />
                {res.상태 === "학습중" && <button className="btn">오픈취소</button>}
            </td>
            <td>
                {typeof res.채점 === "string" ? (
                    <>
                        {gradingModal && <PlusLearningGradingModal setGradingModal ={setGradingModal} />}
                        <p>{res.채점}</p>
                        <button
                            className="btn"
                            onClick={() => {
                                setGradingModal(true);
                            }}
                        >
                            채점하기
                        </button>
                    </>
                ) : (
                    <>
                        <p>{res.채점.point}/10점</p>
                        
                        <button className="btn">재응시({res.채점.재응시})</button>
                    </>
                )}
            </td>
            <td>
                {
                    printModal && <PlusLearningPrintModal res={res} setPrintModal={setPrintModal} />
                }
                
                <button className="btn" disabled={res.시험지 ? false : true} onClick={()=>{setPrintModal(true)}}>
                    인쇄
                </button>
            </td>
        </tr>
    );
});

export default PlusTrData;
