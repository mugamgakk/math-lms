import React, { useEffect } from 'react';
import ajax from "../../../ajax";


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
            <div className="modal">
                <div className="dim"></div>
                <div className='resultPopModal cmmnModal'>
                    <div className="resultPopModal-head cmmnModal-head">
                        <div className="tit">[학습 결과]{title}</div>
                        <button className="close"
                         onClick={(e)=>{
                             e.stopPropagation();
                             setResultPop(false);
                            }}>X</button>
                    </div>
                    <div className="resultPopModal-body cmmnModal-body">
                        <h5 className='mb-10'>결과: 10/12</h5>
                        <div className='contents'>
                            <div className="contents-l">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>번호</td>
                                            <td>정답</td>
                                            <td>학생 답</td>
                                            <td>채점</td>
                                            <td>동영상</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.map(item => {
                                            return(
                                                <tr key={item}>
                                                    <td>1</td>
                                                    <td>①</td>
                                                    <td>①</td>
                                                    <td><button className='btn'>정답</button></td>
                                                    <td><button className='btnPlay'></button></td>
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
                    <div className="resultPopModal-foot cmmnModal-foot">
                        <button className="btn" onClick={(e)=>{
                            e.stopPropagation();
                            setResultPop(false);
                            }}>확인</button>
                    </div>
                </div>
            </div>
    );
}

export default ResultPopMoal;