import React, { useState } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import { useEffect } from "react";
import SkeletonTable from "../../components/SkeletonTable";
import ajax from "../../ajax";
import NarrativeTr from "./NarrativeTr";
import { _cloneDeep, _isScroll } from "../../methods/methods";
import Checkbox from "../../components/Checkbox";
import NarrativePrint from "../../components/NarrativePrint";

const 단원 = [
    { value: 1, label: "수와 식의 계산" },
    { value: 2, label: "수와 수의 곱샘" },
];
const stateOptions = [
    { value: "P", label: "오픈전" },
    { value: "S", label: "학습중" },
    { value: "C", label: "완료" },
];


function Narrative() {
    const { clickStudent, bookList } = useStudentsStore((state) => state);

    // tr data
    let [plusData, setPlusData] = useState([]);

    // 단원
    let [unit, setUnit] = useState();
    // 상태
    let [situation, setSituation] = useState();

    let [checkedList, setCheckedList] = useState([]);
    let [skeleton, setSkeleton] = useState(true);

    let [printModal, setPrintModal] = useState(false);

    const [initialData, setInitialData] = useState([]);

    let [scroll, setScroll] = useState(false);

    const checkAll = (e) => {
        e.target.checked ? setCheckedList(plusData) : setCheckedList([]);
    };

    const checkOne = (checked, ele) => {
        checked
            ? setCheckedList([...checkedList, ele])
            : setCheckedList(checkedList.filter((a) => a !== ele));
    };

    // 선택오픈, 오픈 취소
    const openState = async (isOpen) => {
        try {
            if (checkedList.length === 0) {
                alert("1개이상 선택하세요");
                return;
            }

            const idData = checkedList.map((id) => id.sc_seq);
            const data = {
                arr_sc_seq: idData,
            };

            isOpen ? (data.mode = "ct_open") : (data.mode = "ct_close");

            // console.log(data);

            let res = await ajax("class_plus.php", { data });
            // console.log(res)

        } catch (err) {
            console.log(err);
        }
    };

    const getList = async () => {
        setSkeleton(true);

        const data = {
            mode: "ct_list",
            usr_seq: clickStudent.usr_seq,
            qlno: unit?.value,
            qstatus: situation?.value,
            qbkcd: bookList.value,
        };

        // console.log(data);

        try {
            let res = await ajax("/class_plus.php", { data });
            // let res = await axios("/json/pluslearning_narrative.json");

            // console.log(res.data);

            setPlusData(_cloneDeep(res.data));

            setInitialData(_cloneDeep(res.data));

            setSkeleton(false);
        } catch (msg) {
            console.error(msg);
            setSkeleton(false);
        }
    };

    useEffect(() => {
        getList();
    }, [clickStudent]);

    useEffect(() => {
        setScroll(_isScroll("narrative-table", 365));
    });

    return (
        <div className="Narrative">
            {
                printModal && <NarrativePrint closeModal={setPrintModal} sc_seq={checkedList.map(a=> a.sc_seq )} />
            }
            <UserInfo clickStudent={clickStudent} />
            <p className="alert-text" style={{ marginTop: "20px" }}>
                학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="fj" style={{ margin: "10px 0px" }}>
                <div>
                    <button
                        className="btn-grey-border mr-10"
                        onClick={() => {
                            openState(true);
                        }}
                    >
                        선택 오픈
                    </button>
                    <button
                        className="btn-grey-border"
                        onClick={() => {
                            if (checkedList.length === 0){
                                alert("1개이상 선택하세요");
                            } else{
                                setPrintModal(true)
                            }
                        }}
                    >
                        선택 인쇄
                    </button>
                </div>
                <div className="row">
                    <SelectBase
                        width="200px"
                        options={단원}
                        value={unit}
                        onChange={(ele) => {
                            setUnit(ele);
                        }}
                        className="mr-10"
                        defaultValue="대단원"
                    />
                    <SelectBase
                        width="100px"
                        options={stateOptions}
                        value={situation}
                        onChange={(ele) => {
                            setSituation(ele);
                        }}
                        className="mr-10"
                        defaultValue="상태"
                    />
                    <button className="btn-grey" onClick={getList}>
                        조회
                    </button>
                </div>
            </div>

            <table className="custom-table narrative-table">
                <thead>
                    <tr>
                        <th scope="row" style={{ width: "8.80316%" }}>
                            <Checkbox
                                checked={
                                    initialData.length === checkedList.length &&
                                    checkedList.length !== 0
                                }
                                onChange={checkAll}
                            />
                            선택
                        </th>
                        <th scope="row" style={{ width: "17.60633%" }}>
                            대단원
                        </th>
                        <th scope="row" style={{ width: "34.11374%" }}>
                            주제
                        </th>
                        <th scope="row" style={{ width: "13.84767%" }}>
                            상태
                        </th>
                        <th scope="row" style={{ width: "13.25420%" }}>
                            채점
                        </th>
                        <th scope="row" style={{ width: "12.37487%" }}>
                            시험지
                        </th>
                        {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                    </tr>
                </thead>
                <tbody style={{maxHeight : "365px"}}>
                    {skeleton ? (
                        <SkeletonTable
                            R={6}
                            width={[
                                "8.80316%",
                                "17.60633%",
                                "34.11374%",
                                "13.84767%",
                                "13.25420%",
                                "12.37487%",
                            ]}
                        />
                    ) : (
                        plusData.map((ele, i) => {
                            return (
                                <NarrativeTr
                                    ele={ele}
                                    key={`key${i}`}
                                    checkOne={checkOne}
                                    checkedList={checkedList}
                                />
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Narrative;
