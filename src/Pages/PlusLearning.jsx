import React, {useState, useEffect} from 'react';
import ContentHeader from '../components/ContentHeader';
import { useDispatch } from 'react-redux'
import PlusLearningContent from './PlusLearning/PlusLearningContent';
import {setClickStudent, getUserData} from '../feature/studentsSearchSlice';
import StudentsSearch from '../components/StudentsSearch';


function PlusLearning() {

    
    let [tab, setTab] = useState("서술형");
    let dispatch = useDispatch();

    const clickTab = (param)=>{
        setTab(param);
        dispatch(setClickStudent(null))
    }

    useEffect(()=>{
        dispatch(getUserData())
    },[])

    
    return ( 
        <div className='container'>
            <ContentHeader title={"플러스 러닝"} />
            <div className="btn-group">
                <button 
                className={'btn' + `${tab === "서술형" ? " active" : ''}`}
                onClick={()=>{clickTab("서술형")}}
                >서술형 따라잡기</button>
                <button 
                className={'btn' + `${tab === "교과서" ? " active" : ''}`}
                onClick={()=>{clickTab("교과서")}}
                >교과서 적중문제</button>
            </div>
            <div className="row">
                <StudentsSearch/>
                <PlusLearningContent tab={tab} />
            </div>
        </div>
     );
}

export default PlusLearning;