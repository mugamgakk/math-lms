import React, { useState, useRef } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { falseModal, _cloneDeep } from "../methods/methods";
import { useEffect } from "react";
import ajax from "../ajax";
import { getProblemHeight, 풀이보기높이구하기, 분할하기 } from "./problem-print";

function PrintModal({ closeModal, title = "제목임", cls_seq }) {
    const printComponent = React.useRef();

    let [page, setPage] = useState(1);
    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);

    // 문제보기
    let [lists, setLists] = useState(null);
    // 풀이보기
    let [solveList, setSolceLists] = useState(null);

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
        let url = "/print.php";
        let query = {
            mode: "print",
            cls_seq: cls_seq,
            ucode: "15M11TRA32",
            kind: "CC",
        };

        let res = await ajax(url, { data: query });

        let 문제보기 = await getProblemHeight(_cloneDeep(res.data), 250);
        let 풀이보기 = await 풀이보기높이구하기(_cloneDeep(res.data), 150);

        let 문제보기결과 = 분할하기(문제보기);
        let 풀이보기결과 = 분할하기(풀이보기);

        setLists(문제보기결과);
        setSolceLists(풀이보기결과);
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
        <div className="modal">
            <div className="modal-content printModal printModalClinic">
                <div className="modal-header fj">
                    <h2 className="modal-title">{title}</h2>
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
                    <div style={{ padding: "20px" }}>
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
                                    풀이 보기
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
                                    풀이지
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

                        {/* view */}
                        <div
                            className="print-aria"
                            style={{ maxHeight: "500px", overflow: "auto" }}
                        >
                            {viewState === "question" && (
                                <div className="print-aria-body">
                                    {lists?.[page - 1][0].map((a, i) => {
                                        return (
                                            <article
                                                className="problem"
                                                key={i}
                                                style={{ height: a.height }}
                                            >
                                                <div className="problem-header">
                                                    <h4>
                                                        <div className="num">
                                                            {parseInt(a.qseq) < 10
                                                                ? "0" + a.qseq
                                                                : a.qseq}
                                                        </div>
                                                        <strong>{a.qa_keyword}</strong>
                                                    </h4>
                                                </div>
                                                <div className="problem-body">
                                                    <img
                                                        src={a.qa_path}
                                                        alt=""
                                                        style={{
                                                            height: a.문제높이,
                                                        }}
                                                    />
                                                    {["①", "②", "③", "④", "⑤"].map((dd, i) => {
                                                        return (
                                                            <div className="item" key={i}>
                                                                <span
                                                                    style={{
                                                                        marginRight: "15px",
                                                                    }}
                                                                >
                                                                    {dd}
                                                                </span>{" "}
                                                                <img
                                                                    style={{
                                                                        height: a[
                                                                            `선지높이${i + 1}`
                                                                        ],
                                                                    }}
                                                                    key={i}
                                                                    src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${
                                                                        a.qa_code
                                                                    }_${i + 1}.png`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </article>
                                        );
                                    })}
                                    {lists?.[page - 1][1].map((a, i) => {
                                        return (
                                            <article
                                                className="problem"
                                                key={i}
                                                style={{ height: a.height }}
                                            >
                                                <div className="problem-header">
                                                    <h4>
                                                        <div className="num">
                                                            {parseInt(a.qseq) < 10
                                                                ? "0" + a.qseq
                                                                : a.qseq}
                                                        </div>
                                                        <strong>{a.qa_keyword}</strong>
                                                    </h4>
                                                </div>
                                                <div className="problem-body">
                                                    <img
                                                        src={a.qa_path}
                                                        alt=""
                                                        style={{
                                                            height: a.문제높이,
                                                        }}
                                                    />
                                                    {["①", "②", "③", "④", "⑤"].map((dd, i) => {
                                                        return (
                                                            <div className="item" key={i}>
                                                                <span
                                                                    style={{
                                                                        marginRight: "15px",
                                                                    }}
                                                                >
                                                                    {dd}
                                                                </span>{" "}
                                                                <img
                                                                    style={{
                                                                        height: a[
                                                                            `선지높이${i + 1}`
                                                                        ],
                                                                    }}
                                                                    key={i}
                                                                    src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${
                                                                        a.qa_code
                                                                    }_${i + 1}.png`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                            {/* 풀이보기 */}
                            {viewState === "solution" && (
                                <div className="print-aria-body">
                                    {solveList?.[page - 1][0].map((a, i) => {
                                        return (
                                            <article
                                                className="problem"
                                                key={i}
                                                style={{ height: a.height }}
                                            >
                                                <div className="problem-header">
                                                    <h4>
                                                        <div className="num">
                                                            {parseInt(a.qseq) < 10
                                                                ? "0" + a.qseq
                                                                : a.qseq}
                                                        </div>
                                                        <strong>{a.qa_keyword}</strong>
                                                    </h4>
                                                </div>
                                                <div className="problem-body">
                                                    <img
                                                        src={a.qa_path}
                                                        alt=""
                                                        style={{
                                                            height: a.문제높이,
                                                        }}
                                                    />
                                                </div>
                                            </article>
                                        );
                                    })}
                                    {solveList?.[page - 1][1].map((a, i) => {
                                        return (
                                            <article
                                                className="problem"
                                                key={i}
                                                style={{ height: a.height }}
                                            >
                                                <div className="problem-header">
                                                    <h4>
                                                        <div className="num">
                                                            {parseInt(a.qseq) < 10
                                                                ? "0" + a.qseq
                                                                : a.qseq}
                                                        </div>
                                                        <strong>{a.qa_keyword}</strong>
                                                    </h4>
                                                </div>
                                                <div className="problem-body">
                                                    <img
                                                        src={a.qa_path}
                                                        alt=""
                                                        style={{
                                                            height: a.문제높이,
                                                        }}
                                                    />
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 프린트 영역 */}
                        <div>
                            <div className="d-none">
                                <div ref={printComponent}>
                                    {checkData.includes("question") && (
                                        <>
                                            {lists?.map((c, i) => {
                                                return (
                                                    <div key={i} className="print-aria">
                                                        {i === 0 && (
                                                            <div
                                                                style={{
                                                                    height: "200px",
                                                                    backgroundColor: "blue",
                                                                }}
                                                            >
                                                                메뉴
                                                            </div>
                                                        )}
                                                        <div className="print-aria-body">
                                                            {c[0].map((a, i) => {
                                                                return (
                                                                    <article
                                                                        className="problem"
                                                                        key={i}
                                                                        style={{ height: a.height }}
                                                                    >
                                                                        <div className="problem-header">
                                                                            <h4>
                                                                                <div className="num">
                                                                                    {parseInt(
                                                                                        a.qseq
                                                                                    ) < 10
                                                                                        ? "0" +
                                                                                          a.qseq
                                                                                        : a.qseq}
                                                                                </div>
                                                                                <strong>
                                                                                    {a.qa_keyword}
                                                                                </strong>
                                                                            </h4>
                                                                        </div>
                                                                        <div className="problem-body">
                                                                            <img
                                                                                src={a.qa_path}
                                                                                alt=""
                                                                                style={{
                                                                                    height: a.문제높이,
                                                                                }}
                                                                            />
                                                                            {[
                                                                                "①",
                                                                                "②",
                                                                                "③",
                                                                                "④",
                                                                                "⑤",
                                                                            ].map((dd, i) => {
                                                                                return (
                                                                                    <div
                                                                                        className="item"
                                                                                        key={i}
                                                                                    >
                                                                                        <span
                                                                                            style={{
                                                                                                marginRight:
                                                                                                    "15px",
                                                                                            }}
                                                                                        >
                                                                                            {dd}
                                                                                        </span>{" "}
                                                                                        <img
                                                                                            style={{
                                                                                                height: a[
                                                                                                    `선지높이${
                                                                                                        i +
                                                                                                        1
                                                                                                    }`
                                                                                                ],
                                                                                            }}
                                                                                            key={i}
                                                                                            src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${
                                                                                                a.qa_code
                                                                                            }_${
                                                                                                i +
                                                                                                1
                                                                                            }.png`}
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </article>
                                                                );
                                                            })}
                                                            {c[1].map((a, i) => {
                                                                return (
                                                                    <article
                                                                        className="problem"
                                                                        key={i}
                                                                        style={{ height: a.height }}
                                                                    >
                                                                        <div className="problem-header">
                                                                            <h4>
                                                                                <div className="num">
                                                                                    {parseInt(
                                                                                        a.qseq
                                                                                    ) < 10
                                                                                        ? "0" +
                                                                                          a.qseq
                                                                                        : a.qseq}
                                                                                </div>
                                                                                <strong>
                                                                                    {a.qa_keyword}
                                                                                </strong>
                                                                            </h4>
                                                                        </div>
                                                                        <div className="problem-body">
                                                                            <img
                                                                                src={a.qa_path}
                                                                                alt=""
                                                                                style={{
                                                                                    height: a.문제높이,
                                                                                }}
                                                                            />
                                                                            {[
                                                                                "①",
                                                                                "②",
                                                                                "③",
                                                                                "④",
                                                                                "⑤",
                                                                            ].map((dd, i) => {
                                                                                return (
                                                                                    <div
                                                                                        className="item"
                                                                                        key={i}
                                                                                    >
                                                                                        <span
                                                                                            style={{
                                                                                                marginRight:
                                                                                                    "15px",
                                                                                            }}
                                                                                        >
                                                                                            {dd}
                                                                                        </span>{" "}
                                                                                        <img
                                                                                            style={{
                                                                                                height: a[
                                                                                                    `선지높이${
                                                                                                        i +
                                                                                                        1
                                                                                                    }`
                                                                                                ],
                                                                                            }}
                                                                                            key={i}
                                                                                            src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${
                                                                                                a.qa_code
                                                                                            }_${
                                                                                                i +
                                                                                                1
                                                                                            }.png`}
                                                                                            alt=""
                                                                                        />
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </article>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                    {checkData.includes("solution") && (
                                        <>
                                            {solveList?.map((c, i) => {
                                                return (
                                                    <div key={i} className="print-aria">
                                                        {i === 0 && (
                                                            <div
                                                                style={{
                                                                    height: "200px",
                                                                    backgroundColor: "blue",
                                                                }}
                                                            >
                                                                메뉴
                                                            </div>
                                                        )}
                                                        <div className="print-aria-body">
                                                            {c[0].map((a, i) => {
                                                                return (
                                                                    <article
                                                                        className="problem"
                                                                        key={i}
                                                                        style={{ height: a.height }}
                                                                    >
                                                                        <div className="problem-header">
                                                                            <h4>
                                                                                <div className="num">
                                                                                    {parseInt(
                                                                                        a.qseq
                                                                                    ) < 10
                                                                                        ? "0" +
                                                                                          a.qseq
                                                                                        : a.qseq}
                                                                                </div>
                                                                                <strong>
                                                                                    {a.qa_keyword}
                                                                                </strong>
                                                                            </h4>
                                                                        </div>
                                                                        <div className="problem-body">
                                                                            <img
                                                                                src={a.qa_path}
                                                                                alt=""
                                                                                style={{
                                                                                    height: a.문제높이,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </article>
                                                                );
                                                            })}
                                                            {c[1].map((a, i) => {
                                                                return (
                                                                    <article
                                                                        className="problem"
                                                                        key={i}
                                                                        style={{ height: a.height }}
                                                                    >
                                                                        <div className="problem-header">
                                                                            <h4>
                                                                                <div className="num">
                                                                                    {parseInt(
                                                                                        a.qseq
                                                                                    ) < 10
                                                                                        ? "0" +
                                                                                          a.qseq
                                                                                        : a.qseq}
                                                                                </div>
                                                                                <strong>
                                                                                    {a.qa_keyword}
                                                                                </strong>
                                                                            </h4>
                                                                        </div>
                                                                        <div className="problem-body">
                                                                            <img
                                                                                src={a.qa_path}
                                                                                alt=""
                                                                                style={{
                                                                                    height: a.문제높이,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </article>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
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
        let firstPage = lastPage - 9;

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
            result.unshift(
                <button
                    onClick={() => {
                        page > 1 && setPage(page - 1);
                    }}
                >
                    좌로
                </button>
            );
            result.push(
                <button
                    onClick={() => {
                        page < totalPage && setPage(page + 1);
                    }}
                >
                    우로
                </button>
            );
        }

        return result;
    };

    return (
        <div>
            <PageRender />
        </div>
    );
};

export default PrintModal;
