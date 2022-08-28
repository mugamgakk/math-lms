import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import AssessmentModal from './AssessmentModal';
import AttModal from './AttModal';
import PrintModal from './PrintModal';

const TodayClass = () => {
    const list = useSelector(state=>state.todayClassList);
    
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
        if(!data) return '-';
        if(data === 'Pass') return 'Pass';
        return (
            <>
                <div>{data}</div>
                <button className='printBtn btn'>인쇄</button>
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
        console.log(books);
        
        const firstRow = books.map((book,v)=>{ 
            const { className : classes} = book;
            console.log(classes.length);
            
            const classList = classes.map((_class,i)=>{
                const bookTd = i === 0 ? <td rowSpan={classes.length}>{book.bookTit}</td> : null;
                const name = i === 0 ? <td rowSpan={trLength}>{student.name}({student.nickName})</td> : null;
                
                // classlist의 개수만큼 book td 의 rowspan 을 정해준다 i===0일때 book td 존재
                
                return (
                        <tr>
                            {name}
                            {bookTd}
                            <td>{_class.tit}</td>
                            <td className={checkDisabled(_class.state1)}>{_class.state1}</td>
                            <td className={checkDisabled(_class.state2)}>{_class.state2}</td>
                            <td className={checkDisabled(_class.state3)}>
                                {
                                _class.state3 ? (
                                    <div className="btn-wrap">
                                        <button className='btnPlay'>play</button>
                                        <button className='btnDown'>down</button>
                                    </div>
                                    )
                                : null
                            }
                            {tdStateFunc(_class.state3)}
                            </td>
                            <td className={checkDisabled(_class.state4)}>{_class.state4}</td>
                            <td className={checkDisabled(_class.state5)}>{tdPrintFunc(_class.state5)}</td>
                            <td><button className="attBtn btn">학습 태도</button>
                             {
                    modalCondition.attModal ? 
                    <AttModal 
                    list={list}
                    name={list.name}
                    book={list.book}
                    cl={list.class}
                    sodanwon={list.sodanwon}
                    closeModal={closeModal}
                    /> 
                    : null
                }
                {
                    modalCondition.assessmentModal ? 
                    <AssessmentModal 
                    list={list}
                    name={list.name}
                    book={list.book}
                    cl={list.class}
                    sodanwon={list.sodanwon}
                    closeModal={closeModal} /> 
                    : null
                }
                {
                    modalCondition.printModal ? 
                    <PrintModal 
                    list={list}
                    name={list.name}
                    book={list.book}
                    cl={list.class}
                    sodanwon={list.sodanwon}
                    closeModal={closeModal}
                    /> 
                    : null
                }
                            </td>
                        </tr>
                )
           })
           
           return classList;
        });

         return(
                <tbody key={student.id} className={student.name}>
                    {firstRow}
                </tbody> 
        )
    }) 
    return(
        <>
            {tbodies}
        </>
    )
}
export default TodayClass;