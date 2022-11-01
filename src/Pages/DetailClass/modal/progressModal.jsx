import React, { useState, useEffect } from "react";
import ajax from "../../../ajax";

let progress = {개념 : '34.8%', 유형 : '71.6%'}
let per = ['0%','20%','40%','60%','80%','100%']
let data = [
    {
        tit: 'I. 수와 식의 계산',
        sodanwon: [
            { tit : '1. 유한소수와 무한소수'},
            { tit : '2. 유리수와 순환소수'},
            { tit : '3. 단항식의 곱셈과 나눗셈'},
            { tit : '4. 다항식의 덧셈과 뺄셈'},
            { tit : '5. 단항식과 다항식의 곱셈과 나눗셈'},
            { tit : '6. 유리수와 순환소수'},
            { tit : '7. 유리수와 순환소수'},
        ]
    },
]


function ProgressModal({setProgressState,name}){
    let [progressData,setProgressData] = useState(null);

    useEffect(()=>{
        ajax("/class_result.php", { data : {
            mode : 'qa_prog',
            usr_seq : 594,
            bk_cd : 'm11-co1'
        }
        }).then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    },[]);


    return(
        <div className="modal">
            <div className="dim"></div>
            <div className='progressModal cmmnModal'>
                <div className="progressModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[학습 태도 평가]{name}</strong>
                    </div>
                    <button className="close" onClick={() => setProgressState(false)}>X</button>
                </div>
                <div className="progressModal-body cmmnModal-body">
                    <div className='top fj'>
                        <div className="top-table">
                            <div className='top-table__tit'>학습 진행률</div>
                            <ul className='top-table__bar'>
                                <li>
                                    <div className="tit">개념서</div>
                                    <div className='gageWrap'>
                                        <span className='gageWrap-gage' style={{ width: `${progress.개념}` }}>{progress.개념}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item' key={item}>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="tit">개념서</div>
                                    <div className='gageWrap'>
                                        <span className='gageWrap-gage' style={{ width: `${progress.유형}` }}>{progress.유형}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item'>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="top-table">
                            <div className='top-table__tit'>교재 학습 정답률</div>
                                <ul className='top-table__bar'>
                                    <li>
                                        <div className="tit">개념서</div>
                                        <div className="con">{progress.개념}</div>
                                    </li>
                                    <li>
                                        <div className="tit">유형서</div>
                                        <div className="con">90.6%</div>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    {/* 아르케 */}
                    {/* <div className='top fj'>
                        <div className="top-table">
                            <div className='top-table__tit'>학습 진행률</div>
                            <ul className='top-table__bar'>
                                <li>
                                    <div className='gageWrap'>
                                        <span className='gageWrap-gage' style={{ width: `${progress.개념}` }}>{progress.개념}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item'>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="top-table">
                            <div className='top-table__tit'>교재 학습 정답률</div>
                                <ul className='top-table__bar'>
                                    <li>
                                        <div className="tit">개념서</div>
                                        <div className="con">{progress.개념}</div>
                                    </li>
                                </ul>
                            </div>
                    </div> */}
                    <div className="contents">
                        <table className="mt-15">
                            <colgroup>
                                <col style={{ width: '30%' }}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>단원명</th>
                                    <th colSpan={2}>개념 학습</th>
                                    <th colSpan={2}>유형 학습</th>
                                    <th>맞춤 클리닉</th>
                                </tr>
                                <tr>
                                    <th>학습일자</th>
                                    <th>결과</th>
                                    <th>학습일자</th>
                                    <th>결과</th>
                                    <th>결과</th>
                                </tr>

                            </thead>
                            {
                                data.map(tbody=>{
                                    return (
                                        <tbody>
                                            <tr><td colSpan={6} style={{ background: 'gray' }}>{tbody.tit}</td></tr>
                                            {
                                               tbody.sodanwon.map(tr=>{
                                                    return(
                                                        <tr>
                                                            <td>{tr.tit}</td>
                                                            <td>2022-05-10</td>
                                                            <td>10 / 12</td>
                                                            <td>2022-05-11</td>
                                                            <td>20 / 25</td>
                                                            <td>8 / 10</td>
                                                        </tr>
                                                    )
                                               }) 
                                            }
                                        </tbody>
                                    )           
                                })
                            }
                        </table>
                        {/* 아르케 */}
                        {/* <table className="mt-15">
                            <colgroup>
                                <col style={{ width: '30%' }}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>단원명</th>
                                    <th colSpan={2}>유형 학습</th>
                                </tr>
                                <tr>
                                    <th>학습일자</th>
                                    <th>결과</th>
                                </tr>

                            </thead>
                            {
                                data.map(tbody=>{
                                    return (
                                        <tbody>
                                            <tr><td colSpan={3} style={{ background: 'gray' }}>{tbody.tit}</td></tr>
                                            {
                                               tbody.sodanwon.map(tr=>{
                                                    return(
                                                        <tr>
                                                            <td>{tr.tit}</td>
                                                            <td>
                                                                <div>2022-06-10</div>
                                                                <div>2022-05-10</div>
                                                            </td>
                                                            <td>10 / 12</td>
                                                        </tr>
                                                    )
                                               }) 
                                            }
                                        </tbody>
                                    )           

                                })
                            }
                        </table> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProgressModal;