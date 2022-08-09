import React, { useEffect, useState } from 'react';
import LbtModal from '../../components/ui/modal/LbtModal';


function LearningBreakdownTable() {

    let [modal, setModal] = useState(false);


    return ( 
        <div>
            {
                modal && <LbtModal setModal={setModal}/>
            }

            
            <div className="lbt-option">
                <div className="row">
                    <div className="left">
                        <p>1. 학습 기간을 설정해 주세요</p>
                        <p>2. 학습 분석표를 생성할 교재를 선택해 주세요.</p>
                    </div>
                    <div className="right">
                        <input type={"date"} /> ~ <input type={"date"}/>
                    </div>
                </div>
                <div style={{textAlign : "center"}}>
                    <button className='btn'>초기화</button>
                    <button className='btn'>생성</button>
                </div>
            </div>

            <button>선택 삭제</button> 
            <p>[분석표 삭제 유의 !] 분석 결과는 생성일에 따라 달라질 수 있습니다</p>

            <table>
                <colgroup>
                    <col style={{width : "auto"}} />
                    <col style={{width : "auto"}} />
                    <col style={{width : "auto"}} />
                    <col style={{width : "auto"}} />
                    <col style={{width : "auto"}} />
                    <col style={{width : "auto"}} />
                </colgroup>
                <thead>
                        <tr>
                            <th>선택</th>
                            <th>학습기간</th>
                            <th>분석표 생성일</th>
                            <th>학습한 교재</th>
                            <th>생성자</th>
                            <th>학습 분석표</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>2022-06-12 ~ 2022-07-25</td>
                            <td>2021-07-02</td>
                            <td>중2-1 노벰, 중2-2 엑사스</td>
                            <td>김교사</td>
                            <td>
                                <button onClick={()=>{setModal(true)}}>보기</button>
                            </td>
                        </tr>
                    </tbody>
            </table>
        </div>
      );
}

export default LearningBreakdownTable;