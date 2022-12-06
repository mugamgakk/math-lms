import React, { useState, useEffect } from "react";
import ajax from "../../../ajax";
import { falseModal } from '../../../methods/methods';
import Icon from '../../../components/Icon';
import useStudentsStore from "../../../store/useStudentsStore";

let progress = {개념 : '34.8%', 유형 : '71.6%'}
let per = ['20%','40%','60%','80%','100%']
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
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);

    useEffect(()=>{
        getData();
    },[]);

    const getData = async () => {

        let url = "/class_result.php";
        let query = {
            mode: "qa_prog",
            usr_seq : clickStudent.usr_seq,
            bk_cd : bookList.value
        };
        
        let res = await ajax(url, {data: query});
        console.log(res);
        setProgressData(res.data);
        
    }


    return(
        <div className="modal" onClick={(e)=>falseModal(e,setProgressState)}>
            <div className='modal-content progressModal'>
                <div className="modal-header fj">
                       <h2 className="modal-title">학습 진행률</h2>
                    <button className="btn" onClick={() => setProgressState(false)}><Icon icon={"close"} /></button>
                </div>
                <div className="modal-body">
                    <div className="modal-name" style={{ paddingLeft:'20px' }}>
                        <strong className="name">{clickStudent.um_nm}</strong>
                        <ul className="list">
                            <li>{clickStudent.school_grade}</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div className="top fj">
                        <div className="top-table fs">
                            <div className='top-table__tit fc' style={{ width:'100px'}}>학습 진행률</div>
                            <ul className='top-table__bar'>
                                <li className="fs">
                                    <div className="tit fc">개념서</div>
                                    <div className='gageWrap fs'>
                                        <span className='gageWrap-gage' style={{ width: `${progress.개념}` }}>{progress.개념}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item' key={item}>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                                <li className="fs">
                                    <div className="tit fc">유형서</div>
                                    <div className='gageWrap fs' >
                                        <span className='gageWrap-gage' style={{ width: `${progress.유형}` }}>{progress.유형}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item' key={item}>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="top-table fs">
                                <div className='top-table__tit fc text-center' style={{ width:'100px'}}>교재 학습<br/>정답률</div>
                                <ul className='top-table__bar'>
                                    <li className="fs">
                                        <div className="tit fc">개념서</div>
                                        <div className="con fc">{progress.개념}</div>
                                    </li>
                                    <li className="fs">
                                        <div className="tit fc">유형서</div>
                                        <div className="con fc">90.6%</div>
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
                        <table className="tableC">
                            <colgroup>
                            <col width='42.30%'/>
                            <col width='11.53%'/>
                            <col width='11.53%'/>
                            <col width='11.53%'/>
                            <col width='11.53%'/>
                            <col width='11.53%'/>
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
                            </table>
                            <table className="table tableA">
                                <tbody className="scroll">

                            {
                                progressData && progressData.prog_list.map(list=>{
                                    return (
                                            <>
                                                <tr><td className='unit1 fs' style={{ width:'100%'}}>{list.unit1}</td></tr>
                                                {
                                                    list.unit2.map(a=>{
                                                        return(
                                                            <tr>
                                                                <td className='fs' style={{ width:'42.30%' }}>{a.title}</td>
                                                                <td style={{ width:'11.53%' }}>{a.date_co}</td>
                                                                <td style={{ width:'11.53%' }}>{a.score_co}</td>
                                                                <td style={{ width:'11.53%' }}>{a.date_pa}</td>
                                                                <td style={{ width:'11.53%' }}>{a.score_pa}</td>
                                                                <td style={{ width:'11.53%' }}>{a.score_cc}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </>
                                            )           
                                        })
                                    }
                                    </tbody>
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
                <div className="modal-footer">
                    <button className="btn-orange" onClick={()=>setProgressState(false)}>확인</button>
                </div>
            </div>
        </div>
    )
}
export default ProgressModal;