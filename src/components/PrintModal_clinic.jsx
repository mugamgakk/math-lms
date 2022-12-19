import React, { useState } from "react";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { _cloneDeep } from "../methods/methods";
import { useEffect } from "react";
import ajax from "../ajax";
import { getProblemHeight, 풀이보기높이구하기, 분할하기 } from "./problem-print";
import clinicprint from "../assets/img/clinicprint.png"


function PrintModal({ closeModal, title = "제목임", cls_seq }) {
    const printComponent = React.useRef();

    let [page, setPage] = useState(1);
    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);

    // 문제보기 view
    let [lists, setLists] = useState(null);
    // 풀이보기 view
    let [solveList, setSolveList] = useState(null);

    // 문제보기 print
    let [listsPrint, setListsPrint] = useState(null);
    // 풀이보기 print
    let [solveListPrint, setSolveListPrint] = useState(null);


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

        // array, 문제 최대넓이, 문제여백
        let 문제보기 = await getProblemHeight(_cloneDeep(res.data), 426, 190);
        let 풀이보기 = await 풀이보기높이구하기(_cloneDeep(res.data), 426, 150);
        let 문제보기결과 = 분할하기(문제보기, 100, 1500);
        let 풀이보기결과 = 분할하기(풀이보기, 100, 1300);
        setLists(문제보기결과);
        setSolveList(풀이보기결과);
        // array, 문제 최대넓이, 문제여백
        let 문제보기2 = await getProblemHeight(_cloneDeep(res.data), 323, 190);
        let 풀이보기2 = await 풀이보기높이구하기(_cloneDeep(res.data), 323, 130);
        let 문제보기결과2 = 분할하기(문제보기2, 100, 1120);
        let 풀이보기결과2 = 분할하기(풀이보기2, 100, 1120);
        setListsPrint(문제보기결과2);
        setSolveListPrint(풀이보기결과2);
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
            <div className="modal-content">
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
                    <div style={{ padding: "20px", height: "calc(100% - 50px)" }}>
                        <div className="fj" style={{ marginBottom: "10px" }}>
                            <div>
                                <button
                                    className={`${viewState === "question" ? "btn-brown" : "btn-grey"
                                        }`}
                                    onClick={() => setViewState("question")}
                                    style={{ minWidth: "100px", marginRight: "4px" }}
                                >
                                    문제 보기
                                </button>
                                <button
                                    className={`${viewState === "solution" ? "btn-brown" : "btn-grey"
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
                            className="print-aria print-aria-view"
                            style={{ height: "calc(100% - 50px)", overflow: "auto" }}
                        >
                            {viewState === "question" && (
                                <div className="print-aria-body">
                                    <div className="print-aria-header">
                                        <img src={clinicprint} alt="" />
                                    </div>
                                    <div className="d-flex">
                                        <div className="print-aria-left">
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
                                                                            className="problem-num"
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
                                                                            src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code
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
                                        <div className="print-aria-right">
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
                                                                            className="problem-num"
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
                                                                            src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code
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
                                    </div>
                                </div>
                            )}
                            {/* 풀이보기 */}
                            {viewState === "solution" && (
                                <div className="print-aria-body">
                                    <div className="print-aria-header">
                                        <img src={clinicprint} alt="" />
                                    </div>
                                    <div className="d-flex">
                                        <div className="print-aria-left">
                                            {solveList?.[page - 1]?.[0].map((a, i) => {
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
                                        <div className="print-aria-right">
                                            {solveList?.[page - 1]?.[1].map((a, i) => {
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
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 프린트 영역 */}
                        <div>
                            <div className="d-none">
                                <div ref={printComponent}>

                                    {checkData.includes("question") && (
                                        <>
                                            {listsPrint?.map((c, i) => {
                                                return (
                                                    <div key={i} className="print-aria">
                                                        <div className="print-aria-header">
                                                            <img src={clinicprint} alt="" />
                                                        </div>
                                                        <div className="print-aria-body">
                                                            <div className="d-flex">
                                                                <div className="print-aria-left">

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
                                                                                                    className="problem-num"

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
                                                                                                            `선지높이${i +
                                                                                                            1
                                                                                                            }`
                                                                                                        ],
                                                                                                    }}
                                                                                                    key={i}
                                                                                                    src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code
                                                                                                        }_${i +
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
                                                                <div className="print-aria-right">

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
                                                                                                    className="problem-num"

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
                                                                                                            `선지높이${i +
                                                                                                            1
                                                                                                            }`
                                                                                                        ],
                                                                                                    }}
                                                                                                    key={i}
                                                                                                    src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code
                                                                                                        }_${i +
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
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    )}
                                    {checkData.includes("solution") && (
                                        <>
                                            {solveListPrint?.map((c, i) => {
                                                return (
                                                    <div key={i} className="print-aria">
                                                            <div className="print-aria-header">
                                                                <img src={clinicprint} alt="" />
                                                            </div>
                                                        <div className="print-aria-body">
                                                            <div className="d-flex">
                                                                <div className="print-aria-left">
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
                                                                </div>
                                                                <div className="print-aria-right">

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
            if(page !== 1){
                result.unshift(
                    <>
                    <button
                        className="pageNum arrow-two"
                        style={{transform : "rotate(180deg)"}}
                        onClick={() => {
                            page > 1 && setPage(1);
                        }}
                    >
                    </button>
                    <button
                        className="pageNum arrow-one"
                        style={{transform : "rotate(180deg)"}}
                        onClick={() => {
                            page > 1 && setPage(page - 1);
                        }}
                    >
                    </button>
                    </>
                );
            }

            if(page !== totalPage){
                result.push(
                    <>
                    <button
                        className="pageNum arrow-one"
                        onClick={() => {
                            page < totalPage && setPage(page + 1);
                        }}
                    >
                    </button>
                    <button
                        className="pageNum arrow-two"
                        onClick={() => {
                            page < totalPage && setPage(totalPage);
                        }}
                    >
                    </button>
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

export default PrintModal;

