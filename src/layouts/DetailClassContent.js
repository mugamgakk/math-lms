import React from 'react';
import {useSelector} from 'react-redux';
import SelectBase from '../components/ui/SelectBase';
import SelectTextbook from '../components/ui/SelectTextbook';
import ClassTabs from './classTabs/ClassTabs';


function DetailClassContent() {

    let {clickStudent} = useSelector((state)=> state.studentList)


    return ( 
        <div className="students-contents">
            {
                clickStudent.name === ''
                ? <DetailClassAlert/>
                : <ClassTabs/>
            }

            <SelectTextbook/>
            {/* <SelectBase/> */}
                
        </div>
     );
}

function DetailClassAlert(){
    return(
        <div style={{padding : "20px", backgroundColor : "yellow"}}>
            [수업 관리 시작] 학생 이름(아이디)을 클릭하세요. 
            <br/>
            * 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
        </div>
    )
}

export default DetailClassContent;