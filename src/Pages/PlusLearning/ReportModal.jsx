import React from "react";
import Icon from "../../components/Icon";
import download from "../../assets/img/download.jpg";
import { falseModal } from "../../methods/methods";

function ReportModal({setModal}) {
    return (
        <div className="modal" onClick={(e)=>{ falseModal(e, setModal) }}>
            <div className="modal-content" style={{width : "1000px"}}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        [ 교과서별 내신적중 ] 강수학 중 2 1/ 결과 리포트
                    </h2>
                    <button className="btn" onClick={()=>{ setModal(false) }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body" style={{padding : "25px"}}>
                    <div style={{height : "600px", overflow : "auto"}}>
                        <img src={download} alt="" style={{width : "100%"}} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey-border mr-10" onClick={()=>{ setModal(false) }}>닫기</button>
                    <button className="btn-brown mr-10">다운로드</button>
                    <button className="btn-orange">인쇄하기</button>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;
