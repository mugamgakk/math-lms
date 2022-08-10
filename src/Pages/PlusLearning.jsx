import React, {useEffect} from 'react';
import ContentHeader from '../components/ContentHeader';
import DetailClassSearch from './DetailClass/DetailClassSearch';
import {getStudentsList} from '../feature/studentsListSlice';
import { useSelector, useDispatch } from 'react-redux'


function PlusLearning() {

    let {user} = useSelector(state=>state.studentList);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStudentsList())
    },[])

    return ( 
        <div className='container'>
            <ContentHeader title={"플러스 러닝"} />
            <div className="row">
                <DetailClassSearch user={user} />
            </div>
        </div>
     );
}

export default PlusLearning;