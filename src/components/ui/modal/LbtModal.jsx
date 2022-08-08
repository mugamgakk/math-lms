import React, { useState, useCallback, useEffect } from "react";
import style from "../../../style/style-module/lbtModal.module.scss";
import LbtCheckbox from "../LbtCheckbox";

const dataLists = [
    [
        { id: 1, data: "단원 학습 현황" },
        { id: 2, data: "단원별 정답률 및 향상도/수행평가" },
        { id: 3, data: "행동 영역 분석" },
        { id: 4, data: "내용 영역 분석" },
    ],
    [
        { id: 5, data: "서술형 따라잡기" },
        { id: 6, data: "교과서 적중문제" },
    ],
    [
        { id: 7, data: "학원 출결 상황" },
        { id: 8, data: "온라인 학습 분석" },
    ],
];

function LbtModal(props) {
    const [allCheckBtn, setAllCheckBtn] = useState(false);

    console.log(allCheckBtn)

    return (
        <div
            className={style.modal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.setModal(false);
                }
            }}
        >
            <div className={style.content + " row"}>
                <div className={style.left}>
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
                        {dataLists.map((list,i) => {
                            return <LbtCheckbox dataLists={list} allCheckBtn={allCheckBtn} />;
                        })}
                    </div>
                </div>
                <div className={style.right}>asdfasdf</div>
            </div>
        </div>
    );
}

export default LbtModal;
