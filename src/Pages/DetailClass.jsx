import React from 'react';
import ContentHeader from '../components/ContentHeader';
import DetailClassContent from './DetailClass/DetailClassContent';
import StudentsSearch from '../components/StudentsSearch';



function DetailClass() {

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