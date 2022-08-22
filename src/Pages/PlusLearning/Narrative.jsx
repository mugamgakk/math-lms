import React, { useState, useCallback } from "react";
import Pagination from "../../components/Pagination";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import PlusLearningPrintModal from "./PlusLearningPrintModal";

const data = [
    {
        id : 1,
        대단원 : "수와 식의 계산",
        주제 : "거듭제곱(1)",
        상태 : "학습완료",
        채점 : {point : 8, 재응시 : 2},
        시험지 : true
    },
    {
        id : 2,
        대단원 : "수와 식의 계산",
        주제 : "거듭제곱(2)",
        상태 : "오픈전",
        채점 : "시험지 채점",
        시험지 : true
    },
    {
        id : 3,
        대단원 : "수와 식의 계산",
        주제 : "03> 제곱인 수 만들기",
        상태 : "학습중",
        채점 : "온라인 채점",
        시험지 : false
    },
    {
        id : 4,
        대단원 : "수와 식의 계산",
        주제 : "04> 약수의 개수 구하기",
        상태 : "학습완료",
        채점 : {point : 8, 재응시 : 2},
        시험지 : false
    },
]


const 단원 = ["대단원", "수와 식의 계산"];
const 상태 = ["상태","오픈전", "학습중", "학습완료"];


function Narrative() {
    let [selectOneState, setSelectOneState] = useState(false),
        [selectTwoState, setSelectTwoState] = useState(false),
        [selectOneText, setSelectOneText] = useState(단원[0]),
        [selectTwoText, setSelectTwoText] = useState(상태[0]),
        [plusData, setPlusData] = useState(data);

    const findData = useCallback(()=>{

        let 대단원 = data.filter(list=>list.대단원 === selectOneText);
        let filterData = 대단원.filter(list=>list.상태 === selectTwoText);


        setPlusData(filterData)

        if(selectOneText === "대단원" && selectTwoText === "상태"){
            setPlusData(data)
        }

    },[selectOneText,selectTwoText])




    return (
        <div className="Narrative">

            <PlusLearningPrintModal/>

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
                <div className="row">
                    <SelectBase
                        selectState={selectOneState}
                        setSelectState={setSelectOneState}
                        selectText={selectOneText}
                        setSelectText={setSelectOneText}
                        width={'150px'}
                        item={단원}
                    />
                    <SelectBase
                        selectState={selectTwoState}
                        setSelectState={setSelectTwoState}
                        selectText={selectTwoText}
                        setSelectText={setSelectTwoText}
                        width={'150px'}
                        item={상태}
                    />
                    <button className="btn" onClick={findData}>조회</button>
                </div>

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
                        {
                            plusData.map(res=>{
                                return (
                                    <tr key={res.id}>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{res.대단원}</td>
                                        <td>{res.주제}</td>
                                        <td>
                                            {res.상태}
                                            <br/>
                                            {
                                                res.상태 === "학습중" && <button className="btn">오픈취소</button>
                                            }
                                        
                                        </td>
                                        <td>
                                            {
                                            typeof res.채점 === "string"
                                            ? (
                                                <>
                                                <p>{res.채점}</p>
                                                <button className="btn">채점하기</button>
                                                </>
                                                )
                                            : (
                                                <>
                                                <p>{res.채점.point}/10점</p>
                                                <button className="btn">재응시({res.채점.재응시})</button>
                                                </>
                                            )
                                            }
                                        </td>
                                        <td><button className="btn" disabled={res.시험지 ? false : true}>인쇄</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Pagination/>
        </div>
    );
}

export default Narrative;
