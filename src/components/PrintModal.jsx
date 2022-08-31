import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ReactToPrint from 'react-to-print'; // pdf, 인쇄

function PrintModal({title,setPrintModal}) {
    const printComponent = React.useRef();

    let [viewState,setViewState] = useState('question');
    let [checkData, setCheckData] = useState([]);
    // let [printState, setPrintState] = useState();

    const checkState = (e) => {
        if(e.target.checked){
            setCheckData([...checkData, e.target.name]);
        }else{
            setCheckData(checkData.filter(data=> data !== e.target.name));
        }   
    }

    useEffect(()=>{
        console.log(checkData);
    },[checkData]);


    return ( 
        <>
          <div className="modal">
            <div className="dim"></div>
            <div className='printModal cmmnModal'>
                <div className="printModal-head cmmnModal-head">
                <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        {title}
                    </div>
                    <button className="close" onClick={() => setPrintModal()}>X</button>
                </div>
                <div className="printModal-body cmmnModal-body">
                    <div className="btn-area">
                        <div className="btn-area__left">
                            <button className={ viewState === 'question' ? 'btn active' : 'btn' } onClick={() => setViewState('question')}>문제 보기</button>
                            <button className={ viewState === 'solution' ? 'btn active' : 'btn' } onClick={() => setViewState('solution')}>풀이 보기</button>
                        </div>
                        <div className="btn-area__right">
                            <input type="checkbox" name='question' onChange={checkState}/>문제지
                            <input type="checkbox" name='solution' onChange={checkState}/>풀이지
                                <ReactToPrint
                                    trigger={() => <button className="btn">인쇄하기</button>} //  trigger : 인쇄를 명령할 컴포넌트를 넣어주기
                                    content={() => printComponent.current} // content : 인쇄 대상 ref를 넘겨주기
                                    // documentTitle= "pdf이름" //pdf 로 저장할때 이름
                                />
                                
                                {   
                                    checkData.includes('question') &&  
                                    <div style={{ display: 'none' }}>
                                    <div ref={printComponent} style={{width : "793.701px"}}>문제111</div>
                                    </div>
                                }
                                {   
                                    checkData.includes('solution') &&  
                                    <div style={{ display: 'none' }}>
                                    <div ref={printComponent} style={{width : "793.701px"}}>풀이111</div>
                                    </div>
                                }
                        </div>
                    </div>
                    <div className="contents">
                       {
                        {
                            question : <div>문제1</div>,
                            solution : <div>풀이1</div>
                        }[viewState]
                       }
                    </div>
                </div>
                <div className="printModal-foot cmmnModal-foot">
                <Pagination />
                </div>
            </div>
          </div>
        </>
     );
}

export default PrintModal;