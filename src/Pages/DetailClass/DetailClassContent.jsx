import React from 'react';
import {useSelector} from 'react-redux';
import ClassTabs from './classTabs/ClassTabs';
import DetailClassAlert from './DetailClassAlert';


function DetailClassContent() {

    let {clickStudent} = useSelector((state)=> state.studentList)


    return ( 
        <div className="students-contents">
            
            {
                clickStudent === null
                ? <DetailClassAlert/>
                : <ClassTabs/>
            }

        </div>
     );
}



export default DetailClassContent;