import React from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import DatePicker from "react-date-picker";
import { useState } from "react";
import styled from "styled-components";
import { useCallback } from "react";

const Btn = styled.button`
    width : 15px;
    height : 15px;
    border-radius : 50%;
    border : 1px solid #ccc;
    margin-right :5px;
    background : ${props => props.bg}
`

const data = [];
for (let i = 0; i < 30; i++) {
    data[i] = { id: i + 1, 정답: Math.floor(Math.random() * 5) + 1, 학생답: null };
}

data[16].정답 = [1,2,3];
data[16].학생답 = [];

function ResultSave() {
    let [result, setResult] = useState([data.slice(0, 10), data.slice(10, 20), data.slice(20, 30)]);
    let [name, setName] = useState("");

    

    const checkResult = useCallback((테이블인덱스, 배열인덱스, 답)=>{
        // console.log(테이블인덱스, 배열인덱스, 답)

        let copyArr = [...result];

        if(Array.isArray(답)){
            let 기존값 = copyArr[테이블인덱스][배열인덱스].학생답;

            if(기존값.includes(...답)){
                copyArr[테이블인덱스][배열인덱스].학생답 = 기존값.filter(a=> a !== 답[0]);
            }else{
                copyArr[테이블인덱스][배열인덱스].학생답 = [...기존값, ...답];
            }
            
        }else{
            copyArr[테이블인덱스][배열인덱스].학생답 = 답;
        }


        setResult(copyArr)
        // console.log(copyArr)


    },[])

    return (
        <div className="modal-bg">
            <div className="modal-content" style={{ width: "1200px" }}>
                <header>
                    <h4>진단평가 결과 등록</h4>
                </header>
                <div className="modal-body">
                    <table className="mb-10">
                        <tbody>
                            <tr>
                                <td>예약 명단</td>
                                <td style={{ textAlign: "left" }}>
                                    <DatePicker
                                        className="datepicker-base"
                                        clearIcon={null}
                                        openCalendarOnFocus={false}
                                        format={"yyyy-MM-dd"}
                                        value={new Date()}
                                    />
                                    <SelectBase defaultValue="이름" width={"200px"} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={2}>평가지 정보</td>
                                <td style={{ textAlign: "left" }} colSpan={3}>
                                    <SelectBase defaultValue="학년" width={"200px"} />
                                    <SelectBase defaultValue="학기" width={"200px"} />
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={3}>학생정보</td>
                                <td>이름</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        className="form-control"
                                    />
                                </td>
                                <td>평가일</td>
                                <td style={{ textAlign: "left" }}>
                                    <DatePicker
                                        className="datepicker-base"
                                        clearIcon={null}
                                        openCalendarOnFocus={false}
                                        format={"yyyy-MM-dd"}
                                        value={new Date()}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>학교</td>
                                <td>
                                    <input type="text" className="form-control" />
                                </td>
                                <td>학년</td>
                                <td>
                                    <SelectBase />
                                </td>
                            </tr>
                            <tr>
                                <td>연락처(전화번호)</td>
                                <td colSpan={3}>
                                    <input type="text" className="form-control" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className="my-10">[ 진단평가 결과 등록]</h4>

                    <div className="fj">
                        {result.map((a, arrIndex) => {
                            return (
                                <table key={arrIndex * 100}>
                                    <thead>
                                        <tr>
                                            <td>번호</td>
                                            <td>정답</td>
                                            <td>학생 답</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {a.map((dd, index) => {
                                            return (
                                                <tr key={dd.id}>
                                                    <td>{dd.id}</td>
                                                    <td>
                                                        {
                                                            Array.isArray(dd.정답)
                                                            ? dd.정답.join(", ")
                                                            : dd.정답
                                                        }
                                                        </td>
                                                    <td className="result-button">
                                                        {
                                                            Array.isArray(dd.정답)
                                                            ? (
                                                                <>
                                                                    <Btn bg={dd.학생답?.includes(1) && "red"} onClick={()=>{checkResult(arrIndex ,index, [1])}}>1</Btn>
                                                                    <Btn bg={dd.학생답?.includes(2) && "red"} onClick={()=>{checkResult(arrIndex ,index, [2])}}>2</Btn>
                                                                    <Btn bg={dd.학생답?.includes(3) && "red"} onClick={()=>{checkResult(arrIndex ,index, [3])}}>3</Btn>
                                                                    <Btn bg={dd.학생답?.includes(4) && "red"} onClick={()=>{checkResult(arrIndex ,index, [4])}}>4</Btn>
                                                                    <Btn bg={dd.학생답?.includes(5) && "red"} onClick={()=>{checkResult(arrIndex ,index, [5])}}>5</Btn>
                                                                </>
                                                            )
                                                            : (<>
                                                                <Btn bg={dd.학생답 === 1 && "red"} onClick={()=>{checkResult(arrIndex ,index, 1)}}>1</Btn>
                                                                <Btn bg={dd.학생답 === 2 && "red"} onClick={()=>{checkResult(arrIndex ,index, 2)}}>2</Btn>
                                                                <Btn bg={dd.학생답 === 3 && "red"} onClick={()=>{checkResult(arrIndex ,index, 3)}}>3</Btn>
                                                                <Btn bg={dd.학생답 === 4 && "red"} onClick={()=>{checkResult(arrIndex ,index, 4)}}>4</Btn>
                                                                <Btn bg={dd.학생답 === 5 && "red"} onClick={()=>{checkResult(arrIndex ,index, 5)}}>5</Btn>
                                                        </>
                                                            )
                                                        }
                                                        
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultSave;
