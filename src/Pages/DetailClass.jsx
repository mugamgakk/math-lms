import React from 'react';
import ContentHeader from '../components/ContentHeader';
import DetailClassContent from './DetailClass/DetailClassContent';
import StudentsSearch from '../components/StudentsSearch';
import { useState } from 'react';



function DetailClass() {

    let [location, setLocation] = useState("");

    return ( 
        <>
            <ContentHeader 
            title={'학생별 수업 관리'} 
            location={["마이페이지","수학 학습 관리"]}
            icon="studentManagement"
            current={'학생별 수업 관리'}
            />
            <div className='row'>
            <StudentsSearch/>
            <DetailClassContent setLocation={setLocation}/>
            </div>
        </>
     );
}

export default DetailClass;