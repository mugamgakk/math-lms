import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import PlusTrData from "./PlusTrData";
import useStudentsStore from "../../store/useStudentsStore";

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

const 단원 = ["수와 식의 계산", "가나다라 마바사"];
const 상태 = ["오픈전", "학습중", "학습완료"];

function Narrative() {
    let [plusData, setPlusData] = useState(data);
    const clickStudent = useStudentsStore(state=>state.clickStudent)


    return (
        <div className="Narrative">
            <UserInfo clickStudent={clickStudent} />
            <p>
                학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="justify-content-between">
                <div>
                    <button className="btn">선택 오픈</button>
                    <button className="btn">선택 인쇄</button>
                </div>
                <SelectGroup data={data} setPlusData={setPlusData}/>
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
                        return <PlusTrData key={res.id} type="narrative" res={res} />;
                    })}
                </tbody>
            </table>

            <Pagination />
        </div>
    );
}


function SelectGroup ({data, setPlusData}){
    let [unit, setUnit] = useState(); // 단원
    let [situation, setSituation] = useState(); // 상태

    const findPlusData = ()=>{

        let 조회결과 = (data.filter(a=>a.대단원 === unit)).filter(a=>a.상태 === situation);

        setPlusData(조회결과)

    }

    return (
        <div className="row">
            <SelectBase
            width="200px"
            options={단원}
            value={unit}
            onChange={(ele)=>{setUnit(ele)}}
            defaultValue="대단원"
            />
            <SelectBase
            width="100px"
            options={상태}
            value={situation}
            onChange={(ele)=>{setSituation(ele)}}
            defaultValue="상태"
            />
            <button className="btn" onClick={findPlusData}>
                조회
            </button>
        </div>
    )
}

export default Narrative;
