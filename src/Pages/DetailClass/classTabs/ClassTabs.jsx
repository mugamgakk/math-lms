import React, { useState } from "react";
import UserInfo from "../../../components/UserInfo";
import AttendanceManagement from "./AttendanceManagement";
import LearningBreakdownTable from "./LearningBreakdownTable";
import ClassManagement from "./ClassManagement";

const classItems = ["수업 관리", "오답 정복하기", "학습 분석표", "출결 관리"];

function ClassTabs({ clickStudent }) {
    let [tabState, setTabState] = useState(0);

    return (
        <div className="class-tabs">
            <div className="btn-group" style={{ margin: "10px 0" }}>
                {classItems.map((a, index) => {
                    return (
                        <button
                            className={"btn" + `${tabState === index ? " active" : ""}`}
                            onClick={() => {
                                setTabState(index);
                            }}
                        >
                            {a}
                        </button>
                    );
                })}
            </div>

            <UserInfo clickStudent={clickStudent} />

            {
                {
                    0: <ClassManagement clickStudent={clickStudent} />,
                    1: <div>2</div>,
                    2: <LearningBreakdownTable />,
                    3: <AttendanceManagement />,
                }[tabState]
            }
        </div>
    );
}

export default ClassTabs;
