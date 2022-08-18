import React, { useEffect, useState } from "react";
import ScoreItem from './ScoreItem'
function AttModal ({modalCount,todayClassList,closeModal}) {
    let [scoreList, setScoreList] = useState([
        { tit: '1. 학습에 얼마나 집중하였습니까?' , mark : 0},
        { tit: '2. 학습에 얼마나 적극적으로 참여하였습니까?' , mark : 0},
        { tit: '3. 과제를 성실히 수행하였습니까?' , mark : 0},
        { tit: '4. 개념 노트(P노트)를 잘 정리하였습니까?' , mark : 0},
        { tit: '5. 오답 노트를 잘 정리하였습니까?' , mark : 0},
    ])


    return(
        <div className="modal">
        <div className="dim"></div>
        <div className='assessModal'>
            <div className="assessModal-head">
                    <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        <ul>
                            <li>{todayClassList[modalCount].name}/</li>
                            <li>{todayClassList[modalCount].book}/</li>
                            <li>{todayClassList[modalCount].class}/</li>
                            <li>{todayClassList[modalCount].sodanwon}/</li>
                        </ul>
                    </div>
                    <button className="close" onClick={() => closeModal('attModal')}>X</button>
            </div>
            <div className="assessModal-body">
                <h5>이 단원의 학습 태도를 10점 만점으로 평가해 주세요.</h5>
                <ul>
                    {
                        scoreList.map((list,i)=> {
                            return(
                                <ScoreItem key={i} list={list}/>
                            )
                        })

                    }
                </ul>
            </div>
            <div className="assessModal-foot">
                <button class="btn">취소</button>
                <button class="btn">평가 완료</button>
            </div>
        </div>
        </div>
    )
}

export default AttModal;

