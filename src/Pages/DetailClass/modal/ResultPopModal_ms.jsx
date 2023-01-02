// yeonju
import React from 'react';

let data = new Array(20).fill().map((v,i)=> i );

function ResultPopMoal({setResultPopMo,title='강수학/중2-1개념서/I. 수와 연산/1. 소인수분해/개념 확인'}) {
    return ( 
            <div className="modal">
                <div className='modal-content resultPopModal'>
                    <div className="modal-head">
                        <div className="tit">[학습 결과]{title}</div>
                        <button className="close" onClick={()=>setResultPopMo(false)}>X</button>
                    </div>
                    <div className="modal-body">
                        <h5 className='mb-10'>결과: 10/12</h5>
                        <button className='btn'>모두 정답</button>
                        <button className='btn'>모두 오답</button>
                        <div className='contents'>
                            <div className="contents-l">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>번호</td>
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
                    <div className="modal-footer">
                        <button className="btn" onClick={()=>setResultPopMo(false)}>확인</button>
                    </div>
                </div>
            </div>
    );
}

export default ResultPopMoal;