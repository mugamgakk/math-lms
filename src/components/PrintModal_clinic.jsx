import React, { useState, useRef } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { falseModal, _cloneDeep } from "../methods/methods";
import { useEffect } from "react";
import ajax from "../ajax";
import { useNavigate } from "react-router-dom";


function PrintModal({ closeModal, title = "제목임", cls_seq }) {


        const printComponent = React.useRef();

        let [viewState, setViewState] = useState("question");
        let [checkData, setCheckData] = useState(["question"]);

        // 문제보기
        let [lists, setLists] = useState(null);
        // 풀이보기
        let [solveList, setSolceLists] = useState(null);

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

        const getPrint = async () => {
            let url = "/print.php";
            let query = {
                mode: "print",
                cls_seq: cls_seq,
                ucode: "15M11TRA32",
                kind: "CC",
            };

            let res = await ajax(url, { data: query });


            let 문제보기 = 문제보기높이구하기(_cloneDeep(res.data), 250);
            let 풀이보기 = 풀이보기높이구하기(_cloneDeep(res.data), 100);

            // 사진 로드 기다리기
            setTimeout(()=>{
                let 문제보기결과 = 분할하기(_cloneDeep(문제보기));

                let 풀이보기결과 = 분할하기(_cloneDeep(풀이보기));

                setLists(문제보기결과);
                setSolceLists(풀이보기결과)

            },300)

        };

        // console.log(lists?.[0])

        // 탭변경 페이지 초기화
        useEffect(() => {
            setPage(1);
        }, [viewState]);

        // 문제로드
        useEffect(() => {
            getPrint();
        }, []);

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
                                    <div ref={printComponent} className="asdasdasd">
                                        {checkData.includes("question") && <div>문제</div>}
                                        {checkData.includes("solution") && <div>정답</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contents" >
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
                                                    lists?.[(page - 1)].map((list, i) => {
                                                        console.log(list)
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
                                                                    src={list.qa_path}
                                                                    alt=""
                                                                />
                                                                {
                                                                    ['①','②','③','④','⑤'].map((a,i)=>{
                                                                        return (
                                                                            <div
                                                                                className="img-bottom fa"
                                                                                style={{
                                                                                    justifyContent:
                                                                                        "start",
                                                                                }}
                                                                            >
                                                                                <span>{a}</span>
                                                                                <img src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list.qa_code}_${i}.png`} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div
                                                                    className="white"
                                                                    style={{
                                                                        width: "50%",
                                                                        height: "150px",
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
                                                    solveList?.[page - 1].map((list, i) => {
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
                                                                    src={list.qa_path}
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
                        {
                            viewState === "question"
                            ? <PrintPagination totalPage={lists && lists.length} page={page} setPage={setPage}/>
                            : <PrintPagination totalPage={lists && solveList.length} page={page} setPage={setPage}/>
                        }
                        
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
}



const 높이얻기 = (param, callback) => {
    let img = new Image();
    img.src = param;

    img.addEventListener("load", function () {
        callback(img.height);
    });
};

const 문제보기높이구하기 = (list, 초기값 = 0)=>{

    let arr = [];

    for(let ele of list){
        ele.height = 초기값
        
        높이얻기(ele.qa_path, function(높이){
            ele.height += 높이;
        })

        for(let i = 1; i <= 5; i++){
            let 선지이미지 = `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${ele.qa_code}_${i}.png`;
            높이얻기(선지이미지, function(높이){
                ele.height += 높이;
            })
        }

            arr.push(ele);
    }

    return arr;
}

const 풀이보기높이구하기 = (list, 초기값 = 0)=>{

    let arr = [];

    for(let ele of list){
        ele.height = 초기값;
        let 이미지 = `https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${ele.qa_code}_S.png`;
        ele.qa_path = 이미지;

        높이얻기(이미지, function(높이){
            ele.height += 높이;
        }) 

        arr.push(ele);

    }

    return arr
}

const 분할하기 = (list, limit = 2400)=>{

    let count = 0;
    let arr = [];
    let 높이 = 0;

    for(let ele of list){

        if(높이 + ele.height > limit){
            count++;
            높이 = 0;
        }

        if(Array.isArray(arr[count]) === false){
            arr[count] = new Array();
        }
        높이 += ele.height;
        arr[count].push(ele);

    }

    return arr;
}









export default PrintModal;
