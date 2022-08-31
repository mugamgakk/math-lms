import React, { useState, useEffect } from 'react';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from '../../components/PrintModal';

function TodayClassTr({data,name,book,tdName,tdBook}){

    // 모달 상태 관리
    let [modalCondition,setModalCondition] = useState({
        attModal : false,
        assessmentModal : false,
        printModal : false,
    });
    
    const closeModal = (target) => {
        setModalCondition({
            ...modalCondition,
            [target] : false,
        })
    }
    
    const openModal = (target) => {
        setModalCondition({
            ...modalCondition,
            [target] : !modalCondition[target],            
        });
    }

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
                        <button className={ data.state3.newplay ? 'btnPlay new' : 'btnPlay'} onClick={()=>openModal('assessmentModal')} >play</button>
                        <button className='btnDown'>down</button>
                        </div>
                    )
                }
                {
                    data.state3 ?  data.state3?.assessment ? (
                        <div>
                            <button className='evalBtn btn' onClick={()=>openModal('assessmentModal')}>
                            이해:{data.state3.uds} 전달:{data.state3.send}
                            </button>
                        </div>
                    ) : <button className='evalBtn btn' onClick={()=>openModal('assessmentModal')}>수행 평가</button> 
                    : null
                }
                </td>
                <td className={data.state4 ? '' : 'disabled'}>{data.state4}</td>
                <td className={data.state5 ? '' : 'disabled'}>
                    
                    { 
                        data.state5 == 'Pass' ? 'Pass' : (
                            <div>
                            <div>{data.state5}</div>
                            <button className='printBtn btn' onClick={()=>openModal('printModal')}>인쇄</button>
                            </div>
                        )
                    }
                </td>
                <td><button className="attBtn btn" onClick={()=>openModal('attModal')}>학습 태도</button>
                    {
                    modalCondition.attModal ? 
                    <AttModal 
                    name={name}
                    book={book}
                    cl={data.tit}
                    sodanwon={data.sodanwon}
                    closeModal={closeModal}
                    /> 
                    : null
                    }
                    {
                    modalCondition.assessmentModal ? 
                    <AssessmentModal 
                    name={name}
                    book={book}
                    cl={data.tit}
                    sodanwon={data.sodanwon}
                    closeModal={closeModal}
                    /> 
                    : null
                    }
                    {
                    modalCondition.printModal ? 
                    <PrintModal 
                    name={name}
                    book={book}
                    cl={data.tit}
                    sodanwon={data.sodanwon}
                    closeModal={closeModal}
                    /> 
                    : null
                    }
                    
                </td>
            </tr>
    )
}
export default TodayClassTr;