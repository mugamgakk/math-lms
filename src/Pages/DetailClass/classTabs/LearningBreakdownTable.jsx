import React, { useState, useEffect } from "react";
import useLbtStore from "../../../store/useLbtStore";
import LbtDayOption from "../LbtDayOption";

function LearningBreakdownTable() {
    let [lbtList, setLbtList] = useState(null);
    let [choiceArr, setChoiceArr] = useState([]);
    let { lbtData, getLbtData, removeLbtData } = useLbtStore();

    const checkboxChecked = (checked, item) => {
        if (checked) {
            setChoiceArr([...choiceArr, item])
        }else{
            setChoiceArr(choiceArr.filter(a=> a !==item ))
        }
    }

    const removeList = ()=>{
        if(choiceArr.length === 0){
            alert("학습 분석표를 선택하세요");
        }else{
            if(window.confirm("선택한 학습 분석표를 삭제하시겠습니까?")){
                removeLbtData( lbtData.filter(a => !choiceArr.includes(a)) )
            }else{
                return 
            }
        }
    }

    useEffect(() => {
        setLbtList(lbtData);
    }, [lbtData]);

    useEffect(() => {
        getLbtData();
    }, []);

    return (
        <div>
            <LbtDayOption />

            <button className="btn" onClick={removeList}>선택 삭제</button>

            <p>[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다</p>

            <table>
                <thead>
                    <tr>
                        <th scope="col">선택</th>
                        <th scope="col">학습 기간</th>
                        <th scope="col">분석표 생성일</th>
                        <th scope="col">학습한 교재</th>
                        <th scope="col">생성자</th>
                        <th scope="col">학습 분석표</th>
                    </tr>
                </thead>
                <tbody>
                    {lbtList?.map((item) => {
                        return <Tr key={item.info.id} data={item} item={item.info} choiceArr={choiceArr} checkboxChecked={checkboxChecked} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ item, checkboxChecked, choiceArr, data }) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={choiceArr.includes(data)}
                    onChange={(e) => {
                        checkboxChecked(e.target.checked, data);
                    }}
                />
            </td>
            <td>{item.date}</td>
            <td>{item.makeDay}</td>
            <td>{item.book}</td>
            <td>{item.maker}</td>
            <td>
                <button className="btn">보기</button>
            </td>
        </tr>
    );
};

export default LearningBreakdownTable;
