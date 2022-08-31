import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../../components/AlertBox';
import StudentsSearch from '../../components/StudentsSearch';
import UserInfo from '../../components/UserInfo';
import {getUserData} from '../../feature/studentsSearchSlice'


function EvaluationRoutine() {
    let dispatch = useDispatch();
    let {clickStudent} = useSelector((state)=> state.studentsSearchSlice)


    useEffect(()=>{
        dispatch(getUserData())
    },[])

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