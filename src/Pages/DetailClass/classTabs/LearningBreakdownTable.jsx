import React, { useState } from "react";
import LbtModal from "../modal/LbtModal";
import LbtDayOption from "../LbtDayOption";


const arr = ['강호동', '이수근', '김제동', '빠다쿠키', '김교사', '추사랑']


function LearningBreakdownTable() {
    let [modal, setModal] = useState(false);
    let [aa,b] = useState([...arr]);
    let [choiceArr, setChoiceArr] = useState([]);


    const isChecked = (checked,ele)=>{
        if(checked){
            setChoiceArr([...choiceArr, ele])
        }else{
            setChoiceArr(choiceArr.filter(list=> list !== ele ))
        }
    }

    console.log(choiceArr)

    return (
        <div>
            {modal && <LbtModal setModal={setModal} />}

            <LbtDayOption setModal={setModal}/>

            <button className="btn" onClick={()=>{

                // 삭제

                let copy = [...aa];

                choiceArr.forEach(function(asdf){
                    copy.splice(copy.indexOf(asdf),1);
                })
                setChoiceArr([]);
                b(copy);

            }}>선택 삭제</button>
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
                <tbody>
                    {aa.map((a) => {
                        return (
                            <tr key={a}>
                                <td>
                                    <input type="checkbox" onChange={(checked)=>{isChecked(checked,a)}}/>
                                </td>
                                <td>2022-06-12 ~ 2022-07-25</td>
                                <td>2021-07-02</td>
                                <td>중2-1 노벰, 중2-2 엑사스</td>
                                <td>{a}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    >
                                        보기
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default LearningBreakdownTable;
