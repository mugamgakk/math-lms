import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import SelectTextbook from '../../components/ui/SelectTextbook';
import LearningBreakdownTable from './LearningBreakdownTable';


function ClassTabs() {

    let [tabState, setTabState] = useState(0);
    let {clickStudent} = useSelector(state => state.studentList);


    return ( 
        <div className='class-tabs'>
            <div className='btn-group' style={{margin : "10px 0"}}>
                <button 
                className={'btn' + `${tabState === 0 ? ' active' : ''}`}
                onClick={()=>{setTabState(0)}}
                >수업 관리</button>
                <button 
                className={'btn' + `${tabState === 1 ? ' active' : ''}`}
                onClick={()=>{setTabState(1)}}
                >오답 정복하기</button>
                <button 
                className={'btn' + `${tabState === 2 ? ' active' : ''}`}
                onClick={()=>{setTabState(2)}}
                >학습 분석표</button>
                <button 
                className={'btn' + `${tabState === 3 ? ' active' : ''}`}
                onClick={()=>{setTabState(3)}}
                >출결 관리</button>
            </div>

            <dl className='row user-info'>
                <div>
                    <dt>학생이름</dt>
                    <dd>{clickStudent.name}</dd>
                </div>
                <div>
                    <dt>교재</dt>
                    <dd>
                        <SelectTextbook/>
                    </dd>
                </div>
                <div>
                    <dt>학년</dt>
                    <dd>{clickStudent.age}</dd>
                </div>
            </dl>

            {
                {
                    0 : <div>1</div>,
                    1 : <div>2</div>,
                    2 : <LearningBreakdownTable/>,
                    3 : <div>4</div>
                }[tabState]
            }
        </div>
     );
}

export default ClassTabs;