import React, { memo, useState } from "react";
import PrintModal from "../../components/PrintModal";
import PlusLearningGradingModal from "./PlusLearningGradingModal";
import PlusLearningGradingTextBookModal from "./PlusLearningGradingTextBookModal";

const PlusTrData = memo(({ res, type }) => {
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
                        {type === "textBook" && (
                            <>
                                <p>{res.채점}</p>
                                {gradingModal && (
                                    <PlusLearningGradingTextBookModal
                                        setModal={setGradingModal}
                                    />
                                )}
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setGradingModal(true);
                                    }}
                                >
                                    채점하기
                                </button>
                            </>
                        )}
                        {type === "narrative" && (
                            <>
                                <p>{res.채점}</p>
                                {gradingModal && (
                                    <PlusLearningGradingModal setGradingModal={setGradingModal} />
                                )}
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setGradingModal(true);
                                    }}
                                >
                                    채점하기
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <p>{res.채점.point}/10점</p>

                        <button className="btn">재응시({res.채점.재응시})</button>
                    </>
                )}
            </td>
            <td>
                {printModal && <PrintModal title={`제목임`} closeModal={setPrintModal} />}

                <button
                    className="btn"
                    disabled={res.시험지 ? false : true}
                    onClick={() => {
                        setPrintModal(true);
                    }}
                >
                    인쇄
                </button>
            </td>
        </tr>
    );
});

export default PlusTrData;
