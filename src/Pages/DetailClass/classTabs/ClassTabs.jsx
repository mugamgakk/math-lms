import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfo from '../../../components/UserInfo';
import AttendanceManagement from './AttendanceManagement';
import LearningBreakdownTable from './LearningBreakdownTable';
import ClassManagement from './ClassManagement';


function ClassTabs() {

    let [tabState, setTabState] = useState(0);
    let {clickStudent} = useSelector(state=>state.studentsSearchSlice)


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

            <UserInfo clickStudent={clickStudent}/>

            {
                {
                    0 : <ClassManagement />,
                    1 : <div>2</div>,
                    2 : <LearningBreakdownTable/>,
                    3 : <AttendanceManagement/>
                }[tabState]
            }
        </div>
     );
}

export default ClassTabs;