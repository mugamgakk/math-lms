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
        <div className='bg bg-content student-content'>
            {
                clickStudent === null
                    ? <AlertBox name="수업 관리 시작" />
                    : (
                        <>
                            <div className='student-content-header'>
                                <ul className='student-content-tab'>
                                    {
                                        classItems.map((a, index)=>{
                                            return (
                                                <li
                                                key={index}
                                                onClick={() => {
                                                    setTabState(index);
                                                    // setLocation(">" + a);
                                                }}
                                                className={`${tabState === index ? " active" : ""}`}
                                                >
                                                    {a}
                                                </li>
                                            )
                                        })
                                    }
                                    <li></li>
                                </ul>
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