import React, { useState, useRef, useEffect } from "react";
import style from "../../../style/style-module/lbtModal.module.scss";
import LbtCheckbox from "../LbtCheckbox";
import CreateLbt from "../CreateLbt/CreateLbt";

const dataLists = [
    {
        option: "교재 학습 분석",
        optionItem: [
            "단원 학습 현황",
            "단원별 정답률 및 향상도/수행평가",
            "행동 영역 분석",
            "내용 영역 분석",
        ],
    },
    {
        option: "플러스 학습 분석",
        optionItem: ["서술형 따라잡기", "교과서별 내신적중"],
    },
    {
        option: "평가 분석",
        optionItem: ["단원평가 분석", "총괄평가 분석"],
    },
    {
        option: "학습 태도 분석",
        optionItem: ["학원 출경 상황", "온라인 학습 분석", "획득한 학습 포인트", "학습 태도 평가"],
    },
    {
        option: "선생님의견",
        optionItem: ["123"],
    },
];

function LbtModal(props) {
    const [allCheckBtn, setAllCheckBtn] = useState(false);
    const printComponent = useRef();
    const [create, setCreate] = useState(0);

    return (
        <div
            className={style.modal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.setModal(false);
                }
            }}
        >
            <div className={style.content}>
                <h4>종합 학습 분석표 생성하기</h4>
                <div className="row">
                    <div className={style.left}>
                        {/* {
                            props.modalState === "인쇄" && <div className={style.disabled}></div>
                        } */}

                        <strong>
                            평균 표시(
                            <input
                                type="checkbox"
                                className={style.formConrol}
                                defaultChecked
                                disabled
                            />
                            Y
                            <input type="checkbox" className={style.formConrol} disabled />
                            N)
                        </strong>

                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    setAllCheckBtn(!allCheckBtn);
                                }}
                            >
                                모두 선택 / 해제
                            </button>
                        </div>

                        <div className="contentGroup">
                            {dataLists.map((list, i) => {
                                return (
                                    <LbtCheckbox list={list} create={create} allCheckBtn={allCheckBtn} key={i} />
                                );
                            })}
                        </div>

                        <button
                            className="btn"
                            onClick={() => {
                                setCreate(create + 1);
                            }}
                        >
                            적용
                        </button>
                    </div>
                    <div className={style.rightWrap}>
                        <CreateLbt printComponent={printComponent} />
                    </div>
                </div>
                <div className={style.btnGroup}>
                    <button className="btn">생성</button>
                    <button
                        className="btn"
                        onClick={() => {
                            props.setModal(false);
                        }}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LbtModal;
