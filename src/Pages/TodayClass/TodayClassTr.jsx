import React, { useState, useEffect } from 'react';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from './PrintModal';

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

    
    //  데이터별 예외처리
    const tdStateFunc = (data) => {
        if(!data) return;
        if(data.assessment){
            return(
                <button 
                className='evalBtn btn'
                onClick={()=>openModal('assessmentModal')}>
                이해:{data.uds} 전달:{data.send}
                </button>
            )
        }
        return <button className='evalBtn btn' onClick={()=>openModal('assessmentModal')}>수행 평가</button>;
    }

    const tdPrintFunc = (data) => {
        if(!data) return;
        if(data === 'Pass') return 'Pass';
        return (
            <>
                <div>{data}</div>
                <button className='printBtn btn'onClick={()=>openModal('printModal')}>인쇄</button>
            </>
        );
    }

    const checkDisabled = (data) => {
        if(data === undefined) return 'disabled';
    }

    return(
            <tr>
                    {tdName}
                    {tdBook}
                    <td>{data.tit}</td>
                    <td className={checkDisabled(data.state1)}>{data.state1}</td>
                    <td className={checkDisabled(data.state2)}>{data.state2}</td>
                    <td className={checkDisabled(data.state3)}>
                        {
                        data.state3 ? (
                            <div className="btn-wrap">
                                <button className={ data.state3.newplay ? 'btnPlay new' : 'btnPlay'} onClick={()=>openModal('assessmentModal')}>play</button>
                                <button className='btnDown'>down</button>
                            </div>
                            )
                        : null
                    }
                    {tdStateFunc(data.state3)}
                    </td>
                    <td className={checkDisabled(data.state4)}>{data.state4}</td>
                    <td className={checkDisabled(data.state5)}>{tdPrintFunc(data.state5)}</td>
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