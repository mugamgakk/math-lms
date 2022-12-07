import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../../components/Icon";
import SelectBase from "../../components/ui/select/SelectBase";
import PrintModal from "../../components/PrintModal_clinic";

const 학년 = [
    {label : "초등 2학년", value : "초등 2학년"},
    {label : "초등 3학년", value : "초등 3학년"},
    {label : "초등 4학년", value : "초등 4학년"},
    {label : "초등 5학년", value : "초등 5학년"},
    {label : "초등 6학년", value : "초등 6학년"},
    {label : "중등 1학년", value : "중등 1학년"},
    {label : "중등 2학년", value : "중등 2학년"},
    {label : "중등 3학년", value : "중등 3학년"}
];

const 학기 = [
    {label : "1학기", value : "1학기"},
    {label : "2학기", value : "2학기"}
]

function EvaluationPrint() {
    let [grade, setGrade] = useState();
    let [semester, setSemester] = useState();
    let [initialSemester, setInitialSemester] = useState(학기);
    let state = useRef(false);
    let [printModal, setPrintModal] = useState(false);

    useEffect(() => {
        if (state.current === false) {
            state.current = true;
            return;
        }

        if (grade === "초등 2학년") {
            setInitialSemester({label : "2학기", value : "2학기"});
        } else {
            setInitialSemester(학기);
        }
    }, [grade]);

    const print = ()=>{
        setPrintModal(true);
    }

    return (
        <div className="EvaluationPrint">

            {
                printModal && <PrintModal title="진단평가 중2" closeModal={setPrintModal}/>
            }

            <h4>진단 평가지</h4>
            <SelectBase
                width={140}
                value={grade}
                onChange={(ele) => {
                    setGrade(ele);
                    setSemester()
                }}
                options={학년}
                defaultValue="학년"
            />
            <SelectBase
                width={140}
                value={semester}
                onChange={(ele) => setSemester(ele)}
                options={initialSemester}
                defaultValue="학기"
            />
            <button className="btn-grey-border btn-icon" onClick={print}>
            <Icon icon={"print"} />
            인쇄</button>
        </div>
    );
}

export default EvaluationPrint;
