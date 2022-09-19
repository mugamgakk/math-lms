import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const data = [];
for (let i = 0; i < 30; i++) {
    data[i] = { id: i + 1, 정답: Math.floor(Math.random() * 5) + 1, 학생답: null };
}

function MarkingModal({title,setMarkingModal}) {

    let [dataList, setDataList] = useState([data.slice(0,10),data.slice(10,20),data.slice(20,30)]);

    return (
        <div className="modal">
            <div className="dim"></div>
            <div className='markingModal cmmnModal'>
                <div className="markingModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>{title}</strong>
                    </div>
                    <button className="close" onClick={() => setMarkingModal(false)}>X</button>
                </div>
                <div className="markingModal-body cmmnModal-body">
                    <h5>※ 평가 응시는 1회만 가능합니다. 아래 기본 정보와 학생 답안을 정확히 확인한 후 입력 완료해 주세요. (제출 후 수정 불가)</h5>
                    <table className='headTable'>
                        <tbody>
                            <tr>
                                <th>학생명</th>
                                <td>강수학</td>
                                <th>학년/학기</th>
                                <td>중등 2-1</td>
                                <th>반</th>
                                <td>수학A</td>
                                <th>교재명</th>
                                <td>노벰</td>
                            </tr>
                            <tr>
                                <th>평가명</th>
                                <td>단원 평가</td>
                                <th>문항 수</th>
                                <td>30문항</td>
                                <th>평가일</th>
                                <td>2022.5.20</td>
                                <th>단원명</th>
                                <td>I. 수와 식의 계산</td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>평가 결과 등록</h5>
                    <div className='marking'>

                                {
                                    dataList.map(list=>{
                                       const itemWrap = list.map((item,i)=>{
                                            return(
                                                <tr key={item.id}>
                                                    <td className='num'>{item.id}</td>
                                                    <td className='answer'>{item.정답}</td>
                                                    <td className='stuAnswer'>
                                                        <button className='numBtn'>①</button>
                                                        <button className='numBtn'>②</button>
                                                        <button className='numBtn'>③</button>
                                                        <button className='numBtn'>④</button>
                                                        <button className='numBtn'>⑤</button>
                                                    </td>
                                                </tr>
                                                )
                                            })

                                    return(
                                        <table className="marking-block">
                                            <colgroup>
                                                <col style={{ width: "20%" }} />
                                                <col style={{ width: "20%" }} />
                                                <col style={{ width: "60%" }} />
                                            </colgroup>
                                            <thead>
                                                <tr className="marking-block__head">
                                                    <td className='num'>번호</td>
                                                    <td className='answer'>정답</td>
                                                    <td className='stuAnswer'>학생답</td>
                                                </tr>
                                            </thead>
                                                <tbody className="marking-block__body">
                                                {itemWrap}
                                                </tbody>
                                        </table>
                                      )
                                    })
                                }
                     
                       
                    </div>

                </div>
                <div className="markingModal-foot cmmnModal-foot">
                    <button className='btn'>입력 완료</button>
                    <button className='btn'>취소</button>
                </div>
            </div>
        </div>
    );
}

export default MarkingModal;