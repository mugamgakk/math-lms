import React from 'react';
import styled from 'styled-components';

const Box =  styled.div`
    padding : 15px;
    background-color : #dc3545;
    color : #fff;
    line-height : 26px;
    font-size : 16px;
`


function AlertBox({name}) {
    return (
        <div style={{width  : "100%"}}>
        <Box>
            [{name}] 학생 이름(아이디)을 클릭하세요. 
            <br/>
            * 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
        </Box>
        </div>
    );
}

export default AlertBox;