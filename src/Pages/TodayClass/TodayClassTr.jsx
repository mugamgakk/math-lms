import React, { useState, useEffect } from 'react';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from '../../components/PrintModal';
import { fileDown } from "../../methods/methods";
import 오디오입니동 from "../../test.mp3";

function TodayClassTr({data,name,book,tdName,tdBook}){

    // 모달 상태 관리
    let [attModal,setAttModal] = useState(false);
    let [assModal,setAssModal] = useState(false);
    let [printModal,closeModal] = useState(false);
   
    return(
            <tr>
                {tdName}
                {tdBook}
                <td>{data.tit}</td>
                <td className={data.state1 ? '' : 'disabled'}>{data.state1}</td>
                <td className={data.state2 ? '' : 'disabled'}>{data.state2}</td>
                <td className={data.state3 ? '' : 'disabled'}>
                {
                    data.state3 && (
                        <div className="btn-wrap">
                        <button className={ data.state3.newplay ? 'btnPlay new' : 'btnPlay'} onClick={()=>setAssModal(true)} >play</button>
                        </div>
                    )
                }
                {
                    data.state3 ? data.state3?.assessment ? (
                        <div>
                            <button className='evalBtn btn' onClick={()=>setAssModal(true)}>
                            이해:{data.state3.uds} 전달:{data.state3.send}
                            </button>
                        </div>
                    ) : <button className='evalBtn btn' onClick={()=>setAssModal(true)}>수행 평가</button> 
                    : null
                }
                </td>
                <td className={data.state4 ? '' : 'disabled'}>{data.state4}</td>
                <td className={data.state5 ? '' : 'disabled'}>
                    
                    { 
                        data.state5 ?
                        data.state5 == 'Pass' ? 'Pass' : (
                            <div>
                            <div>{data.state5}</div>
                            <button className='printBtn btn' onClick={()=>closeModal(true)}>인쇄</button>
                            </div>
                        ) : null
                    }
                </td>
                <td><button className="attBtn btn" onClick={()=>setAttModal(true)}>학습 태도</button>
                    {
                    attModal ? 
                    <AttModal 
                    setAttModal={setAttModal}
                    /> 
                    : null
                    }
                    {
                   assModal ? 
                    <AssessmentModal 
                    setAssModal={setAssModal}
                    /> 
                    : null
                    }
                    {
                    printModal ? 
                    <PrintModal 
                    title={`${name}/${book}/${data.tit}/${data.sodanwon}`}
                    closeModal={closeModal}
                    /> 
                    : null
                    }
                    
                </td>
            </tr>
    )
}
export default TodayClassTr;