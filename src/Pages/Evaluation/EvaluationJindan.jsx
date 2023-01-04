import React, { useState } from "react";
import AlertBox from "../../components/AlertBox";
import ContentHeader from "../../components/ContentHeader";
import jindanStore from "../../store/jindanStore";
import JindanContent from "./JindanContent";
import JinDanSearch from "./JinDanSearch";
import styled from "styled-components";

const Box = styled.div`
    height : 61px;
    background-color : #f2eeeb;
    padding : 20px 18px;
    margin-top : 123px;
    p{
        color : #eb615a;
        font-weight : 600
    }
`

function EvaluationJindan() {
    const jindanStudent = jindanStore(state=>state.jindanStudent);
    return (
        <>
            <ContentHeader
                title={"평가 관리"}
                location={["마이페이지", "수학 학습 관리", "평가 관리"]}
                icon="evaluation"
                current="진단평가"
            />
            <div className="row layout-height">
                <JinDanSearch />

                {jindanStudent === null ? <div className="bg bg-content"> <Box><p>※ [진단평가] 학생명(아이디)를 클릭하세요.</p></Box></div>: <JindanContent />}
                
            </div>
        </>
    );
}

export default EvaluationJindan;
