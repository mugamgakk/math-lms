import React from 'react';
import AlertBox from '../../components/AlertBox';
import ClassTabs from './classTabs/ClassTabs';
import useStudentsStore from '../../store/useStudentsStore';


function DetailClassContent({setLocation}) {

    const clickStudent = useStudentsStore(state=>state.clickStudent)

    return ( 
        <div className="students-contents">
            
            {
                clickStudent === null
                ? <AlertBox name="수업 관리 시작"/>
                : <ClassTabs clickStudent={clickStudent} setLocation={setLocation} />
            }

        </div>
     );
}



export default DetailClassContent;