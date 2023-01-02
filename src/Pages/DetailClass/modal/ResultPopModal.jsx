// yeonju
import React, { useEffect, useState, useMemo } from 'react';
import ajax from "../../../ajax";
import Icon from '../../../components/Icon';
import { falseModal } from '../../../methods/methods';
import ReactPlayer from 'react-player';
import useStudentsStore from '../../../store/useStudentsStore';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchData } from '../../../methods/methods';

// let data = new Array(20).fill().map((v,i)=> i );

function ResultPopMoal({setResultPop,ucode}) {

    const clickStudent = useStudentsStore(state=>state.clickStudent);
    let [dataList,setDataList] = useState(null);
    let [clickState,setClickState] = useState(0);
    let [video, setVideo] = useState(false);
    const queryClient = useQueryClient();

    // const data = useMemo(() => {
    //     return {
    //         mode : 'qa_result',
    //         usr_seq : clickStudent.usr_seq,
    //         ucode: ucode,
    //         sd_kind : 'QA',
    //         qseq : 1
    //     };
    // },[clickStudent.usr_seq]);

    // // get Data
    // const list = useQuery(["lists"], () => fetchData("class_result", data), {
    //     refetchOnWindowFocus : false
    // });

    // console.log(list);

   useEffect(()=>{
        getData();
   },[])

        const getData = async() => {

            let url = '/class_result.php';
            let query = {
                mode : 'qa_result',
                usr_seq : clickStudent.usr_seq,
                ucode: ucode,
                sd_kind : 'QA',
                qseq : 1,
            }

            const res = await ajax( url, { data: query} );
            
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
                                <div className="top fs mb-10" style={{ fontWeight:'600' }}>
                                    맞힌 개수
                                    {
                                        dataList && (
                                            <strong>{dataList.qa_result[0].correct_a} / {dataList.qa_result.length} 개</strong>
                                        )
                                    }
                                    2022. 7. 12
                                    {/* 문항 학습 결과 팝업 - 아르케(초등) */}
                                    <div className='fc' style={{ marginLeft:'6px' }}>
                                        <button className='btn-correct mr-4' >모두 정답</button>
                                        <button className='btn-incorrect' >모두 오답</button>
                                    </div>
                                </div>
                                <table className='table tableA'>
                                    {/* 문항 학습 결과 팝업 - 아르케(초등) */}
                                        <thead>
                                            <tr>
                                                <th style={{ width: '20%', borderRadius:'8px 0 0 0' }}>번호</th>
                                                <th style={{ width: '40%' }}>채점</th>
                                                <th style={{ width: '40%', borderRadius:'0 8px 0 0' }}>동영상</th>
                                            </tr>
                                        </thead>
                                    {/* <thead>
                                        <tr>
                                            <th style={{ width: '16%', borderRadius:'8px 0 0 0' }}>번호</th>
                                            <th style={{ width: '22%' }}>정답</th>
                                            <th style={{ width: '22%' }}>학생 답</th>
                                            <th style={{ width: '20%' }}>채점</th>
                                            <th style={{ width: '20%', borderRadius:'0 8px 0 0' }}>동영상</th>
                                        </tr>
                                    </thead> */}

                                    <tbody className='scroll' style={{ height: '480px' }}>
                                        {
                                            dataList && dataList.qa_result.map((item,i) => {
                                                return(
                                                    <>
                                                    {/* <tr key={i} className={clickState == i ? 'active' : ''}>
                                                        <td onClick={()=> setClickState(i)} style={{ width: '16%',fontWeight:'600',cursor:'pointer'}}>{i+1}</td>
                                                        <td style={{ width: '22%',fontSize:'26px'}}>
                                                            {
                                                                item.crt_ans.map(a=>{
                                                                    return(
                                                                        <>
                                                                            {
                                                                                {
                                                                                    1: '①',
                                                                                    2: '②',
                                                                                    3: '③',
                                                                                    4: '④',
                                                                                    5: '⑤',
                                                                                }[a]
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                        <td style={{ width: '22%',fontSize:'26px'}}>
                                                            {
                                                                item.std_and.map(a=>{
                                                                    return(
                                                                        <>
                                                                            {
                                                                                {
                                                                                    1: '①',
                                                                                    2: '②',
                                                                                    3: '③',
                                                                                    4: '④',
                                                                                    5: '⑤',
                                                                                }[a]
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                        <td style={{ width: '20%'}}>
                                                            <button className={item.is_correct == 'Y' ? 'btn-correct' : 'btn-incorrect'}>
                                                            {item.is_correct == 'Y' ? '정답' : '오답'}
                                                            </button></td>
                                                        <td style={{ width: '20%'}}>
                                                            <button className='btnPlay' onClick={()=>setVideo(true)}></button>
                                                        {
                                                            video && <VideoPlayer closeModal={setVideo} />
                                                        }
                                                        </td>
                                                    </tr> */}
                                                        {/* 문항 학습 결과 팝업 - 아르케(초등) */}
                                                    <tr>
                                                        <td onClick={()=> setClickState(i)} style={{ width: '20%',fontWeight:'600',cursor:'pointer'}}>{i+1}</td>
                                                        <td style={{ width: '40%'}}>
                                                            <button className={item.is_correct == 'Y' ? 'btn-correct' : 'btn-incorrect'}>
                                                            {item.is_correct == 'Y' ? '정답' : '오답'}
                                                            </button>
                                                        </td>
                                                        <td style={{ width: '40%'}}>
                                                            <button className='btnPlay' onClick={()=>setVideo(true)}></button>
                                                        {
                                                            video && <VideoPlayer closeModal={setVideo} />
                                                        }
                                                        </td>
                                                    </tr>
                                                    </>
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
                                        <span>{ dataList && dataList.qa_result[clickState].qa_keyword }</span>
                                    </div>
                                                                        
                                    <img className='img-q' src={`${dataList && dataList.qa_result[clickState].qa_path}${dataList && dataList.qa_result[clickState].qa_code}_Q.png`} alt="" style={{marginBottom:'20px'}}/>
                                    {
                                        ['①','②','③','④','⑤'].map((b,i)=>{
                                            return(
                                                <div className='choice fa'>
                                                <span>{b}</span><img className='img-f' src={`${dataList && dataList.qa_result[clickState].qa_path}${dataList && dataList.qa_result[clickState].qa_code}_${i+1}.png`}/>
                                                </div>
                                            )
                                        })
                                    }
                                    <img className='img-q mt-20' src={`${dataList && dataList.qa_result[clickState].qa_path}${dataList && dataList.qa_result[clickState].qa_code}_S.png`} alt="" style={{marginBottom:'20px'}}/>
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
