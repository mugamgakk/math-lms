import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from './PrintModal';



const TodayClass = ({findTodayList}) => {
    const list = findTodayList;
    console.log(list);
    
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
    
    const getNameRowspan = (student) => {
        let rowSpan = 0;
        const { book : books} = student;
        books.forEach((book) => {
            rowSpan += book.className.length;
        });
        return rowSpan;
    }


    const tbodies = list.map((student,k) => {
        let trLength = Number(getNameRowspan(student));
        // let trArray = [...Array(trLength)].map((v,i)=> i );
        // console.log(trArray);

       
        const { book : books} = student;
        
        const firstRow = books.map((book,v)=>{ 

            const { className : classes} = book;
           
            const classList = (a) => { 
                const aa = classes.map((_class,i)=>{
                    const name = (i === 0 && v === 0) ? <td rowSpan={trLength}>{student.name}({student.nickName})</td> : null;
                    const bookTd = i === 0 ? <td rowSpan={classes.length}>{book.bookTit}</td> : null;
                // classlist의 개수만큼 book td 의 rowspan 값 / classList의 i===0 일때 book td 존재
                console.log(student.name,a.bookTit,_class.tit);
                return (
                        <tr key={i}>
                            {name}
                            {bookTd}
                            <td>{_class.tit}</td>
                            <td className={checkDisabled(_class.state1)}>{_class.state1}</td>
                            <td className={checkDisabled(_class.state2)}>{_class.state2}</td>
                            <td className={checkDisabled(_class.state3)}>
                                {
                                _class.state3 ? (
                                    <div className="btn-wrap">
                                        <button className={ _class.state3.newplay ? 'btnPlay new' : 'btnPlay'} onClick={()=>openModal('assessmentModal')}>play</button>
                                        <button className='btnDown'>down</button>
                                    </div>
                                    )
                                : null
                            }
                            {tdStateFunc(_class.state3)}
                            </td>
                            <td className={checkDisabled(_class.state4)}>{_class.state4}</td>
                            <td className={checkDisabled(_class.state5)}>{tdPrintFunc(_class.state5)}</td>
                            <td><button className="attBtn btn" onClick={()=>openModal('attModal')}>학습 태도</button>
                             {
                                modalCondition.attModal ? 
                                <AttModal 
                                name={student.name}
                                book={a.bookTit}
                                cl={_class.tit}
                                sodanwon={_class.sodanwon}
                                closeModal={closeModal}
                                /> 
                                : null
                            }
                            {/* {
                                modalCondition.assessmentModal ? 
                                <AssessmentModal 
                                name={list.name}
                                book={a.bookTit}
                                cl={_class.tit}
                                sodanwon={_class.sodanwon}
                                closeModal={closeModal} /> 
                                : null
                            }
                            {
                                modalCondition.printModal ? 
                                <PrintModal 
                                name={list.name}
                                book={book.bookTit}
                                cl={_class.tit}
                                sodanwon={_class.sodanwon}
                                closeModal={closeModal}
                                /> 
                                : null
                            } */}
                        </td>
                    </tr>
                )
            });
            return aa;
           };
           return classList(book);
        });

         return(
                <tbody key={student.id} className={student.name}>
                    {firstRow}
                </tbody> 
        )
    }) 
    return tbodies;
}
export default TodayClass;