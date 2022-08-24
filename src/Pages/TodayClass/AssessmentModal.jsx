import React, { useEffect, useState } from "react";
import ScoreItem from './ScoreItem'


function AssessmentModal ({closeModal,name,book,cl,sodanwon}) {
    let assTit = [
       '개념 이해력',
       '전달력',
    ];
    
    let [totalData, setTotalData] = useState({
        q1: 7,
        q2: 7,
    });

    const numClick = (idx,num) => {
        setTotalData({
            ...totalData,
            [`q${idx}`]: num
        });
    }
 
    
    return (
        <>
        <div className="modal">
            <div className="dim"></div>
            <div className='asseModal cmmnModal'>
                <div className="asseModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[학습 태도 평가]</strong>
                        <ul>
                            <li>{name}/</li>
                            <li>{book}/</li>
                            <li>{cl}/</li>
                            <li>{sodanwon}</li>
                        </ul>
                    </div>
                    <button className="close" onClick={() => closeModal('assessmentModal')}>X</button>
                </div>
                <div className="asseModal-body cmmnModal-body">
                    <h5>학생의 개념 이해력과 전달력 점수를 입력해 주세요.</h5>
                    <table>
                        <tbody>
                        {
                            assTit.map((tit,idx)=> {
                                return(
                                    <tr key={idx}>
                                        <th>{tit}</th>
                                        <td>
                                            <ScoreItem numClick={numClick} idx={idx+1} style={totalData[`q${idx+1}`]}/>
                                        </td>
                                    </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="asseModal-foot cmmnModal-foot">
                    <button className='btn' onClick={() => closeModal('assessmentModal')}>취소</button>
                    <button className='btn'>저장</button>
                </div>
            </div>

        </div>
        </>
    )
}
export default AssessmentModal;