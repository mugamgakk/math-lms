import React from 'react';
import { useEffect } from 'react';
import AlertBox from '../../components/AlertBox';
import StudentsSearch from '../../components/StudentsSearch';
import UserInfo from '../../components/UserInfo';
import useStudentsStore from '../../store/useStudentsStore';


function EvaluationRoutine() {

    const clickStudent = useStudentsStore(state=>state.clickStudent);


    return ( 
        <div className="row">
            <StudentsSearch/>
            {
                clickStudent === null
                ? <AlertBox bg='pink' name="재원생 정기평가 관리" />
                : (
                    <div style={{width : "840px"}}>
                        <UserInfo clickStudent={clickStudent}/>
                    </div>
                )
            }
            
        </div>
     );
}

export default EvaluationRoutine;