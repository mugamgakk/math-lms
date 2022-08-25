import React, { useState } from "react";
import LbtModal from "../modal/LbtModal";
import LbtDayOption from "../LbtDayOption";
import { useCallback } from "react";

const arr = ["강호동", "이수근", "오징어", "꽃게", "떡볶이"]

function LearningBreakdownTable() {
    let [data, setData] = useState([...arr]);
    let [choiceArr, setChoiceArr] = useState([]);

    // 체크박스
    const isChecked = useCallback(
        (checked, ele) => {
            if (checked) {
                setChoiceArr([...choiceArr, ele]);
            } else {
                setChoiceArr(choiceArr.filter((list) => list !== ele));
            }
        },
        [choiceArr]
    );

    // 삭제 버튼
    const deleteLBT = useCallback(() => {
        if (choiceArr.length === 0) {
            alert("학습 분석표를 선택하세요");
            return;
        }

        if (window.confirm("삭제하시겠습니까?")) {
            let copy = [...data]; //삭제

            choiceArr.forEach(function (item) {
                copy.splice(copy.indexOf(item), 1);
            });

            setChoiceArr([]);
            setData(copy);
        } else {
            return;
        }
    }, [choiceArr]);


    return (
        <div>
            <LbtDayOption />

            <button className="btn" onClick={deleteLBT}>
                선택 삭제
            </button>

            <p>[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다</p>

                <table>
                    <colgroup>
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                        <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>학습기간</th>
                            <th>분석표 생성일</th>
                            <th>학습한 교재</th>
                            <th>생성자</th>
                            <th>학습 분석표</th>
                        </tr>
                    </thead>
                </table>
            <div style={{ height: "400px", overflow: "auto" }}>

            <table>
                <tbody>
                    {data.map((a, i) => {
                            return <LbtTr item={a} key={i} isChecked={isChecked} choiceArr={choiceArr} />;
                    })}
                </tbody>
            </table>
            </div>

        </div>
    );
}

const LbtTr = ({ item, isChecked, choiceArr }) => {
    let [modal, setModal] = useState(false);
    let [modalState, setModalState] = useState();

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={choiceArr.includes(item) ? true : false}
                    onChange={(e) => {
                        isChecked(e.target.checked, item);
                    }}
                />
            </td>
            <td>2022-06-12 ~ 2022-07-25</td>
            <td>2021-07-02</td>
            <td>중2-1 노벰, 중2-2 엑사스</td>
            <td>{item}</td>
            <td>
                <button
                    className="btn"
                    onClick={() => {
                        setModal(true);
                        setModalState("인쇄");
                    }}
                >
                    보기
                </button>
                {modal && <LbtModal setModal={setModal} modalState={modalState} />}
            </td>
        </tr>
    );
};

export default LearningBreakdownTable;
