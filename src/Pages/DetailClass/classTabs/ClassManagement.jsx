import React, { useState } from "react";

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
      ]        
    }

function ClassManagement(){
    
    return(
        <>
            <table style={{ margin: '5px 0 0 0' }}>
            <colgroup>
               
            </colgroup>
            <thead>
                <tr>
                    <th rowSpan={2}>단원</th>
                    <th colSpan={5}>수행현황</th>
                    <th rowSpan={2}>학습 완료</th>
                    <th rowSpan={2}>오답<br/>정복하기<br /><button className="btn">생성</button></th>
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
                        return <Tr key={data.name} data={data}/>;
                    })
                }
            </tbody>

                
            </table>
        </>
    )
}

const Tr = ({data}) => {
    return(
        <tr>
            <td>{data.name}</td>
            <td>{data.state1}</td>
            <td>{data.state2}<button className="btn">재응시</button></td>
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
                {data.state4}
                <button className='btn'>재응시</button>
            </td>
            <td>
                {data.state5}
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
export default ClassManagement;