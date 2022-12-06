import React, { useState, useRef } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { falseModal } from "../methods/methods";
import { useEffect } from "react";
import ajax from "../ajax";
import { useNavigate } from "react-router-dom";

function PrintModal({ closeModal, title = "제목임", cls_seq }) {
    const printComponent = React.useRef();

    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);
    let [lists, setLists] = useState(null);
    let [page, setPage] = useState(1);

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

    useEffect(() => {
        setPage(1);
        getPrint();
    }, [viewState]);

    useEffect(() => {
        getPrint();
    }, []);

    const getPrint = async () => {
        let url = "/print.php";
        let query = {
            mode: "print",
            cls_seq: cls_seq,
            ucode: "15M11TRA32",
            kind: "CC",
        };

        let res = await ajax(url, { data: query });

        // console.log("@@@@@@@@@@@",res)

        let 문제들 = 문제만들기(res.data);
        let 총결과 = [];
        let result = [];
        let 높이 = 0;
        let 순서 = 0;

        setTimeout(() => {
            for (let ele of 문제들) {
                if (높이 + ele.높이 > 2400) {
                    순서++;

                }
                if (Array.isArray(result[순서]) === false) {
                    높이 = 0;
                    result[순서] = [];
                }
                result[순서].push(ele);
                높이 += ele.높이;
            }

            총결과.push(result);

            setLists(총결과);

        }, 500);

    
    };

    const 문제만들기 = (ele) => {
        let arr = [];

        ele.forEach((a) => {
            let obj = {};

            if(viewState === "question"){
                obj.문제 = `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code}_Q.png`;
                obj.높이 = 200;
            }else{
                obj.문제 = `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code}_S.png`;
                obj.높이 = 200;
            }

            

            높이얻기(obj.문제, function (높이) {
                obj.높이 += 높이;
            });

            obj.qa_keyword = a.qa_keyword;
            obj.correct_a = a.correct_a;
            obj.vd_code = a.vd_code;
            obj.similar_a = a.similar_a;
            obj.qa_type = a.qa_type;
            obj.qseq = a.qseq;
            obj.qa_code = a.qa_code;

            obj.선지 = [];

            if(viewState === "question"){
                for (let i = 1; i <= 5; i++) {
                    obj.선지.push(
                        `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code}_${i}.png`
                    );
                    높이얻기(
                        `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${a.qa_code}_${i}.png`,
                        function (높이) {
                            obj.높이 += 높이;
                        }
                    );
                }
            }

            console.log(obj);

            arr.push(obj);
        });

        return arr;
    };

    const 높이얻기 = (param, callback) => {
        let img = new Image();
        img.src = param;

        img.addEventListener("load", function () {
            callback(img.height);
        });
    };


    return (
        <div className="modal" onClick={(e) => falseModal(e, closeModal)}>
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
                    <div className="btn-area fj mb-10">
                        <div className="btn-area__left">
                            <button
                                className={`view-btn mr-4 ${
                                    viewState === "question" ? "active" : ""
                                }`}
                                onClick={() => setViewState("question")}
                            >
                                문제 보기
                            </button>
                            <button
                                className={`view-btn ${viewState === "solution" ? "active" : ""}`}
                                onClick={() => setViewState("solution")}
                            >
                                풀이 보기
                            </button>
                        </div>
                        <div className="btn-area__right">
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
                                    <button className="btn-grey-border">
                                        <Icon
                                            icon={"print"}
                                            style={{ marginRight: "6px", fontSize: "14px" }}
                                        />
                                        인쇄
                                    </button>
                                )}
                                content={() => printComponent.current}
                            />
                            <div style={{ display: "none" }}>
                                <div ref={printComponent}>
                                    {checkData.includes("question") && <div>문제</div>}
                                    {checkData.includes("solution") && <div>정답</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contents">
                        {viewState == "question" && (
                            <>
                                <table className="contents-tit">
                                    <colgroup>
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="80px" />
                                        <col width="90px" />
                                        <col width="80px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="130px" />
                                        <col width="100px" />
                                        <col width="80px" />
                                    </colgroup>
                                    <tr>
                                        <th>맞춤 클리닉</th>
                                        <td>중1-1 뜨레스</td>
                                        <th>학년</th>
                                        <td>중1</td>
                                        <th>이름</th>
                                        <td>조현준</td>
                                        <th>학습일</th>
                                        <td>2022.07.12</td>
                                        <th>점수</th>
                                        <td>/26</td>
                                    </tr>
                                </table>
                                <div className="contents-inner scroll">
                                    <div onContextMenu={eventAlert} onDragStart={eventAlert}>
                                        <div className="ol">
                                            {lists &&
                                                lists[0][page - 1].map((list, i) => {
                                                    return (
                                                        <>
                                                            <div className="img-top fj">
                                                                <strong>
                                                                    {list.qseq < 10
                                                                        ? `0${list.qseq}`
                                                                        : list.qseq}
                                                                </strong>
                                                                <span className="tit">
                                                                    {list.qa_keyword}
                                                                </span>
                                                            </div>
                                                            <img
                                                                className="q-img"
                                                                src={list.문제}
                                                                alt=""
                                                            />
                                                            {
                                                            list.선지.map(
                                                                (a, i) => {
                                                                    return (
                                                                        <div
                                                                            className="img-bottom fa"
                                                                            style={{
                                                                                justifyContent:
                                                                                    "start",
                                                                            }}
                                                                        >
                                                                            <span>
                                                                            {
                                                                                {
                                                                                    0 : '①',
                                                                                    1 : '②',
                                                                                    2 : '③',
                                                                                    3 : '④',
                                                                                    4 : '⑤',

                                                                                }[i]
                                                                            }
                                                                            </span>
                                                                            <img src={a} />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                            <div
                                                                className="white"
                                                                style={{
                                                                    width: "50%",
                                                                    height: "100px",
                                                                }}
                                                            ></div>
                                                        </>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {viewState == "solution" && (
                            <>
                                <table className="contents-tit">
                                    <colgroup>
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="80px" />
                                        <col width="90px" />
                                        <col width="80px" />
                                        <col width="100px" />
                                        <col width="100px" />
                                        <col width="130px" />
                                        <col width="100px" />
                                        <col width="80px" />
                                    </colgroup>
                                    <tr>
                                        <th>맞춤 클리닉</th>
                                        <td>중1-1 뜨레스</td>
                                        <th>학년</th>
                                        <td>중1</td>
                                        <th>이름</th>
                                        <td>조현준</td>
                                        <th>학습일</th>
                                        <td>2022.07.12</td>
                                        <th>점수</th>
                                        <td>/26</td>
                                    </tr>
                                </table>
                                <div className="contents-inner scroll">
                                    <div onContextMenu={eventAlert} onDragStart={eventAlert}>
                                        <div className="ol">
                                            {lists &&
                                                lists[0][page - 1].map((list, i) => {
                                                    return (
                                                        <>
                                                            <div className="img-top fj">
                                                                <strong>
                                                                    {list.qseq < 10
                                                                        ? `0${list.qseq}`
                                                                        : list.qseq}
                                                                </strong>
                                                                <span className="tit">
                                                                    {list.qa_keyword}
                                                                </span>
                                                            </div>
                                                            <img
                                                                className="q-img"
                                                                src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list.qa_code}_S.png`}
                                                                alt=""
                                                            />
                                                            <div
                                                                className="white"
                                                                style={{
                                                                    width: "50%",
                                                                    height: "100px",
                                                                }}
                                                            ></div>
                                                        </>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <PrintPagination totalPage={lists && lists[0].length} page={page} setPage={setPage}/>
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
