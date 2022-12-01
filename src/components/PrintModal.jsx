import React, { useState } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";

function PrintModal({ closeModal, title = "제목임" }) {
    const printComponent = React.useRef();

    let [viewState, setViewState] = useState("question");
    let [checkData, setCheckData] = useState(["question"]);

    const checkState = (checked, ele) => {
        if (checked) {
            setCheckData([...checkData, ele]);
        } else {
            setCheckData(checkData.filter((data) => data !== ele));
        }
    };

    // 우클릭 드래그 방지 
    const eventAlert = (e)=>{
        e.preventDefault();
    }


    return (
            <div className="modal">
                <div className="modal-content printModal">
                    <div className="modal-header fj">
                        <h2 className="modal-title">{title}</h2>
                        <button className="btn" onClick={() => closeModal(false)}><Icon icon={"close"} /></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-name" style={{ paddingLeft:'20px' }}>
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
                                    className={`view-btn mr-4 ${viewState === "question" ? "active" : ''}`}
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
                                <Checkbox color='green' checked={checkData.includes("question")} id='question' onChange={(e)=> checkState(e.target.checked, "question")}/>
                                <label htmlFor="question">문제지</label>
                                <Checkbox color='green' checked={checkData.includes("solution")} id='solution' onChange={(e)=> checkState(e.target.checked, "solution")}/>
                                <label htmlFor="solution">풀이지</label>
                                <ReactToPrint
                                    trigger={() => <button className="btn-grey-border"><Icon icon={"print"} style={{marginRight:'6px',fontSize:'14px'}}/>인쇄</button>}
                                    content={() => printComponent.current}
                                />
                                    <div style={{ display: "none" }}>
                                        <div ref={printComponent}>
                                            {
                                                checkData.includes("question") && <div>문제</div>
                                            }
                                            {
                                                checkData.includes("solution") && <div>정답</div>
                                            }
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="contents">
                            {
                                {
                                    question: <div onContextMenu={eventAlert} onDragStart={eventAlert}>문제</div>,
                                    solution: <div onContextMenu={eventAlert} onDragStart={eventAlert}>정답</div>,
                                }[viewState]
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <Pagination /> */}
                        <PrintPagination totalPage={7}/>
                    </div>
                </div>
            </div>
    );
}

const PrintPagination = ({totalPage = 20, pageLength = 10})=>{

    let [page, setPage] = useState(1);

    const PageRender = ()=>{
        let pageGroup = Math.ceil(page / pageLength);
        let lastPage = pageGroup * pageLength;
        let firstPage = lastPage - 9

        if(totalPage < lastPage){
            lastPage = totalPage
        }

        if(totalPage < pageLength){
            lastPage = totalPage;
            firstPage = 1;
        }

        const result = [];

        for(let i = firstPage; i <= lastPage; i++){
            result.push(<button key={i} onClick={()=>{setPage(i)}} className={"btn " + `${page === i ? "active" : ""}`}>{i}</button>)
        }

        if(totalPage > pageLength){
            result.unshift(<button onClick={()=>{page > 1 && setPage(page - 1)}}>좌로</button>);
            result.push(<button onClick={()=>{page < totalPage && setPage(page + 1)}}>우로</button>)
        }

        return result
    }

    return (
        <div>
            <PageRender/>
        </div>
    )
}

export default PrintModal;
