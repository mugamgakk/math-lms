import React, { useState } from "react";
import AlertBox from "../../components/AlertBox";
import ContentHeader from "../../components/ContentHeader";
import jindanStore from "../../store/jindanStore";
import JindanContent from "./JindanContent";
import JinDanSearch from "./JinDanSearch";

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

                {jindanStudent === null ? <div className="bg bg-content"> <AlertBox name="진단평가" /> </div>: <JindanContent />}
                
            </div>
        </>
    );
}

export default EvaluationJindan;
