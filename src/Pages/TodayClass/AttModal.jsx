import React, { useEffect, useState } from "react";
import ScoreItem from './ScoreItem'
function AttModal ({closeModal,name,book,cl,sodanwon}) {
    let scoreTitList = [
        '1. 학습에 얼마나 집중하였습니까?',
        '2. 학습에 얼마나 적극적으로 참여하였습니까?',
        '3. 과제를 성실히 수행하였습니까?',
        '4. 개념 노트(P노트)를 잘 정리하였습니까?',
        '5. 오답 노트를 잘 정리하였습니까?',
    ];
    
    let [totalData, setTotalData] = useState({
        q1: 7,
        q2: 7,
        q3: 7,
        q4: 7,
        q5: 7,
    });

    const numClick = (idx,num) => {
        setTotalData({
            ...totalData,
            [`q${idx}`]: num
        });
        console.log(totalData);
    }
    
    const formConfirm = () => {
        if(window.confirm('이 단원의 학습 태도 평가를 저장합니다.')) closeModal('attModal');
    }
    return(
        <div className="modal">
        <div className="dim"></div>
        <div className='attModal cmmnModal'>
            <div className="attModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        <ul>
                            <li>{name}/</li>
                            <li>{book}/</li>
                            <li>{cl}/</li>
                            <li>{sodanwon}/</li>
                        </ul>
                    </div>
                    <button className="close" onClick={() => closeModal('attModal')}>X</button>
            </div>
            <div className="attModal-body cmmnModal-body">
                <h5>이 단원의 학습 태도를 10점 만점으로 평가해 주세요.</h5>
                <ul>
                    {
                        scoreTitList.map((tit,idx)=> {
                            return(
                                <ScoreItem key={idx} tit={tit} idx={idx+1} numClick={numClick} style={totalData[`q${idx+1}`]}/>
                                )
                            })
                            
                        }
                </ul>
            </div>
            <div className="attModal-foot cmmnModal-foot">
                <button className="btn" onClick={()=>closeModal('attModal')}>취소</button>
                <button className="btn" onClick={formConfirm}>평가 완료</button>
            </div>
        </div>
        </div>
    )
}

export default AttModal;

