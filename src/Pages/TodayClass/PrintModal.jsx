import React, { useEffect, useState } from "react";
function PrintModal({closeModal,name,book,cl,sodanwon}) {
    return ( 
        <>
          <div className="modal">
            <div className="dim"></div>
            <div className='printModal cmmnModal'>
                <div className="printModal-head cmmnModal-head">
                <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        <ul>
                            <li>{name}/</li>
                            <li>{book}/</li>
                            <li>{cl}/</li>
                            <li>{sodanwon}</li>
                        </ul>
                    </div>
                    <button className="close" onClick={() => closeModal('printModal')}>X</button>
                </div>
                <div className="printModal-body cmmnModal-body">
                    <div className="btn-area">
                        <div className="btn-area__left">
                            <input type="text" />
                            <button>인쇄하기</button>
                        </div>
                        <div className="btn-area__right">
                            <button></button>
                            <button></button>
                            <button></button>
                        </div>
                    </div>
                </div>
                <div className="printModal-foot cmmnModal-foot"></div>
            </div>
          </div>
        </>
     );
}

export default PrintModal;