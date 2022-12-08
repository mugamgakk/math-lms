import React from 'react';
import img from '../../assets/img/download.jpg';
import Icon from '../../components/Icon';

function ViewTranscriptsModal({closeModal}) {
    
    return (
        <div className="modal">
            <div className='modal-content viewTranscriptModal'>
                <div className="modal-header">
                <h2 className="modal-title">[단원 평가]</h2>
                    <button className="btn" onClick={() => closeModal(false)}><Icon icon={"close"} /></button>
                </div>
                <div className="modal-body scroll" style={{ height: '700px',width:"900px",overflowY:'scroll'}}>
                    <img src={img} alt="" style={{width:'100%'}}/>
                </div>
                <div className="modal-footer">
                    <button className='btn-grey-border' onClick={()=>closeModal(false)}>닫기</button>
                    <button className='btn-orange' style={{ margin:'0 10px' }}>다운로드</button>
                    <button className='btn-brown'>인쇄하기</button>
                </div>
            </div>
        </div>
    );
}


export default ViewTranscriptsModal; 