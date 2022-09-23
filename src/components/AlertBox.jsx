import React from 'react';
import styled from 'styled-components';

const Box =  styled.div`
    padding : 20px;
    background-color : ${props=> props.bg}
`


function AlertBox({bg = "yellow", name}) {
    return (
        <div style={{width  : "100%"}}>
        <Box bg={bg}>
            [{name}] 학생 이름(아이디)을 클릭하세요. 
            <br/>
            * 학생 화면 ‘로그인’을 클릭하면 학생의 학습 화면을 확인할 수 있습니다.
        </Box>
        </div>
    );
}

export default AlertBox;