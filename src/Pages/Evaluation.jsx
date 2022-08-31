import React, {useEffect, useState} from 'react';
import ContentHeader from '../components/ContentHeader';
import { useDispatch } from 'react-redux';
import {getUserData, setClickStudent} from '../feature/studentsSearchSlice'
import EvaluationRoutine from './Evaluation/EvaluationRoutine';
import EvaluationJindan from './Evaluation/EvaluationJindan';


function Evaluation() {

    let [tab, setTab] = useState("재원생정기평가");
    let dispatch = useDispatch();

    const clickTab = (param)=>{
        setTab(param);
        dispatch(setClickStudent(null))
    }


    return ( 
        <div className='container'>
            <ContentHeader title={"평가 관리"}/>
            <div className="btn-group">
                <button 
                className={'btn' + `${tab === "재원생정기평가" ? " active" : ''}`}
                onClick={()=>{clickTab("재원생정기평가")}}
                >재원생 정기평가</button>
                <button 
                className={'btn' + `${tab === "진단평가" ? " active" : ''}`}
                onClick={()=>{clickTab("진단평가")}}
                >진단평가</button>
            </div>

            {
                {
                    재원생정기평가 : <EvaluationRoutine/>,
                    진단평가 : <EvaluationJindan/>
                }[tab]
            }
          
        </div>
     );
}

export default Evaluation;