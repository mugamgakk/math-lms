import React from 'react';



function AlertBox({name}) {
    return (
        <div className='alert-box'>
            <h4>
                <strong>
                [{name}]
                </strong>
             학생 이름(아이디)을 클릭하세요. 
            </h4>
            <p>
            * 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
            </p>
        </div>
    );
}

export default AlertBox;