import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import StudentsSearch from "../components/StudentsSearch";
import useStudentsStore from "../store/useStudentsStore";
import AlertBox from "../components/AlertBox";
import Narrative from "./PlusLearning/Narrative";
import TextBook from "./PlusLearning/TextBook";

function PlusLearning() {
    const clickStudent = useStudentsStore(state => state.clickStudent)
    let { resetStudent } = useStudentsStore((state) => state);

    let [tab, setTab] = useState("서술형");
    let [location, setLocation] = useState("서술형 따라잡기");

    const clickTab = (param) => {
        setTab(param);
        // resetStudent();
    };

    return (
        <>
            <ContentHeader
                title={"플러스 러닝"}
                location={["마이페이지", "수학 학습 관리", "플러스 학습"]}
                icon="plusLearning"
                current={"플러스 러닝"}
            />
            <div className="row">
                <StudentsSearch >
                    {/* <ul className="content-tabs" >
                    <li 
                    className={`${tab === "서술형" ? " active" : ""}`}
                    onClick={() => {
                        clickTab("서술형");
                        setLocation("서술형 따라잡기");
                    }}
                    >서술형 따라잡기</li>
                    <li
                        className={`${tab === "교과서" ? " active" : ""}`}
                        onClick={() => {
                            clickTab("교과서");
                            setLocation("교과서 적중문제");
                        }}
                    >교과서 적중문제</li>
                </ul> */}
                </StudentsSearch>
                <div className='bg bg-content'>

                    {
                        clickStudent === null
                            ? <AlertBox name={tab} bg="pink" />
                            : (
                                <>
                                <div className="tabs-header">
                                    <ul className="content-tabs" >
                                        <li
                                            className={`${tab === "서술형" ? " active" : ""}`}
                                            onClick={() => {
                                                clickTab("서술형");
                                                setLocation("서술형 따라잡기");
                                            }}
                                        >서술형 따라잡기</li>
                                        <li
                                            className={`${tab === "교과서" ? " active" : ""}`}
                                            onClick={() => {
                                                clickTab("교과서");
                                                setLocation("교과서 적중문제");
                                            }}
                                        >교과서 적중문제</li>
                                    </ul>
                                    </div>
                                    {
                                        {
                                            서술형: <Narrative />,
                                            교과서: <TextBook />
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

export default PlusLearning;
