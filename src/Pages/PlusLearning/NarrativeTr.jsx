import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ajax from "../../ajax";
import Checkbox from "../../components/Checkbox";
import Icon from "../../components/Icon";
import NarrativePrint from "../../components/NarrativePrint";
import PlusLearningGradingModal from "./PlusLearningGradingModal";

const scStatus = {
    P: "오픈전",
    S: "학습중",
    C: "학습 완료",
};

function NarrativeTr({ ele, checkOne, checkedList }) {
    let [gradingModal, setGradingModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    const queryClient = useQueryClient();

    // 재응시
    let retryMutation = useMutation((param) => ajax("/class_plus.php", { data: param }), {
        onSuccess: (data) => {
            // console.log(data);
            // Invalidate and refetch
            queryClient.invalidateQueries("lists");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    // 오픈취소
    let openCancle = useMutation(param=> ajax("/class_plus.php", {data : param}),{
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries("lists");
        }
    })

    return (
        <tr>
            <td style={{ width: "8.80316%" }}>
                <Checkbox
                    checked={checkedList.includes(ele)}
                    onChange={(e) => {
                        checkOne(e.target.checked, ele);
                    }}
                />
            </td>
            <td style={{ width: "17.60633%" }}>{ele.ltitle}</td>
            <td style={{ width: "34.11374%" }}>{ele.sc_title}</td>
            <td style={{ width: "13.84767%" }}>
                {
                    {
                        P:  <span style={{color : "#ccc"}}>오픈 전</span>,
                        S: (
                            <div className="text-center">
                                <p>학습 중</p>
                                {/* 답안 제출 안했을시 보여주기*/}
                                {!ele.sendResult && (
                                    <button className="btn-table"
                                        onClick={()=>{
                                            openCancle.mutate({
                                                mode : "ct_close",
                                                arr_sc_seq : [ele.sc_seq]
                                            })
                                        }}
                                    >오픈 취소</button>
                                )}
                            </div>
                        ),
                        C: <span className="text-orange">학습완료</span>,
                    }[ele.sc_status]
                }
            </td>
            <td style={{ width: "13.25420%" }}>
                <div>
                    {
                        {
                            P: "-",
                            S: (
                                <div className="text-center">
                                    {gradingModal && (
                                        <PlusLearningGradingModal
                                            sc_seq={ele.sc_seq}
                                            setModal={setGradingModal}
                                        />
                                    )}
                                    {ele.sendResult ? "온라인 채점" : "시험지 채점"}
                                    <button
                                        className="btn-table-orange"
                                        onClick={() => {
                                            setGradingModal(true);
                                        }}
                                    >
                                        채점하기
                                    </button>
                                </div>
                            ),
                            C: (
                                <div className="text-center">
                                    {gradingModal && (
                                        <PlusLearningGradingModal
                                            sc_seq={ele.sc_seq}
                                            setModal={setGradingModal}
                                            edit={true}
                                        />
                                    )}
                                    <span className="btn-score" onClick={()=>{
                                        setGradingModal(true);
                                    }}>
                                        {ele.sc_std_score}점 / {ele.sc_max_score}점
                                    </span>
                                    <button
                                        className="btn-table-orange-border"
                                        onClick={() => {
                                            const msg = "재응시하면 학생의 이전 답안이 삭제됩니다. 진행하시겠습니까?"
                                            if(window.confirm(msg)){
                                                retryMutation.mutate({
                                                    mode: "ct_retry",
                                                    sc_seq: ele.sc_seq,
                                                });
                                            }
                                        }}
                                    >
                                        재응시(2)
                                    </button>
                                </div>
                            ),
                        }[ele.sc_status]
                    }
                </div>
            </td>
            <td style={{ width: "12.37487%" }}>
                {printModal && <NarrativePrint closeModal={setPrintModal} sc_seq={[ele.sc_seq]} />}
                <button
                    className="btn-table-orange-border"
                    onClick={() => {
                        setPrintModal(true);
                    }}
                >
                    <Icon icon="print" style={{ marginRight: "6px" }} /> 인쇄
                </button>
            </td>
        </tr>
    );
}

export default NarrativeTr;
