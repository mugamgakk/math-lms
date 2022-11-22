import React, { useState } from 'react';
import ContentHeader from '../components/ContentHeader';
import EvaluationRoutine from './Evaluation/EvaluationRoutine';
import EvaluationJindan from './Evaluation/EvaluationJindan';
import useStudentsStore from '../store/useStudentsStore';
import StudentsSearch from '../components/StudentsSearch';
import AlertBox from '../components/AlertBox';
import UserInfo from '../components/UserInfo';

function Evaluation() {
    const resetStudent = useStudentsStore(state => state.resetStudent);
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [tab, setTab] = useState("진단평가");

    const clickTab = (param) => {
        setTab(param);
        // resetStudent()
    }


    return (
        <>
            <ContentHeader
                title={"평가 관리"}
                location={["마이페이지", "수학 학습 관리", "평가 관리"]}
                icon="evaluation"
                current={"재원생정기평가"}
            />

            <div className="row">
                <StudentsSearch />
                <div className="bg bg-content">

                    {
                        clickStudent === null
                            ? <AlertBox />
                            : (
                                <>
                                    <div className="tabs-header">
                                        <ul className='content-tabs'>
                                            <li
                                                onClick={() => { clickTab("재원생정기평가") }}
                                                className={`${tab === "재원생정기평가" ? "active" : ""}`}>재원생정기평가</li>
                                            <li
                                                onClick={() => { clickTab("진단평가") }}
                                                className={`${tab === "진단평가" ? "active" : ""}`}>진단평가</li>
                                        </ul>
                                    </div>
                                    <UserInfo clickStudent={clickStudent} />
                                    {
                                        {
                                            재원생정기평가: <EvaluationRoutine />,
                                            진단평가: <EvaluationJindan />
                                        }[tab]
                                    }
                                </>
                            )
                    }
                </div>
            </div>



        </>
    );
}

export default Evaluation;