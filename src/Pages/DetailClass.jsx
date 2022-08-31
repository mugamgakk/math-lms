import React, { useEffect } from 'react';
import ContentHeader from '../components/ContentHeader';
import { useDispatch } from 'react-redux'
import DetailClassContent from './DetailClass/DetailClassContent';
import StudentsSearch from '../components/StudentsSearch';
import {getUserData} from '../feature/studentsSearchSlice'




function DetailClass() {

    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserData())
    },[])



    return ( 
        <div className='container'>
            <ContentHeader title={'학생별 수업 관리'} />
            <div className='row'>
            <StudentsSearch/>
            <DetailClassContent/>
            </div>
        </div>
     );
}

export default DetailClass;