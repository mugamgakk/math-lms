import React from 'react';


function PlusLearningAlert({contentName}) {
    return ( 
        <div style={{padding : "20px", backgroundColor : "yellow"}}>
            [{contentName === "서술형" ? "서술형 따라잡기" : '교과서 적중문제'}] 학생 이름(아이디)을 클릭하세요. 
        <br/>
        * 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
        </div>
     );
}

export default PlusLearningAlert;