import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";

const 학년 = [
    "초등 2학년",
    "초등 3학년",
    "초등 4학년",
    "초등 5학년",
    "초등 6학년",
    "중등 1학년",
    "중등 2학년",
    "중등 3학년",
];

function EvaluationPrint() {
    let [grade, setGrade] = useState();
    let [semester, setSemester] = useState();
    let [initialSemester, setInitialSemester] = useState(["1학기", "2학기"]);
    let state = useRef(false);

    useEffect(() => {
        if (state.current === false) {
            state.current = true;
            return;
        }

        if (grade === "초등 2학년") {
            setInitialSemester(["2학기"]);
        } else {
            setInitialSemester(["1학기", "2학기"]);
        }
    }, [grade]);

    const print = ()=>{
        // console.log(grade , semester)
    }

    return (
        <div className="fa mb-3">
            <h4>진단 평가지</h4>
            <SelectBase
                width={100}
                value={grade}
                onChange={(ele) => {
                    setGrade(ele);
                    setSemester()
                }}
                options={학년}
                defaultValue="학년"
            />
            <SelectBase
                width={100}
                value={semester}
                onChange={(ele) => setSemester(ele)}
                options={initialSemester}
                defaultValue="학기"
            />
            <button className="btn" onClick={print}>인쇄</button>
        </div>
    );
}

export default EvaluationPrint;
