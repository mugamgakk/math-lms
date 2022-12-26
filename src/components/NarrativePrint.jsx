import React, { useState } from "react";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { _cloneDeep } from "../methods/methods";
import { useEffect } from "react";
import ajax from "../ajax";

function NarrativePrint({ closeModal, sc_seq }) {
    const printComponent = React.useRef();

    let [page, setPage] = useState(1);
    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);

    // 문제보기 view
    let [lists, setLists] = useState(null);
    // 풀이보기 view
    let [solveList, setSolveList] = useState(null);

    const checkState = (checked, ele) => {
        if (checked) {
            setCheckData([...checkData, ele]);
        } else {
            setCheckData(checkData.filter((data) => data !== ele));
        }
    };

    // 우클릭 드래그 방지
    const eventAlert = (e) => {
        e.preventDefault();
    };

    const getPrint = async () => {
        let res = await ajax("/class_plus.php", { data: { mode: "ct_print", sc_seq } });

        let 문제 = res.data.map((a) => "https://file.parallaxedu.com/pxm/gplum" + a.pq_filename);
        let 답 = res.data.map((a) => "https://file.parallaxedu.com/pxm/gplum" + a.ps_filename);
        setLists(문제);
        setSolveList(답);

        // console.log(res.data);
    };

    // 탭변경 페이지 초기화
    useEffect(() => {
        setPage(1);
    }, [viewState]);

    // 문제로드
    useEffect(() => {
        getPrint();
    }, []);

    return (
        <div className="modal print-modal">
            <div className="modal-content" style={{ width: "1025px" }}>
                <div className="modal-header fj">
                    <h2 className="modal-title">서술형 따라잡기</h2>
                    <button className="btn" onClick={() => closeModal(false)}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name" style={{ paddingLeft: "20px" }}>
                        <strong className="name">강수학</strong>
                        <ul className="list">
                            <li>중2-1</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div style={{ padding: "20px", height: "calc(100% - 50px)" }}>
                        <div className="fj" style={{ marginBottom: "10px" }}>
                            <div>
                                <button
                                    className={`${
                                        viewState === "question" ? "btn-brown" : "btn-grey"
                                    }`}
                                    onClick={() => setViewState("question")}
                                    style={{ minWidth: "100px", marginRight: "4px" }}
                                >
                                    문제 보기
                                </button>
                                <button
                                    className={`${
                                        viewState === "solution" ? "btn-brown" : "btn-grey"
                                    }`}
                                    onClick={() => setViewState("solution")}
                                    style={{ minWidth: "100px" }}
                                >
                                    모범 답안 보기
                                </button>
                            </div>
                            <div>
                                <Checkbox
                                    color="green"
                                    checked={checkData.includes("question")}
                                    id="question"
                                    onChange={(e) => checkState(e.target.checked, "question")}
                                />
                                <label htmlFor="question" className="mr-10">
                                    문제지
                                </label>
                                <Checkbox
                                    color="green"
                                    checked={checkData.includes("solution")}
                                    id="solution"
                                    onChange={(e) => checkState(e.target.checked, "solution")}
                                />
                                <label htmlFor="solution" className="mr-10">
                                    모범 답안
                                </label>
                                <ReactToPrint
                                    trigger={() => (
                                        <button
                                            className="btn-orange btn-icon"
                                            style={{ minWidth: "100px" }}
                                        >
                                            <Icon icon={"print"} />
                                            인쇄
                                        </button>
                                    )}
                                    content={() => printComponent.current}
                                />
                            </div>
                        </div>
                        <div className="narrative-print">
                            {viewState === "question"
                                ? lists && <img src={lists[page - 1]} alt="" />
                                : solveList && <img src={solveList[page - 1]} alt="" />}
                        </div>

                        {/* 프린트 스타일 먹이려면 안에 클래스를 부모로 */}

                        <div ref={printComponent}>
                            {checkData.includes("question") &&
                                lists?.map((a,i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="narrative-print-a4"
                                            style={{ width: "210mm", height: "297mm" }}
                                        >
                                            <img src={a} alt="" />
                                        </div>
                                    );
                                })}
                            {checkData.includes("solution") &&
                                solveList?.map((a,i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="narrative-print-a4"
                                            style={{ width: "210mm", height: "297mm" }}
                                        >
                                            <img src={a} alt="" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {viewState === "question" ? (
                        <PrintPagination
                            totalPage={lists && lists.length}
                            page={page}
                            setPage={setPage}
                        />
                    ) : (
                        <PrintPagination
                            totalPage={lists && solveList.length}
                            page={page}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const PrintPagination = ({ totalPage = 20, pageLength = 10, page, setPage }) => {
    const PageRender = () => {
        let pageGroup = Math.ceil(page / pageLength);
        let lastPage = pageGroup * pageLength;
        let firstPage = lastPage - (pageLength - 1);

        if (totalPage < lastPage) {
            lastPage = totalPage;
        }

        if (totalPage < pageLength) {
            lastPage = totalPage;
            firstPage = 1;
        }

        const result = [];

        for (let i = firstPage; i <= lastPage; i++) {
            result.push(
                <button
                    key={i}
                    onClick={() => {
                        setPage(i);
                    }}
                    className={"pageNum " + `${page === i ? "active" : ""}`}
                >
                    {i}
                </button>
            );
        }

        if (totalPage > pageLength) {
            if (page !== 1) {
                result.unshift(
                    <>
                        <button
                            className="pageNum arrow-two"
                            style={{ transform: "rotate(180deg)" }}
                            onClick={() => {
                                page > 1 && setPage(1);
                            }}
                        ></button>
                        <button
                            className="pageNum arrow-one"
                            style={{ transform: "rotate(180deg)" }}
                            onClick={() => {
                                page > 1 && setPage(page - 1);
                            }}
                        ></button>
                    </>
                );
            }

            if (page !== totalPage) {
                result.push(
                    <>
                        <button
                            className="pageNum arrow-one"
                            onClick={() => {
                                page < totalPage && setPage(page + 1);
                            }}
                        ></button>
                        <button
                            className="pageNum arrow-two"
                            onClick={() => {
                                page < totalPage && setPage(totalPage);
                            }}
                        ></button>
                    </>
                );
            }
        }

        return result;
    };

    return (
        <div className="fa">
            <PageRender />
        </div>
    );
};

export default NarrativePrint;
