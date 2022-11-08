import React, { useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import { useEffect } from "react";
import axios from "axios";
import SkeletonTable from "../../components/SkeletonTable";
import ajax from "../../ajax";
import NarrativeTr from "./NarrativeTr";

const 단원 = ["수와 식의 계산", "가나다라 마바사"];
const stateOptions = [
    { value: "P", label: "오픈전" },
    { value: "S", label: "학습중" },
    { value: "C", label: "완료" },
];

const DATA = [
    {
        sc_seq: 123,
        ltitle: "I. 수와 식의 계산",
        sc_title: "01> 거듭제곱 ⑴",
        sc_status: "P",
        sc_std_score: 18,
        sc_max_score: 20,
        sc_per_score: 90
    },
    {
        sc_seq: 123,
        ltitle: "I. 수와 식의 계산",
        sc_title: "01> 거듭제곱 ⑴",
        sc_status: "S",
        sc_std_score: 18,
        sc_max_score: 20,
        sc_per_score: 90
    },
    {
        sc_seq: 123,
        ltitle: "I. 수와 식의 계산",
        sc_title: "01> 거듭제곱 ⑴",
        sc_status: "C",
        sc_std_score: 18,
        sc_max_score: 20,
        sc_per_score: 90
    },
    {
        sc_seq: 123,
        ltitle: "I. 수와 식의 계산",
        sc_title: "01> 거듭제곱 ⑴",
        sc_status: "P",
        sc_std_score: 18,
        sc_max_score: 20,
        sc_per_score: 90
    },
]

function Narrative() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    const bookList = useStudentsStore((state) => state.bookList);
    // tr data
    let [plusData, setPlusData] = useState([]);
    // 단원
    let [unit, setUnit] = useState("");
    // 상태
    let [situation, setSituation] = useState("");
    let [checkedList, setCheckedList] = useState([]);
    let [skeleton, setSkeleton] = useState(true);

    const [initialData, setInitialData] = useState([]);

    const checkAll = (e) => {
        e.target.checked ? setCheckedList(plusData) : setCheckedList([]);
    }

    const checkOne = (checked, ele) => {
        checked ? setCheckedList([...checkedList, ele]) : setCheckedList(checkedList.filter((a) => a !== ele))
    }

    // 선택오픈, 오픈 취소
    const openState = async (isOpen) => {
        if (checkedList.length === 0) alert("1개이상 선택하세요");

        const idData = checkedList.map(id => id.sc_seq);
        const data = {
            arr_sc_seq: idData
        }

        isOpen ? data.mode = "ct_open" : data.mode = "ct_close";

        try {
            let res = await ajax("class_plus.php", data)


        } catch (err) {

        }
    }


    const getList = async () => {
        setSkeleton(true);

        const data = {
            mode: "ct_list",
            usr_seq: clickStudent.usr_seq,
            qlno: 1,
            qstatus: "P",
            qbkcd: "M11_CO1"
        }

        try {
            // let res = await ajax("class_plus.php", {data});
            let res = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(10)
                }, 1000)
            })

            setPlusData([...DATA]);
            setInitialData([...DATA]);
            setSkeleton(false);

        } catch (msg) {
            setSkeleton(false);
            // alert(msg)
        }
    }

    useEffect(() => {
        getList()
    }, [clickStudent])

    return (
        <div className="Narrative">
            <UserInfo clickStudent={clickStudent} />
            <p>
                학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="fj mb-3">
                <div>
                    <button className="btn" onClick={() => { openState(true) }}>선택 오픈</button>
                    <button className="btn" onClick={() => { openState(false) }}>선택 오픈 취소</button>
                    <button className="btn" onClick={() => {
                        if (checkedList.length === 0) alert("1개이상 선택하세요");

                    }}>선택 인쇄</button>
                </div>
                <div className="row">
                    <SelectBase
                        width="200px"
                        options={단원}
                        value={unit}
                        onChange={(ele) => {
                            setUnit(ele);
                        }}
                        defaultValue="대단원"
                    />
                    <SelectBase
                        width="100px"
                        options={stateOptions}
                        value={situation}
                        onChange={(ele) => {
                            setSituation(ele);
                        }}
                        defaultValue="상태"
                    />
                    <button className="btn">조회</button>
                </div>
            </div>
            <table>
                <colgroup>
                    <col style={{ width: "50px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            선택{" "}
                            <input
                                type="checkbox"
                                checked={initialData.length === checkedList.length}
                                onChange={checkAll}
                            />
                        </th>
                        <th>대단원</th>
                        <th>주제</th>
                        <th>상태</th>
                        <th>채점</th>
                        <th>시험지</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        skeleton
                            ? <SkeletonTable R={6} D={6} />
                            : plusData.map((ele, i) => {
                                return (
                                    <NarrativeTr
                                        ele={ele}
                                        key={`key${i}`}
                                        checkOne={checkOne}
                                        checkedList={checkedList}
                                    />
                                );
                            })
                    }

                </tbody>
            </table>
        </div>
    );
}






export default Narrative;
