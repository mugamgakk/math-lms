import React, { useState } from "react";
import Pagination from "./Pagination";
import ReactToPrint from "react-to-print"; // pdf, 인쇄
import Icon from "./Icon";
import Checkbox from "./Checkbox";
import { falseModal } from '../methods/methods'
import { useEffect } from "react";
import ajax from "../ajax";

function PrintModal({ closeModal, title = "제목임" , cls_seq}) {
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

    console.log(lists);
    // 우클릭 드래그 방지 
    const eventAlert = (e)=>{
        e.preventDefault();
    }

    useEffect(()=>{
        setPage(1);
    },[viewState])

    useEffect(()=>{
        getPrint();
    },[]);

   
    const getPrint = async () => {

        let url = "/print.php";
        let query = {
            mode: "print",
            cls_seq : cls_seq ,
            ucode:'15M11TRA32',
            kind:'CC'
        };
        
        let res = await ajax(url, {data: query});

        console.log(res);

        getArray(res.data);
        
    }
    
    const getArray = (data) => {
         
            let length = data.length;
            let divide = Math.floor(length/4) + (Math.floor( length % 4 ) > 0 ? 1 : 0);
            let newArray = [];

            for(let i=0; i< divide; i++){
                newArray.push( data.splice(0,4));
            }

            setLists(newArray);
     }




    return (
            <div className="modal" onClick={(e)=>falseModal(e,closeModal)}>
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
                                <label htmlFor="question" className="mr-10">문제지</label>
                                <Checkbox color='green' checked={checkData.includes("solution")} id='solution' onChange={(e)=> checkState(e.target.checked, "solution")}/>
                                <label htmlFor="solution" className="mr-10">풀이지</label>
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
                                viewState == 'question' && (
                                    <>
                                    <table className="contents-tit">
                                        <colgroup>
                                            <col width='100px'/>
                                            <col width='100px'/>
                                            <col width='80px'/>
                                            <col width='90px'/>
                                            <col width='80px'/>
                                            <col width='100px'/>
                                            <col width='100px'/>
                                            <col width='130px'/>
                                            <col width='100px'/>
                                            <col width='80px'/>
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
                                    <div className='contents-inner scroll'>
                                        <ol onContextMenu={eventAlert} onDragStart={eventAlert}>
                                                {
                                                    lists && lists[page - 1].map((list,i)=>{
                                                        
                                                        return(
                                                                <li style={{ paddingTop:'25px' }}>
                                                                    <div className="img-top fj">
                                                                        <strong>{list.qseq < 10 ? `0${list.qseq}` : list.qseq}</strong>
                                                                        <span className="tit">{list.qa_keyword}</span>
                                                                    </div>
                                                                    <img className='q-img' src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list.qa_code}_Q.png` } alt="" />
                                                                {
                                                                    ['①','②','③','④','⑤'].map((num,i)=>{
                                                                        return(
                                                                            <div className="img-bottom fa" style={{justifyContent:'start'}}>
                                                                                <span>{num}</span><img src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list.qa_code}_${i+1}.png` }/>
                                                                            </div>
                                                                        ) 
                                                                    })
                                                                }
                                                                </li>
                                                        )
                                                    })
                                                }
                                            </ol>
                                        </div>
                                    </>
                                )
                            }
                            {
                                viewState == 'solution' && (
                                    <>
                                     <table className="contents-tit">
                                        <colgroup>
                                            <col width='100px'/>
                                            <col width='100px'/>
                                            <col width='80px'/>
                                            <col width='90px'/>
                                            <col width='80px'/>
                                            <col width='100px'/>
                                            <col width='100px'/>
                                            <col width='130px'/>
                                            <col width='100px'/>
                                            <col width='80px'/>
                                        </colgroup>
                                        <tr>
                                            <th>맞춤 클리닉</th>
                                            <td>중1 뜨레스</td>
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
                                    <div className='contents-inner scroll'>
                                    <ol className='solution' onContextMenu={eventAlert} onDragStart={eventAlert}>
                                            {
                                                lists && lists[page - 1].map((list,i)=>{
                                                    
                                                    return(
                                                        <li style={{ paddingTop:'25px' }}>
                                                                <div className="img-top fj">
                                                                    <strong>{list.qseq < 10 ? `0${list.qseq}` : list.qseq}</strong>
                                                                    <span className="tit">{list.qa_keyword}</span>
                                                                </div>
                                                            <img src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${list.qa_code}_S.png` } style={{ marginTop:'20px' }} alt="" />
                                                        </li>
                                                    )
                                                })
                                            }
                                    </ol>
                                    </div>
                                    </>
                                )
                              
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <Pagination /> */}
                        <PrintPagination totalPage={lists && lists.length} page={page} setPage={setPage}/>
                    </div>
                </div>
            </div>
    );
}

const PrintPagination = ({totalPage = 20, pageLength = 10,page,setPage})=>{


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
            result.push(<button key={i} onClick={()=>{setPage(i)}} className={"pageNum " + `${page === i ? "active" : ""}`}>{i}</button>)
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
