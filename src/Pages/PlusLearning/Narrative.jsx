import React, { useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import { memo } from "react";
import PlusLearningGradingModal from "./PlusLearningGradingModal";

const data = [
    {
        id: 1,
        대단원: "수와 식의 계산",
        주제: "거듭제곱(1)",
        상태: "학습완료",
        채점: "시험지 채점",
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
        채점: "시험지 채점",
        시험지: false,
    },
];

const 단원 = ["수와 식의 계산", "가나다라 마바사"];
const 상태 = ["오픈전", "학습중", "학습완료"];

function Narrative() {
    let [plusData, setPlusData] = useState(data);
    let [unit, setUnit] = useState(); // 단원
    let [situation, setSituation] = useState(); // 상태

    const clickStudent = useStudentsStore((state) => state.clickStudent);

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
                <div className="row">
                    <SelectBase
                        width="200px"
                        options={단원}
                        value={unit}
                        onChange={(ele) => {
                            setUnit(ele);
                        }}
                        defaultValue="대단원"
                    />
                    <SelectBase
                        width="100px"
                        options={상태}
                        value={situation}
                        onChange={(ele) => {
                            setSituation(ele);
                        }}
                        defaultValue="상태"
                    />
                    <button className="btn">조회</button>
                </div>
            </div>
            <table>
                <colgroup>
                    <col style={{ width: "50px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            선택 <input type="checkbox" />
                        </th>
                        <th>대단원</th>
                        <th>주제</th>
                        <th>상태</th>
                        <th>채점</th>
                        <th>시험지</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {plusData.map((res) => {
                        return <PlusTrData key={res.id} type="narrative" res={res} />;
                    })} */}
                    {plusData.map((ele) => {
                        return <Tr ele={ele} key={ele.id} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = memo(({ ele }) => {

    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            <td>{ele.대단원}</td>
            <td>{ele.주제}</td>
            <td>{ele.상태}</td>
            <td>
                {
                    ele.채점 === "온라인 채점"
                    ? (
                       <>
                        {ele.채점}
                        <button className="btn" onClick={()=>{setModal(true)}}>채점하기</button>
                        {
                            modal && <PlusLearningGradingModal setModal={setModal}/>
                        }
                        
                       </> 
                    )
                    : ele.채점
                }
            </td>
            <td>
                <button type="button" className="btn">
                    인쇄
                </button>
            </td>
        </tr>
    );
});

export default Narrative;
