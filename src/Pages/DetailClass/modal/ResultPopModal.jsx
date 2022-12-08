import React, { useEffect, useState } from 'react';
import ajax from "../../../ajax";
import Icon from '../../../components/Icon';
import { falseModal } from '../../../methods/methods';
import axios from 'axios';
import ReactPlayer from 'react-player';

let data = new Array(20).fill().map((v,i)=> i );

function ResultPopMoal({setResultPop}) {

    let [dataList,setDataList] = useState(null);
    let [clickState,setClickState] = useState(0);
    let [video, setVideo] = useState(false);

    useState(()=>{
        console.log(clickState);
    },[clickState])
        useEffect(()=>{
            // ajax("/class_pop.php", { data : {
            //     mode : 'qa_result',
            //     usr_seq : 80,
            //     bk_cd : '15m11coa11',
            //     sd_kind : 'CO'
            // }
            // }).then(res=>{
            //     console.log(res);
            // }).catch((error)=>{
            //     console.log(error);
            // })
            getData();
        },[]);

        const getData = async() => {
            const res = await axios("/json/resultPop_table.json");
            console.log(res);
            setDataList(res.data);

        }

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
                                <div className="top mb-10">
                                    맞힌 개수
                                    <strong>9 개 / {dataList && dataList.length} 개</strong>
                                    2022. 7. 12
                                </div>
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
                                            dataList && dataList.map((item,i) => {
                                                return(
                                                    <tr key={i} className={clickState == i ? 'active' : ''}>
                                                        <td onClick={()=> setClickState(i)} style={{ width: '15%',fontWeight:'600',cursor:'pointer'}}>{i+1}</td>
                                                        <td style={{ width: '20%'}}>{item.answer}</td>
                                                        <td style={{ width: '20%'}}>{item.stu_answer}</td>
                                                        <td style={{ width: '20%'}}><button className={item.state ? 'btn-correct' : 'btn-incorrect'}>
                                                            {item.state ? '정답' : '오답'}
                                                            </button></td>
                                                        <td style={{ width: '25%'}}><button className='btnPlay' onClick={()=>setVideo(true)}></button>
                                                        {
                                                            video && <VideoPlayer closeModal={setVideo} />
                                                        }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="contents-r scroll">
                                <div>
                                    <div className='top fj' style={{ marginBottom:'15px' }}>
                                        <h1>{clickState < 9 ? `0${clickState+1}` : clickState+1}</h1>
                                        <span>소인수분해</span>
                                    </div>
                                    
                                    <img className='img-q' src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${dataList && dataList[clickState].qa_code}_Q.png`} alt="" style={{marginBottom:'20px'}}/>
                                    {
                                        ['①','②','③','④','⑤'].map((b,i)=>{
                                            return(
                                                <div className='choice fa'>
                                                <span>{b}</span><img className='img-f' src={`https://file.parallaxedu.com/pxm/gplum/data/M11/tres/${dataList && dataList[clickState].qa_code}_${i+1}.png`}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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

function VideoPlayer ({closeModal}){
    return(
        <div className='videoPlayer'>
            <div className='top'>
            <button className='fc' onClick={()=>closeModal(false)}><Icon icon={"close"} style={{fontSize:'25px'}}/></button>
            </div>
            <ReactPlayer 
            url='https://youtu.be/QoGyp3yeDkc' 
            width='100%'       
            height='500px'        
            playing={true}       
            // muted={true}        
            controls={true}       
            // light={false} 
            />
        </div>
    )

}

export default ResultPopMoal;
