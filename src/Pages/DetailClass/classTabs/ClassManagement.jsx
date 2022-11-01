import React, { useState, memo, useEffect } from "react";
import ajax from "../../../ajax";
import ProgressModal from '../modal/progressModal';
import CreationModal from '../modal/CreationModal';
import ResultPopModal from '../modal/ResultPopModal';

import { useMemo } from "react";

// let daedanwon = { 
//       tit : 'I. 수와 연산',
//       sodanwon : [
//         {   name : '1. 소인수분해',
//             state1 : '100%',
//             state2 : '33%',
//             state3 : {
//                 assessment : false,
//                 newplay : true,
//             },
            
//             state4 : '24/30',
//             state5 : '5/25',
//             testReturn : true,
//         },
//         {   
//             name : '2. 최대공약수',
//             state1 : '100%',
//             state2 : '33%',
//             state3 : {
//                 assessment : true,
//                 uds : 5,
//                 send : 10,
//                 newplay : false,
//             },
//             state4 : '24/30',
//             state5 : '5/25',

//         },
//         {   
//             name : '4. 최대공약수',
//             state1 : '100%',
//             state2 : '33%',
//             state3 : undefined,
//             state4 : '24/30',
//             state5 : '5/25',

//         },
//       ]        
//     }

function ClassManagement({clickStudent}){
    let [progressMo, setProgressState] = useState(false);
    let [creationMo, setCreationMo] = useState(false);
    let [data, setData] = useState(null);

    useEffect(()=>{
        ajax("/class_manage.php", { data : {
            mode : 'unit_list',
            usr_seq : 80,
        }
        }).then(res=>{
            setData(res.data);
            console.log(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[]);
    
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
                progressMo && 
                ( 아르케 ? <ProgressModalV2 setProgressState={setProgressState} name={clickStudent.name}/> 
                : <ProgressModal setProgressState={setProgressState} name={clickStudent.name}/> )

            } */}
           
           <div className="table-wrap">

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
            {
                data && data.map(a=>{
                    return(
                        <tbody key={a}>
                             <tr style={{ background:'gray' }}>
                                <td colSpan={8}>{a.unit1}</td>
                            </tr>
                            {
                                a.unit2.map(b=>{
                                    return(
                                        <Tr 
                                        key={a.title}
                                        data={b} 
                                        />
                                    )
                                })
                            }
                        </tbody>
                    )
                })
            }
            </table>
            </div>
        </div>
    )
}

const Tr = memo(({data}) => {

    let [resultPop, setResultPop] = useState(false);

    return(
        <tr>         
            <td>{data.title}</td>
            <td className={!data.state1 && 'disabled'}>{data.state1}</td>
            <td>{data.state2.score}
                <button className={data.state2.avail ? 'btn' : 'btn disabled'}>재응시({data.state2.retry})</button>
            </td>
            <td className={!Object.keys(data.state3).length && 'disabled'}>
                {
                    !Object.keys(data.state3).length == 0 
                    ?  ( data.state3.file_url ? (
                            <>
                            <div className="btn-wrap">
                                <button>play</button>
                                <button>down</button>
                            </div>
                            <button className={data.state3.avail ? 'btn' : 'btn disabled'}>이해:{data.state3.uds} 전달:{data.state3.send}</button>
                            </>
                        ) : (
                            <>
                                <div>-</div>
                                <button className='btn'>수행 평가</button>
                            </>
                        )
                    )
                    : null 
                }
              
                
            </td>
            <td>
                {data.state4.score}
                <button className={data.state4.avail ? 'btn' : 'btn disabled'}>재응시({data.state4.retry})</button>
            </td>
            <td className={!Object.keys(data.state5).length && 'disabled'}>
            {
                    !Object.keys(data.state5).length == 0 
                    ?  ( data.state5.avail ? (
                            <>
                                <div>{data.state5.score}</div>
                                <button className="btn">인쇄</button>
                                <button className="btn">재응시({data.state5.retry})</button>
                            </>
                        ) : (
                                <div>-</div>
                        )
                    )
                    : null 
                }
            </td>
            
            <td>
                <button className="btn">학습 완료</button>
                <button className="btn">학습 태도</button>
            </td>
            <td><input type='checkbox'/></td>
        </tr>
        )
    }
)
export default ClassManagement;