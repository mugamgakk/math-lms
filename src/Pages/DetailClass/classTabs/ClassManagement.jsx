// yeonju
import React, { useState, memo, useEffect } from "react";
import ajax from "../../../ajax";
import ProgressModal from "../modal/progressModal";
import CreationModal from "../modal/CreationModal";
import ResultPopModal from "../modal/ResultPopModal";
import useStudentsStore from "../../../store/useStudentsStore";
import { useCallback } from "react";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import PrintModal_clinic from "../../../components/PrintModal_clinic";
import AssessmentModal from "../../TodayClass/AssessmentModal";
import { fetchData, _isScroll } from "../../../methods/methods";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

const HoverOrange = styled.span`
    font-weight: 400;
    color: #444;
    cursor: pointer;
    &:hover {
        color: #ea7851;
    }
`;

function ClassManagement() {
    const bookList = useStudentsStore((state) => state.bookList);
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [progressMo, setProgressState] = useState(false);
    let [creationMo, setCreationMo] = useState(false);

    let [checkedList, setCheckedList] = useState([]);

    let [scroll, setScroll] = useState();

    const param = {
        mode: "unit_list",
        usr_seq: clickStudent.usr_seq,
        bk_cd: bookList.value,
    };


    const getList = useQuery(
        ["classManage", bookList, clickStudent],
        () => fetchData("class_manage", param),
        {
            refetchOnWindowFocus: false,
            onSuccess: function () {
                // console.log("다시 가져옴");
            },
        }
    );

    // console.log(param)
    console.log(getList.data)

    const allRetryMutaion = useMutation(
        (param) => {
            return ajax("/class_manage.php", { data: param });
        },
        {
            onSuccess: function () {
                alert("모두 재응시");
            },
        }
    );

    // 오답정복하기 생성 - ucode 배열
    const createWrongResult = () => {};

    // 오답정복하기 클릭

    useEffect(() => {
        setScroll(_isScroll("classManagement-table", 482));
    });
    return (
        <div className="detailClass classManagement">
            <div className="fj mb-10">
                <p className="warning">
                    ※ 메인 관리 교재를 체크 표시해 두면 오늘의 수업에서 학습 관리하기 편리합니다.
                    (최대 6 종)
                </p>
                <div className="table-top fa">
                    <button
                        className="btn-orange mr-10"
                        style={{ width: "146px" }}
                        onClick={() => setProgressState(true)}
                    >
                        학습 진행률 보기
                    </button>
                    <button
                        className="btn-grey btn-icon"
                        style={{ width: "107px" }}
                        onClick={() => {
                            getList.refetch();
                        }}
                    >
                        <Icon icon={"reload"} />
                        새로고침
                    </button>
                </div>
            </div>

            {/* 학습 진행률 */}
            {progressMo && (
                <ProgressModal setProgressState={setProgressState} name={clickStudent.name} />
            )}

            {/* 오답 정복하기 생성 */}
            {/* {creationMo && <CreationModal setCreationMo={setCreationMo} ucode={wrongPopList} />} */}

            <div className="table-wrap">
                <div className="tableHead fa">
                    <div className="fc" style={{ width: "19.8%" }}>
                        단원
                    </div>
                    <div style={{ width: "59.4%" }} className="row f-column">
                        <div className="state fc">수행 현황</div>
                        <div className="row b-none">
                            <div className="fc" style={{ width: "20%" }}>
                                개념 강의
                            </div>
                            <div className="fc f-column" style={{ width: "20%" }}>
                                개념 확인
                                <button
                                    className="btn-creation"
                                    onClick={() => {
                                        allRetryMutaion.mutate({
                                            mode: "set_retry",
                                            ucode: getList.data?.[0].unit2.map((a) => a.ucode),
                                            sa_kind: "QA",
                                            usr_seq: clickStudent.usr_seq,
                                        });
                                    }}
                                >
                                    일괄 재응시
                                </button>
                            </div>
                            <div className="fc" style={{ width: "20%" }}>
                                개념 설명
                            </div>
                            <div className="fc" style={{ width: "20%" }}>
                                유형 학습
                            </div>
                            <div className="b-none fc" style={{ width: "20%" }}>
                                맞춤 클리닉
                            </div>
                        </div>
                    </div>
                    <div className="fc" style={{ width: "11.88%" }}>
                        학습 완료
                    </div>
                    <div className="b-none fc" style={{ width: "8.91%" }}>
                        오답
                        <br />
                        정복하기
                        <button className="btn-creation">생성</button>
                    </div>
                    {scroll && <div className="b-none" style={{ width: "15px" }}></div>}
                </div>

                <table className="custom-table classManagement-table ">
                    <tbody>
                        {getList.data?.map((a, i) => {
                            return (
                                <Unit
                                    ele={a}
                                    key={i}
                                    checkedList={checkedList}
                                    setCheckedList={setCheckedList}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const Unit = ({ ele }) => {
    let [checkedItem, setCheckedItem] = useState([]);

    const allCheck = (checked) => {
        checked ? setCheckedItem(ele.unit2) : setCheckedItem([]);
    };

    const oneCheck = (checked, ele) => {
        checked
            ? setCheckedItem([...checkedItem, ele])
            : setCheckedItem(checkedItem.filter((a) => a !== ele));
    };

    return (
        <>
            <tr className="unit1" style={{ height: "44px" }}>
                <td className="t-start b-none" style={{ width: "19.8%" }}>
                    <span>{ele.unit1}</span>
                </td>
                <td style={{ width: "71.29%" }} className="b-none"></td>
                <td style={{ width: "8.91%" }} className="b-none">
                    <Checkbox
                        color="green"
                        checked={checkedItem.length === ele.unit2.length}
                        onChange={(e) => allCheck(e.target.checked)}
                    />
                </td>
            </tr>

            {ele.unit2.map((a, i) => {
                return <Tr ele={a} key={i} checkedItem={checkedItem} oneCheck={oneCheck} />;
            })}
        </>
    );
};

const Tr = ({ ele, checkedItem, oneCheck }) => {
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    let [resultPop, setResultPop] = useState(false);
    let [printMo, setPrintMo] = useState(false);
    let [audioModal, setAudioModal] = useState(false);

    const queryClient = useQueryClient();

    const retryMutation = useMutation(
        (param) => {
            return ajax("/class_manage.php", { data: param });
        },
        {
            onSuccess: (res) => {
                alert("재응시");
                console.log(res);
                queryClient.invalidateQueries("classManage");
            },
        }
    );

    const finishMutaion = useMutation(
        (param) => {
            return ajax("/class_manage.php", { data: param });
        },
        {
            onSuccess: function (res) {
                console.log(res);
                alert("완료");
            },
        }
    );

    return (
        <tr>
            <td className="t-start" style={{ width: "19.8%" }}>
                {ele.title}
            </td>
            <td
                style={{ width: "11.88%" }}
                className={ele.state1 ? (ele.state1 === "100%" ? "active" : "") : "disabled"}
            >
                {ele.state1}
            </td>

            {/* 개념확인 */}
            <td style={{ width: "11.88%" }} className={ele.state1 === "100%" ? "active" : ""}>
                <div>
                    {ele.state2.score}
                    <button
                        className={`btn-table-orange-border ${ele.state2.avail ? "" : "disabled"}`}
                        onClick={() => {
                            retryMutation.mutate({
                                mode: "set_retry",
                                ucode: [ele.ucode],
                                sd_kind: "QA",
                            });
                        }}
                    >
                        재응시({ele.state2.retry})
                    </button>
                </div>
            </td>
            <td
                style={{ width: "11.88%" }}
                className={
                    Object.keys(ele.state3).length == 0
                        ? "disabled"
                        : ele.state1 === "100%"
                        ? "active"
                        : ""
                }
            >
                {Object.keys(ele.state3).length !== 0 ? (
                    ele.state3.file_url ? (
                        <div>
                            <button
                                className={`playBtn ${ele.state3.newplay ? "new" : ""}`}
                                onClick={() => setAudioModal(true)}
                            >
                                <Icon icon={"play"} style={{ fontSize: "14px", color: "#444" }} />
                            </button>
                            <button
                                className={`btn-table-orange ${
                                    ele.state3.avail ? "btn" : "btn disabled"
                                }`}
                                onClick={() => setAudioModal(true)}
                            >
                                이해:{ele.state3.uds} 전달:{ele.state3.send}
                            </button>
                            {audioModal && <AssessmentModal closeModal={setAudioModal} />}
                        </div>
                    ) : (
                        <div>
                            <div>-</div>
                            <button className="btn-table-orange-border">수행 평가</button>
                        </div>
                    )
                ) : null}
            </td>
            <td style={{ width: "11.88%" }} className={ele.state1 === "100%" ? "active" : ""}>
                <div>
                    <HoverOrange
                        onClick={() => {
                            setResultPop(true);
                        }}
                    >
                        {ele.state4.score}
                    </HoverOrange>
                    <button
                        className={`btn-table-orange-border ${
                            ele.state4.avail ? "btn" : "btn disabled"
                        }`}
                        onClick={() => {
                            retryMutation.mutate({
                                mode: "set_retry",
                                ucode: [ele.ucode],
                                sd_kind: "QA",
                            });
                        }}
                    >
                        재응시({ele.state4.retry})
                    </button>
                </div>
                {resultPop && <ResultPopModal setResultPop={setResultPop} ucode={ele.ucode} />}
            </td>
            <td
                style={{ width: "11.88%" }}
                className={
                    Object.keys(ele.state5).length == 0
                        ? "disabled"
                        : ele.state1 === "100%"
                        ? "active"
                        : ""
                }
            >
                {Object.keys(ele.state5).length !== 0 ? (
                    ele.state5.avail ? (
                        <div>
                            <div>{ele.state5.score}</div>
                            <button
                                className="btn-table-orange-border btn-icon"
                                style={{ marginBottom: "4px" }}
                                onClick={() => setPrintMo(true)}
                            >
                                <Icon icon={"print"} />
                                인쇄
                            </button>
                            {printMo && (
                                <PrintModal_clinic closeModal={setPrintMo} title="맞춤 클리닉" />
                            )}
                            <button
                                className="btn-table-orange-border"
                                onClick={() => {
                                    retryMutation.mutate({
                                        mode: "set_retry",
                                        ucode: [ele.ucode],
                                        sd_kind: "WC",
                                    });
                                }}
                            >
                                재응시({ele.state5.retry})
                            </button>
                        </div>
                    ) : (
                        <div>-</div>
                    )
                ) : null}
            </td>
            <td style={{ width: "11.88%" }}>
                <div>
                    <button
                        className="btn-table"
                        onClick={() => {
                            finishMutaion.mutate({
                                mode: "set_passed",
                                ucode: ele.ucode,
                                usr_seq: clickStudent.usr_seq,
                            });
                        }}
                    >
                        학습 완료
                    </button>
                    <button className="btn-table-orange" style={{ marginTop: "4px" }}>
                        학습 태도
                    </button>
                </div>
            </td>
            <td style={{ width: "8.91%" }}>
                <Checkbox
                    color="green"
                    checked={checkedItem.includes(ele)}
                    onChange={(e) => oneCheck(e.target.checked, ele)}
                />
            </td>
        </tr>
    );
};

export default ClassManagement;
