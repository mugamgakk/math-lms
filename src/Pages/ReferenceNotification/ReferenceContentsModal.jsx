import React from 'react';

function ReferenceContentsModal({listNum,setModal}) {
    return ( 
        <div className="modal">
            <div className="dim"></div>
            <div className="rfModal cmmnModal">
                <h3>No.{listNum}</h3>
                <div className="table">
                    <div className="tr">
                        <div className="th">대상</div>
                        <div className="td">중등</div>
                    </div>
                    <div className="tr">
                        <div className="th">글제목</div>
                        <div className="td">GNB 패럴랙스</div>
                    </div>
                    <div className='textArea'>
                        중1 수학 자료입니다. 게시물 내용 확인        
                    </div>
                    <div className='tr'>
                        <div className="th">첨부파일</div>
                        <div className="td fileTd">
                            <div className='fileArea'></div>
                        </div> 
                        <div className="td"><button className='btn'>모두 받기</button></div>
                        
                    </div>
                </div>
                <div className="foot">
                    <button className='btn'>이전 글 보기</button>
                    <button className='btn' 
                    onClick={(e)=>{
                        setModal(false);
                        e.stopPropagation();
                    }}
                    >닫기</button>
                    <button className='btn'>다음 글 보기</button>
                </div>
            </div>
        </div>
    );
}

export default ReferenceContentsModal;