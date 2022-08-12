import React, {useEffect, useState} from 'react';
import ContentHeader from '../components/ContentHeader';
import {getStudentsList} from '../feature/studentsListSlice';
import { useSelector, useDispatch } from 'react-redux'
import PlusLearningSearch from './PlusLearning/PlusLearningSearch';
import PlusLearningContent from './PlusLearning/PlusLearningContent';


function PlusLearning() {

    let {user} = useSelector(state=>state.studentList);
    let dispatch = useDispatch();
    let [tab, setTab] = useState("서술형");

    useEffect(()=>{
        dispatch(getStudentsList())
    },[])

    return ( 
        <div className='container'>
            <ContentHeader title={"플러스 러닝"} />
            <div className="btn-group">
                <button 
                className={'btn' + `${tab === "서술형" ? " active" : ''}`}
                onClick={()=>{setTab("서술형")}}
                >서술형 따라잡기</button>
                <button 
                className={'btn' + `${tab === "교과서" ? " active" : ''}`}
                onClick={()=>{setTab("교과서")}}
                >교과서 적중문제</button>
            </div>
            <div className="row">
                <PlusLearningSearch user={user} />
                <PlusLearningContent tab={tab}/>
            </div>
        </div>
     );
}

export default PlusLearning;