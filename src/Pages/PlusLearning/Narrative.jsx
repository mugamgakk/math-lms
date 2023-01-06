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
import Icon from "../../components/Icon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";
import axios from "axios";
// import { fetchData } from "../../methods/methods";

const 단원 = [
    {value : null, label : "대단원"},
    { value: 1, label: "수와 식의 계산" },
    { value: 2, label: "수와 수의 곱샘" }
];
const stateOptions = [
    {value : null, label : "상태"},
    { value: "P", label: "오픈전" },
    { value: "S", label: "학습중" },
    { value: "C", label: "완료" },
];

const fetchData = async (url, param) => {
    // console.log(param);
    let res = await axios("/json/pluslearning_narrative.json");
    return res.data;
};



function Narrative() {
    const { clickStudent, bookList } = useStudentsStore((state) => state);
    const queryClient = useQueryClient();

    // 단원
    let [unit, setUnit] = useState();
    // 상태
    let [situation, setSituation] = useState();

    let [checkedList, setCheckedList] = useState([]);

    let [printModal, setPrintModal] = useState(false);

    let [scroll, setScroll] = useState(false);

    // Queries

    const data = useMemo(() => {
        return {
            mode: "ct_list",
            usr_seq: clickStudent.usr_seq,
            qlno: unit?.value,
            qstatus: situation?.value,
            qbkcd: bookList.value,
        };
    }, [clickStudent.usr_seq, unit, situation, bookList]);

    // get Data
    const list = useQuery(["lists", clickStudent.usr_seq, bookList], () => fetchData("class_plus", data), {
        refetchOnWindowFocus : false
    });

    // send Data
    const openMutation = useMutation((param) => {
        return ajax("/class_plus.php", { data: param });
    }, {
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries("lists");
        },
    });

    // 선택오픈
    const openState = () => {
        if (checkedList.length === 0) {
            alert("1개이상 선택하세요");
            return;
        }

        if (checkedList.every((a) => a.sc_status === "S")) {
            // 복수 오픈 시 , 오픈 전 시험지가 하나라도 있으면 정상 작동
            // 오픈된시험지만 선택된 경우 , 알럿 이미 오픈된 시험지입니다 . 확인
            alert("이미 오픈된 시험지입니다.");
            setCheckedList([]);
            return;
        }

        const idData = checkedList.map((id) => id.sc_seq);
        const data = {
            mode: "ct_open",
            arr_sc_seq: idData,
        };

        openMutation.mutate(data);
    };

    const checkAll = (e) => {
        e.target.checked ? setCheckedList(list.data) : setCheckedList([]);
    };

    const checkOne = (checked, ele) => {
        checked
            ? setCheckedList([...checkedList, ele])
            : setCheckedList(checkedList.filter((a) => a !== ele));
    };

    useEffect(() => {
        setScroll(_isScroll("narrative-table", 365));
    });

    return (
        <div className="Narrative">
            <button
                className="btn-grey btn-icon btn-retry"
                onClick={() => {
                    list.refetch();
                }}
            >
                <Icon icon={"reload"} />
                새로 고침
            </button>
            {printModal && (
                <NarrativePrint
                    closeModal={setPrintModal}
                    sc_seq={checkedList.map((a) => a.sc_seq)}
                />
            )}
            <UserInfo clickStudent={clickStudent} />
            <p className="alert-text" style={{ marginTop: "28px", marginBottom: "55px" }}>
                ※ 학습하는 교재의 학년, 학기에 해당하는 서술형 문제를 오픈, 출력할 수
                있습니다.(학년-학기별 공통)
            </p>
            <div className="fj">
                <div>
                    <button
                        className="btn-grey-border mr-10"
                        style={{ width: "100px" }}
                        onClick={openState}
                    >
                        선택 오픈
                    </button>
                    <button
                        className="btn-grey-border"
                        style={{ width: "100px" }}
                        onClick={() => {
                            if (checkedList.length === 0) {
                                alert("1개이상 선택하세요");
                                return;
                            }

                            if (checkedList.some((a) => a.sc_status === "P")) {
                                alert("서술형 따라잡기 학습지를 먼저 오픈해 주세요.");
                                return;
                            }

                            setPrintModal(true);
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
                        width="150px"
                        options={stateOptions}
                        value={situation}
                        onChange={(ele) => {
                            setSituation(ele);
                        }}
                        className="mr-10"
                        defaultValue="상태"
                    />
                    <button
                        className="btn-green btn-icon"
                        style={{ width: "81px" }}
                        onClick={()=>{
                            list.refetch();
                        }}
                    >
                        <Icon icon={"search"} />
                        조회
                    </button>
                </div>
            </div>

            <table className="custom-table narrative-table" style={{marginTop : "20px"}}>
                <thead>
                    <tr>
                        <th scope="row" style={{ width: "8.80316%" }}>
                            <Checkbox
                                checked={list.data?.length === checkedList.length}
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
                <tbody style={{ maxHeight: "365px" }}>
                    {list.isFetching ? (
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
                        list.data?.map((ele, i) => {
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
