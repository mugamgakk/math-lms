import React, {useEffect, useState} from 'react';
import ContentHeader from '../components/ContentHeader';
import { useSelector, useDispatch } from 'react-redux'
import PlusLearningSearch from './PlusLearning/PlusLearningSearch';
import PlusLearningContent from './PlusLearning/PlusLearningContent';


function PlusLearning() {

    let {user} = useSelector(state=>state.studentList);
    let [tab, setTab] = useState("서술형");


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