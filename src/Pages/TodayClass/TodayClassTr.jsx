import React, { useState, useEffect } from 'react';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from '../../components/PrintModal';
import { fileDown } from "../../methods/methods";
import 오디오입니동 from "../../test.mp3";
import Icon from '../../components/Icon';

function TodayClassTr({data,name,book}){

    // 모달 상태 관리
    let [attModal,setAttModal] = useState(false);
    let [assModal,setAssModal] = useState(false);
    let [printModal,closeModal] = useState(false);

    return(
        <>
                <div className={`state1 fc br ${data.state1 ? '' : 'disabled'}`} style={{ width:'9.846%' }}>{data.state1}</div>
                <div className={`state2 fc br ${data.state2 ? '' : 'disabled'}`} style={{ width:'9.846%' }}>{data.state2}</div>
                <div className={`state3 fc br ${data.state3 ? '' : 'disabled'}`} style={{ width:'9.846%',flexDirection:'column' }}>
                {
                    data.state3 && (
                        <button className={`playBtn ${data.state3.newplay ? 'new' : ''}`} onClick={()=>setAssModal(true)} >
                            <Icon icon={"play"} style={{ fontSize:'14px',color:'#444' }} />
                        </button>
                    )
                }
                {
                    data.state3 ? data.state3?.assessment ? (
                        <div>
                            <button className='btn-orange' onClick={()=>setAssModal(true)} style={{ fontSize: '14px' }}>
                            이해{data.state3.uds}&nbsp;
                            전달{data.state3.send}
                            </button>
                        </div>
                    ) : <button className='btn-table' onClick={()=>setAssModal(true)}>수행 평가</button> 
                    : null
                }
                </div>
                <div className={`state4 fc br ${data.state4 ? '' : 'disabled'}`} style={{ width:'9.846%' }}>{data.state4}</div>
                <div className={`state5 fc br ${data.state5 ? '' : 'disabled'}`} style={{ width:'9.846%' }}>
                    { 
                        data.state5 ?
                        data.state5 == 'Pass' ? 'Pass' : (
                            <>
                            <div style={{ marginBottom:'4px' }}>{data.state5}</div>
                            <button className='btn-table' onClick={()=>closeModal(true)} style={{ width:'100px' }}><Icon icon={"print"} style={{color:'#666',marginRight:'6px'}}/>인쇄</button>
                            </>
                        ) : null
                    }
                </div>
                <div className="fc" style={{ width:'11.37%' }}><button className="btn-table" onClick={()=>setAttModal(true)}>학습 태도</button>
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
                    
                </div>
        </>

         
    )
}
export default TodayClassTr;