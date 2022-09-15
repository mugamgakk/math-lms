import React, { useState, memo } from "react";
import ProgressModal from '../modal/progressModal';
import CreationModal from '../modal/CreationModal';
import ResultPopModal from '../modal/ResultPopModal';
import { useMemo } from "react";

let daedanwon = { 
      tit : 'I. 수와 연산',
      sodanwon : [
        {   name : '1. 소인수분해',
            state1 : '100%',
            state2 : '33%',
            state3 : {
                assessment : false,
                newplay : true,
            },
            
            state4 : '24/30',
            state5 : '5/25',
            testReturn : true,
        },
        {   
            name : '2. 최대공약수',
            state1 : '100%',
            state2 : '33%',
            state3 : {
                assessment : true,
                uds : 5,
                send : 10,
                newplay : false,
            },
            state4 : '24/30',
            state5 : '5/25',

        },
        {   
            name : '4. 최대공약수',
            state1 : '100%',
            state2 : '33%',
            state3 : undefined,
            state4 : '24/30',
            state5 : '5/25',

        },
      ]        
    }

function ClassManagement({clickStudent}){
    let [progressMo, setProgressState] = useState(false);
    let [creationMo, setCreationMo] = useState(false);
    let [resultPopMo, setResultPopMo] = useState(false);

    
    return(
        <div className='detailClass classManagement'>

            <div className="progress fj" >
                <p>※ 메인 관리 교재를 체크 표시해 두면 오늘의 수업에서 학습 관리하기 편리합니다. (최대 6 종)</p>
                <button className="btn" onClick={()=>setProgressState(true)}>학습 진행률 보기</button>
            </div>
            {
                progressMo && <ProgressModal setProgressState={setProgressState} name={clickStudent.name}/>
            }
            {
                creationMo && <CreationModal setCreationMo={setCreationMo} name={clickStudent.name}/>
            }

            {/* 아르케 학습일 경우 단일 행 모달 */}
            {/* {
                creationMo && 
                ( 아르케 ? <ProgressModalV2 setProgressState={setProgressState} name={clickStudent.name}/> 
                : <ProgressModal setProgressState={setProgressState} name={clickStudent.name}/> )

            } */}
           
            <table className='mt-5'>
            <colgroup>
               <col style={{ width : '150px'}}/>
            </colgroup>
            <thead>
                <tr>
                    <th rowSpan={2}>단원</th>
                    <th colSpan={5}>수행현황</th>
                    <th rowSpan={2}>학습 완료</th>
                    <th rowSpan={2}>오답<br/>정복하기<br /><button className="btn" onClick={()=>setCreationMo(true)}>생성</button></th>
                </tr>
                <tr>
                    <th>개념 강의</th>
                    <th>개념 확인/<br />기본 문제</th>
                    <th>개념 설명</th>
                    <th>유형 학습</th>
                    <th>맞춤 클리닉</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{ background:'gray' }}>
                    <td colSpan={8}>{daedanwon.tit}</td>
                </tr>
                {
                    daedanwon.sodanwon.map(data=>{
                        return <Tr 
                        key={data.name}
                        data={data} 
                        resultPopMo={resultPopMo} 
                        setResultPopMo={setResultPopMo}/>
                    })
                }
            </tbody>

                
            </table>
        </div>
    )
}

    const Tr = memo(({data,setResultPopMo,resultPopMo}) => {
    return(
        <tr>
            <td>{data.name}</td>
            <td>{data.state1}</td>
            <td>{data.state2}<button className="btn" onClick={ () => setResultPopMo(true) }>재응시</button>
            {
                resultPopMo && <ResultPopModal setResultPopMo={setResultPopMo} />
            }
            </td>
            <td>
                {
                    data.state3 && (
                        <div className="btn-wrap">
                        <button className={ data.state3.newplay ? 'btnPlay new' : 'btnPlay'} >play</button>
                        <button className='btnDown'>down</button>
                        </div>
                    )
                }
                {
                    data.state3 ?  data.state3?.assessment ? (
                        <div>
                            <button className='evalBtn btn'>
                            이해:{data.state3.uds} 전달:{data.state3.send}
                            </button>
                        </div>
                    ) : <button className='evalBtn btn'>수행 평가</button> 
                    : null
                }

            </td>
            <td>
                { data.state4}
                <button className='btn'>재응시</button>
            </td>
            <td>
                <div>{data.state5}</div>
                <button className='btn'>인쇄</button>
                { data.testReturn && <button className='btn'>재응시</button> }
            </td>
            <td>
                <button className='btn'>학습 완료</button>
                <button className='btn'>학습 태도</button>
            </td>
            <td>
                <input type="checkbox" />
            </td>
        </tr>
    )
    
    }
)
export default ClassManagement;