import React, { useEffect } from 'react';
import ajax from "../../../ajax";
import Icon from '../../../components/Icon';
import { falseModal } from '../../../methods/methods';

let data = new Array(20).fill().map((v,i)=> i );

function ResultPopMoal({setResultPop,title='강수학/중2-1개념서/I. 수와 연산/1. 소인수분해/개념 확인'}) {

    
        useEffect(()=>{
            ajax("/class_pop.php", { data : {
                mode : 'qa_result',
                usr_seq : 80,
                bk_cd : '15m11coa11',
                sd_kind : 'CO'
            }
            }).then(res=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            })
    },[]);


    return ( 
            <div className="modal" onClick={(e)=>{
                e.stopPropagation();
                falseModal(e,setResultPop);
                }}>
                <div className='modal-content resultPopModal'>
                    <div className="modal-header fj">
                        <h2 className="modal-title">학습 결과</h2>
                        <button className="btn" onClick={(e) => {
                            e.stopPropagation();
                            setResultPop(false)
                        }}>
                            <Icon icon={"close"} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-name" style={{ paddingLeft: "20px" }}>
                            <strong className="name">김수학</strong>
                            <ul className="list">
                                <li>중2-1</li>
                                <li>I. 수와 식의 계산</li>
                                <li>번호, 주제</li>
                            </ul>
                        </div>
                        <div className='contents'>
                            <div className="contents-l">
                                <h5 className='mb-10'>결과: 10/12</h5>
                                <table className='table tableA'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', borderRadius:'8px 0 0 0' }}>번호</th>
                                            <th style={{ width: '20%' }}>정답</th>
                                            <th style={{ width: '20%' }}>학생 답</th>
                                            <th style={{ width: '20%' }}>채점</th>
                                            <th style={{ width: '25%', borderRadius:'0 8px 0 0' }}>동영상</th>
                                        </tr>
                                    </thead>
                                    <tbody className='scroll' style={{ height: '480px' }}>
                                        {
                                            data.map((item,i) => {
                                                return(
                                                    <tr key={item}>
                                                        <td style={{ width: '15%',fontWeight:'600',cursor:'pointer'}}>{i+1}</td>
                                                        <td style={{ width: '20%'}}>①</td>
                                                        <td style={{ width: '20%'}}>①</td>
                                                        <td style={{ width: '20%'}}><button className='btn-correct'>정답</button></td>
                                                        <td style={{ width: '25%'}}><button className='btnPlay'></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="contents-r">
                                        
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-orange" onClick={(e)=>{
                            e.stopPropagation();
                            setResultPop(false);
                        }}>확인</button>
                    </div>
                </div>
            </div>
    );
}

export default ResultPopMoal;