import React, { useState } from 'react';
import AlertBox from '../../components/AlertBox';
import useStudentsStore from '../../store/useStudentsStore';
import UserInfo from '../../components/UserInfo';
import AttendanceManagement from "./classTabs/AttendanceManagement";
import LearningBreakdownTable from "./classTabs/LearningBreakdownTable";
import ClassManagement from "./classTabs/ClassManagement";
import WrongAnswerMaster from "./classTabs/WrongAnswerMaster"

const classItems = ["수업 관리", "오답 정복하기", "학습 분석표", "출결 관리"];


function DetailClassContent({ setLocation }) {

    const clickStudent = useStudentsStore(state => state.clickStudent);
    let [tabState, setTabState] = useState(0);

    return (
        <div className='bg col-8'>
            {
                clickStudent === null
                    ? <AlertBox name="수업 관리 시작" />
                    : (
                        <>
                            <div className="mb-3">
                                {classItems.map((a, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={"btn mr-2" + `${tabState === index ? " active" : ""}`}
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
                                    1: <WrongAnswerMaster clickStudent={clickStudent} />,
                                    2: <LearningBreakdownTable />,
                                    3: <AttendanceManagement />,
                                }[tabState]
                            }
                        </>
                    )
            }
        </div>
    );
}



export default DetailClassContent;