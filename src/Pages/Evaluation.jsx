import React, {useState} from 'react';
import ContentHeader from '../components/ContentHeader';
import EvaluationRoutine from './Evaluation/EvaluationRoutine';
import EvaluationJindan from './Evaluation/EvaluationJindan';
import useStudentsStore from '../store/useStudentsStore';

function Evaluation() {
    const resetStudent = useStudentsStore(state=>state.resetStudent)

    let [tab, setTab] = useState("재원생정기평가");

    const clickTab = (param)=>{
        setTab(param);
        resetStudent()
    }


    return ( 
        <>
            <ContentHeader title={"평가 관리"}/>
            <div className="btn-group mb-3">
                <button 
                className={'btn mr-2' + `${tab === "재원생정기평가" ? " active" : ''}`}
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
          
        </>
     );
}

export default Evaluation;