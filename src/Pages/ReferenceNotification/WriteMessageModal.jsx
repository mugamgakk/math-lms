import React from 'react';
function WriteMessageModal() {
    return (
        <div className="modal">
            <div className="dim"></div>
            <div className='WriteMessageModal cmmnModal'>
                <div className="WriteMessageModal-head cmmnModal-head">
                    <div className="tit">
                            <strong>[학습 알림]메시지 보내기</strong>
                    </div>
                </div>
                <div className="WriteMessageModal-body cmmnModal-body">
                    <div className="left">
                        
                    </div>
                    <div className="right">
                
                    </div>
                </div>
                <div className="WriteMessageModal-foot cmmnModal-foot">
                    <button className='btn'>예약 발송</button>
                    <button className='btn'>발송하기</button>
                    <button className='btn'>취소</button>
                </div>

            </div>
        </div>
      );
}

export default WriteMessageModal;