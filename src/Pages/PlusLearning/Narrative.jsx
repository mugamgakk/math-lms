import React, { useMemo, useEffect, useState, useCallback } from "react";
import Pagination from "../../components/Pagination";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import data from '../../plusdata';

const 단원 = ["대단원", "수와 식의 계산",  "덧셈과 뺄셈", "제곱근의 수", "일 더하기 일은"];
const 상태 = ["상태","오픈전", "학습중", "학습완료"];


function Narrative() {
    let [selectOneState, setSelectOneState] = useState(false);
    let [selectTwoState, setSelectTwoState] = useState(false);
    let [selectOneText, setSelectOneText] = useState(단원[0]);
    let [selectTwoText, setSelectTwoText] = useState(상태[0]);
    let [plusData, setPlusData] = useState(data);

    const findData = ()=>{
        setPlusData(data.filter(list=>list.대단원 === selectOneText))

        if(selectOneText === "대단원" && selectTwoText === "상태"){
            setPlusData(data)
        }
    }


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
                                        <td>{res.채점}</td>
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
