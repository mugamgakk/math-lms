import React from 'react';
import {useSelector} from 'react-redux';
import AlertBox from '../../components/AlertBox';
import ClassTabs from './classTabs/ClassTabs';


function DetailClassContent() {

    let {clickStudent} = useSelector((state)=> state.studentsSearchSlice)


    return ( 
        <div className="students-contents">
            
            {
                clickStudent === null
                ? <AlertBox name="수업 관리 시작"/>
                : <ClassTabs/>
            }

        </div>
     );
}



export default DetailClassContent;