import React, { useEffect } from 'react';
import ContentHeader from '../components/ContentHeader';
import { useSelector, useDispatch } from 'react-redux'
import {getStudentsList} from '../feature/studentsListSlice';
import DetailClassContent from './DetailClass/DetailClassContent';
import DetailClassSearch from './DetailClass/DetailClassSearch';
import '../style/DetailClass/detail-class.scss';




function DetailClass() {

    let {user} = useSelector(state=>state.studentList);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStudentsList())
    },[])

    return ( 
        <div className='container'>
            <ContentHeader title={'학생별 수업 관리'} />
            <div className='row'>
            <DetailClassSearch user={user} />
            <DetailClassContent/>
            </div>
        </div>
     );
}

export default DetailClass;