import React, { useState, useMemo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import styled from "styled-components";

const ResultTitle = styled.h4`
    padding : 10px;
    background-color : ${props=>props.bgColor}
`

const 채점 = [
    { 채점기준: "가분수로 바꾸어 계산을 하였다.", 배점: 2, 점수: 1 },
    { 채점기준: "자연수는 자연수끼리, 분수는 분수끼리 계산을 하였다.", 배점: 2, 점수: 1.5 },
    { 채점기준: "대분수로 바꾸어 답을 나타내었다.", 배점: 4, 점수: 0.5 },
];

function 총합(param) {
    console.log("호출됨");
    let count = 0;
    if (param === "배점") {
        채점.forEach((a) => {
            count += a.배점;
        });
    } else {
        채점.forEach((a) => {
            count += a.점수;
        });
    }

    return count;
}

function PlusLearningPrintModal({setModal}) {
    let [uploadFile, setUploadFile] = useState([]);
    let [checkFile, setCheckFile] = useState([]);

    let 배점총합 = useMemo(() => {
        return 총합("배점");
    }, []);

    let 점수총합 = useMemo(() => {
        return 총합("점수");
    }, []);

    // 파일 업로드
    const upload = (e) => {
        let files = e.target.files;

        let arr = [];

        for (let key of files) {
            arr.push(key);
        }

        setUploadFile([...uploadFile, ...arr]);
    };

    // 체크된 파일
    const checkedFile = (checked, fileName)=>{
        if(checked){
            setCheckFile([...checkFile, fileName])
        }else{
            setCheckFile(checkFile.filter(a=>a !== fileName))
        }
    }

    // 업로드한 파일 지우기
    const removeFile = () => {

        if(checkFile.length === 0){
            alert("파일을 선택하세요");
        }

        if(window.confirm("정말로 삭제하시겠습니까?")){
            let arr = [...uploadFile];

            checkFile.forEach(el=>{

                for(let i = 0; i < arr.length; i++){
                    if(arr[i].name === el){
                        arr.splice(i,1);
                        i--
                    }
                }

            })
            setCheckFile([]);
            setUploadFile([...arr])

        }else{
            return 
        }
    };

    return (
        <div className="PlusLearningPrintModal">
            <div className="modal">
                <header>
                    <h2>[서술형 따라잡기] 강수학/중2-1/ㅣ. 수와 식의 계산/주제</h2>
                    <button className="btn" onClick={()=>{setModal(false)}}>X</button>
                </header>
                <div className="content d-flex">
                    <div className="content-left">
                        <div className="btn-group">
                            <button className="btn active mr-10">1번 문항</button>
                            <button className="btn">2번 문항</button>
                        </div>
                        <div className="problem-box">
                            <img
                                src="https://s3.orbi.kr/data/file/cheditor4/1405/NS2jcorpKxPuCM4DT3UxgL.jpg"
                                alt=""
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>채점 기준</th>
                                    <th>배점</th>
                                    <th>점수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {채점.map((a, i) => {
                                    return <SolveTable item={a} key={i} />;
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>합계</td>
                                    <td>{배점총합}점</td>
                                    <td>{점수총합}점</td>
                                </tr>
                            </tfoot>
                        </table>
                        <label htmlFor="explane">선생님 의결 (첨삭)</label>
                        <textarea name="" id="explane" rows="10" placeholder="입력하세요!!!!!!!"></textarea>
                        <div className="d-flex mt-10">
                            <input
                                type="file"
                                multiple
                                onChange={upload}
                                id="file"
                                className="d-none"
                            />
                            <div className="file-wrap">
                                {
                                    uploadFile.map((a, i) => {
                                        return (
                                            <div key={i}>
                                                <input 
                                                type="checkbox" 
                                                id={a.name}
                                                onChange={(e)=>{checkedFile(e.target.checked, a.name)}} 
                                                checked={checkFile.includes(a.name)}
                                                />
                                                <label htmlFor={a.name}>{a.name}</label>
                                            </div>
                                        );
                                    })}
                            </div>
                            <label htmlFor="file" className="btn">
                                파일업로드
                            </label>
                            <button className="btn" onClick={removeFile}>
                                파일선택삭제
                            </button>
                        </div>
                    </div>
                    <div className="content-right">

                        <ResultTitle bgColor="rgb(132, 188, 241);">
                            asdsadsadsad
                        </ResultTitle>
                        <ResultTitle bgColor="orange">
                            asdsadsadsad
                        </ResultTitle>

                    </div>
                </div>
            </div>
        </div>
    );
}

function SolveTable({ item }) {
    let [selectBase, setSelectBase] = useState({ state: false, text: item.점수 + "점" });
    const 점수 = ["선택"];

    for (let i = 0; i <= item.배점; i += 0.5) {
        점수.push(i + "점");
    }

    return (
        <tr>
            <td>{item.채점기준}</td>
            <td>{item.배점}</td>
            <td>
                <SelectBase item={점수} selectBase={selectBase} setSelectBase={setSelectBase} />
            </td>
        </tr>
    );
}

export default PlusLearningPrintModal;
