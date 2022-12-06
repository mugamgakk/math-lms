import React, { useState, useRef } from "react";
import LbtCheckbox from "../LbtCheckbox";
import useLbtStore from "../../../store/useLbtStore";
import { falseModal } from "../../../methods/methods";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import { useEffect } from "react";
import ajax from "../../../ajax";

function LbtModal({ setCreateModal }) {
    const dataLists = useLbtStore((state) => state.dataLists);
    const checkedList = useLbtStore((state) => state.checkedList);
    const allCheckfnL = useLbtStore((state) => state.allCheckfnL);

    const getRegult = async () => {
        const data = {
            mode: "get_analytics_tot",
            avg: 1, //평균표시
            lec_stat: 1, // 단원별 학습
            lec_assa: 0, //단원별 정답률 향상도/수행병가
            an_act: 1, //행동 영역 분석
            an_con: 1, //내용 영역 분석
            plus_ct: 1, //플러스 서술
            plus_tb: 1, //플러스 내신
            an_ut: 1, //단원평가분석
            an_bt: 1, //총괄평가분석
            attd_stat: 1, //학원 출결상황
            an_online: 1, //온라인 학습분석
            point: 1, //획득 학습포인트
            attd_eval: 1, //학습태도 평가
            tch_comm: 1, //선생님의견,
            art_an: 1, //AI분석,
            arr_bk_cd: ["m11-co1", "m11-no1"], //교재코드 배열
            sdate: "2022-01-01", //분석표 생성시 선택된 기간
            edate: "2022-01-01", //분석표 생성시 선택된 기간
        };

        let res = await ajax("/class_result.php", { data });

        console.log(res);
    };
    
    const isAllCheck = ()=>{
        let result1 = 0;
        let result2 = 0;
        dataLists.forEach(a=>{
            result1 += a.optionItem.length
        })
        checkedList.forEach(a=>{
            result2 += a.optionItem.length
        })

        return result1 === result2
    }

    useEffect(() => {
        getRegult();
    }, []);

    return (
        <div
            className="modal LbtModal"
            onClick={(e) => {
                falseModal(e, setCreateModal);
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">분석표 생성</h4>
                    <button
                        className="btn"
                        onClick={() => {
                            setCreateModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">종합 학습 분석표 생성하기</strong>
                    </div>
                    <div className="LbtModal-body">
                        <div className="left">
                            <div className="head">※ 평균 표시</div>
                            <div className="body">
                                <div className="part">
                                    <div className="part-title">
                                        <Checkbox
                                            color="orange"
                                            id="all"
                                            checked={isAllCheck()}
                                            onChange={e=>{ allCheckfnL(e.target.checked) }}
                                        />
                                        <label htmlFor="all">모두 선택 / 해제</label>
                                    </div>
                                </div>
                                {dataLists.map((a, i) => {
                                    return <LbtCheckbox ele={a} key={i} checkedItem={checkedList[i]} />;
                                })}
                                <div className="text-center">
                                    <button className="btn-grey-border" style={{minWidth : "100px"}}>적용</button>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="head">
                                <span style={{ marginRight: "10px" }}>사유하고 질문하라.</span>
                                Parallax Thingking!
                            </div>
                            <div className="body">
                                {
                                    checkedList.map((a,i)=>{
                                        return (
                                            <div key={i}>
                                                {
                                                    a.optionItem.length > 0 && (
                                                        <div>
                                                            <h4>{a.option}</h4>
                                                            {
                                                                a.optionItem.map(dd=>{
                                                                    return <div key={dd}>{dd.label}</div>
                                                                })
                                                            }
                                                            
                                                        </div>
                                                    )
                                                }
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey-border mr-10"
                        onClick={() => {
                            setCreateModal(false);
                        }}
                    >
                        닫기
                    </button>
                    <button className="btn-orange mr-10">생성하기</button>
                </div>
            </div>
        </div>
    );
}

export default LbtModal;
