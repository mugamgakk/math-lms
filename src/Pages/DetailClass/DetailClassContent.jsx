import React from 'react';
import {useSelector} from 'react-redux';
import Pagination from '../../components/Pagination'
import ClassTabs from './classTabs/ClassTabs';
import DetailClassAlert from './DetailClassAlert';


function DetailClassContent() {

    let {clickStudent} = useSelector((state)=> state.studentList)


    return ( 
        <div className="students-contents">
            
            {
                clickStudent.name === ''
                ? <DetailClassAlert/>
                : <ClassTabs/>
            }

            <Pagination/>

        </div>
     );
}



export default DetailClassContent;