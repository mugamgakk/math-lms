import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import StatisticsSearch from "./Statistics/StatisticsSearch";
import StatisticsStandard from "./Statistics/StatisticsStandard";

function Statistics() {
    return (
        <div className="Statistics container">
            <ContentHeader title={"학습 포인트 현황"} />

            {/* 지플럼 수학 학습 포인트 지급 기준 */}
            <StatisticsStandard/>

            <div className="Statistics-search fj">
                <div>
                    <button className="btn">초기화</button>
                    <button className="btn">다운로드</button>
                </div>
                <StatisticsSearch />
            </div>

            <table></table>
        </div>
    );
}

export default Statistics;
