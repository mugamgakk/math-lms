import React, { useState } from "react";
import UserInfo from "../../../components/UserInfo";
import AttendanceManagement from "./AttendanceManagement";
import LearningBreakdownTable from "./LearningBreakdownTable";
import ClassManagement from "./ClassManagement";
import WrongAnswerMaster from "./WrongAnswerMaster";

const classItems = ["수업 관리", "오답 정복하기", "학습 분석표", "출결 관리"];

function ClassTabs({ clickStudent, setLocation }) {
    let [tabState, setTabState] = useState(0);

    return (
        <div>
            <div>
                {classItems.map((a, index) => {
                    return (
                        <button
                            key={index}
                            className={"btn" + `${tabState === index ? " active" : ""}`}
                            onClick={() => {
                                setTabState(index);
                                setLocation(">" + a);
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
                    1: <WrongAnswerMaster />,
                    2: <LearningBreakdownTable />,
                    3: <AttendanceManagement />,
                }[tabState]
            }
        </div>
    );
}

export default ClassTabs;
