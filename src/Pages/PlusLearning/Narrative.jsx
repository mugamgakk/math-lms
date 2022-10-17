import React, { useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import { memo } from "react";
import PlusLearningGradingModal from "./PlusLearningGradingModal";
import { useEffect } from "react";
import axios from "axios";
import SkeletonTable from "../../components/SkeletonTable";
import { useRef } from "react";
import PrintModal from "../../components/PrintModal";

const 단원 = ["수와 식의 계산", "가나다라 마바사"];
const 상태 = ["오픈전", "학습중", "학습완료"];

function Narrative() {
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let [plusData, setPlusData] = useState([]);
    let [unit, setUnit] = useState(); // 단원
    let [situation, setSituation] = useState(); // 상태
    let [checkedList, setCheckedList] = useState([]);
    let [skeleton, setSkeleton] = useState(true);

    const initialData = useRef([]);

    useEffect(() => {
        setPlusData([]);
        setSkeleton(true);

        axios.post("http://192.168.11.178:8080/pluslearning/narrative").then((res) => {
            setPlusData(res.data.list);
            initialData.current = res.data.list;
            setSkeleton(false);
        });
    }, [clickStudent]);

    const checkAll = (e) => {
        const { checked } = e.target;

        checked ? setCheckedList(initialData.current) : setCheckedList([]);
    };

    const checkOne = (checked, ele) => {
        if (checked) {
            setCheckedList([...checkedList, ele]);
        } else {
            setCheckedList(checkedList.filter((a) => a !== ele));
        }
    };

    return (
        <div className="Narrative">
            <UserInfo clickStudent={clickStudent} />
            <p>
                학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="justify-content-between">
                <div>
                    <button className="btn">선택 오픈</button>
                    <button className="btn">선택 인쇄</button>
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
                        options={상태}
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
                                checked={initialData.current.length === checkedList.length}
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
                    {/* {plusData.map((res) => {
                        return <PlusTrData key={res.id} type="narrative" res={res} />;
                    })} */}

                    {skeleton && <SkeletonTable R={6} D={6} />}

                    {plusData.map((ele,i) => {
                        return (
                            <Tr
                                ele={ele}
                                key={`key${i}`}
                                checkOne={checkOne}
                                checkedList={checkedList}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = memo(({ ele, checkOne, checkedList }) => {
    let [modal, setModal] = useState(false);
    let [printModal, setPrintModal] = useState(false);

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checkedList.includes(ele)}
                    onChange={(e) => {
                        checkOne(e.target.checked, ele);
                    }}
                />
            </td>
            <td>{ele.대단원}</td>
            <td>{ele.주제}</td>
            <td>{ele.상태}</td>
            <td>
                {ele.채점 === "온라인 채점" ? (
                    <>
                        {ele.채점}
                        <button
                            className="btn"
                            onClick={() => {
                                setModal(true);
                            }}
                        >
                            채점하기
                        </button>
                        {modal && <PlusLearningGradingModal userId={ele._id} setModal={setModal} />}
                    </>
                ) : (
                    ele.채점
                )}
            </td>
            <td>
                {
                    printModal && <PrintModal closeModal={setPrintModal}/>
                }
                <button type="button" className="btn" onClick={()=>{setPrintModal(true)}}>
                    인쇄
                </button>
            </td>
        </tr>
    );
});




export default Narrative;
