// yeonju
import React, { useState, useEffect } from "react";
import ajax from "../../../ajax";
import { falseModal } from '../../../methods/methods';
import Icon from '../../../components/Icon';
import useStudentsStore from "../../../store/useStudentsStore";
import { _isScroll } from "../../../methods/methods";

const progress = {개념 : '34.8%', 유형 : '71.6%'}
const per = ['20%','40%','60%','80%','100%']

function ProgressModal({setProgressState,name}){
    let [progressData,setProgressData] = useState(null);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);
    let [scroll,setScroll] = useState();
    console.log(scroll);
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
        setProgressData(res.data);
        setScroll(_isScroll(400, 'custom-table'))
        
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
                                        <span className='gageWrap-gage' style={{ width: `${progressData && progressData.prog_co}` }}>{progressData && progressData.prog_co}</span>
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
                                        <span className='gageWrap-gage' style={{ width: `${progressData && progressData.prog_pa}` }}>{progressData && progressData.prog_pa}</span>
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
                                <div className='top-table__tit fc text-center'>교재 학습<br/>정답률</div>
                                <ul className='top-table__bar'>
                                    <li className="fs">
                                        <div className="tit fc">개념서</div>
                                        <div className="con fc">{progressData && progressData.crt_per_co}</div>
                                    </li>
                                    <li className="fs">
                                        <div className="tit fc">유형서</div>
                                        <div className="con fc">{progressData && progressData.crt_per_pa}</div>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    {/* 아르케 */}
                    {/* <div className='top fj'>
                        <div className="top-table fj" style={{ height:'35px' }}>
                            <div className='top-table__tit fc' style={{ width:'140px'}}>학습 진행률</div>
                            <ul className='top-table__bar'>
                                <li className="fs" style={{ height:'100%' }}>
                                    <div className='gageWrap fs'>
                                        <span className='gageWrap-gage' style={{ width: `${progressData && progressData.prog_ar}` }}>{progressData && progressData.prog_ar}</span>
                                        {
                                            per.map(item=>{
                                                return <div className='gageWrap-item'>{item}</div>
                                            })
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="top-table fs" style={{ height:'35px' }}>
                            <div className='top-table__tit fc text-center' style={{ width:'140px'}}>교재 학습 정답률</div>
                            <ul className='top-table__bar'>
                                <li className="fs" style={{ height:'100%'}}>
                                    <div className="tit fc">개념서</div>
                                    <div className="con fc">{progressData && progressData.crt_per_ar}</div>
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
                                    {
                                        scroll && <th style={{ width:"17px",border:'none' }}></th>
                                    }
                                </tr>
                                <tr>
                                    <th>학습일자</th>
                                    <th>결과</th>
                                    <th>학습일자</th>
                                    <th>결과</th>
                                    <th>결과</th>
                                    {
                                        scroll && <th style={{ width:"17px",border:'none' }}></th>
                                    }
                                </tr>
                            </thead>

                            {/* 아르케 */}
                            {/* <colgroup>
                                <col width='60%' />
                                <col width='20%' />
                                <col width='20%' />
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
                            </thead> */}
                            </table>
                            <table className="custom-table">
                                <tbody>
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
                                                                {/* 아르케 */}
                                                                {/* <td className='fs' style={{ width: '60%' }}>{a.title}</td>
                                                                <td style={{ width: '20%' }}>{a.date_pa}</td>
                                                                <td style={{ width: '20%' }}>{a.score_pa}</td> */}
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