import React, { useState, useCallback, memo } from "react";
import Pagination from "../../components/Pagination";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import PlusTrData from "./PlusTrData";

const data = [
    {
        id: 1,
        대단원: "수와 식의 계산",
        주제: "거듭제곱(1)",
        상태: "학습완료",
        채점: { point: 8, 재응시: 2 },
        시험지: true,
    },
    {
        id: 2,
        대단원: "수와 식의 계산",
        주제: "거듭제곱(2)",
        상태: "오픈전",
        채점: "시험지 채점",
        시험지: true,
    },
    {
        id: 3,
        대단원: "수와 식의 계산",
        주제: "03> 제곱인 수 만들기",
        상태: "학습중",
        채점: "온라인 채점",
        시험지: false,
    },
    {
        id: 4,
        대단원: "수와 식의 계산",
        주제: "04> 약수의 개수 구하기",
        상태: "학습완료",
        채점: { point: 8, 재응시: 2 },
        시험지: false,
    },
];

const 단원 = ["대단원", "수와 식의 계산"];
const 상태 = ["상태", "오픈전", "학습중", "학습완료"];

function Narrative() {
      let [plusData, setPlusData] = useState(data);

    return (
        <div className="Narrative">
            <UserInfo />
            <p>
                학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="justify-content-between">
                <div>
                    <button className="btn">선택 오픈</button>
                    <button className="btn">선택 인쇄</button>
                </div>
                <SelectGroup setPlusData={setPlusData}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>대단원</th>
                        <th>주제</th>
                        <th>상태</th>
                        <th>채점</th>
                        <th>시험지</th>
                    </tr>
                </thead>
                <tbody>
                    {plusData.map((res) => {
                        return <PlusTrData key={res.id} res={res} />;
                    })}
                </tbody>
            </table>

            <Pagination />
        </div>
    );
}


function SelectGroup ({setPlusData}){

    let [selectBase, setSelectBase] = useState({ state: false, text: "선택" })
    let [selectBase2, setSelectBase2] = useState({ state: false, text: "선택" })

    const findData = () => {
        let 대단원 = data.filter((list) => list.대단원 === selectBase.text);
        let filterData = 대단원.filter((list) => list.상태 === selectBase2.text);

        setPlusData(filterData);

        if (selectBase.text === "대단원" && selectBase2.text === "상태") {
            setPlusData(data);
        }
    }


    return (
        <div className="row">
            <SelectBase
                selectBase={selectBase}
                setSelectBase={setSelectBase}
                width={"150px"}
                item={단원}
            />
            <SelectBase
                selectBase={selectBase2}
                setSelectBase={setSelectBase2}
                width={"150px"}
                item={상태}
            />
            <button className="btn" onClick={findData}>
                조회
            </button>
        </div>
    )
}

export default Narrative;
