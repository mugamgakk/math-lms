import React, { useState, memo, useEffect } from "react";
import ajax from "../../../ajax";
import ProgressModal from '../modal/progressModal';
import CreationModal from '../modal/CreationModal';
import ResultPopModal from '../modal/ResultPopModal';
import useStudentsStore from "../../../store/useStudentsStore";
import { useCallback } from "react";


function ClassManagement({clickStudent}){
    let [progressMo, setProgressState] = useState(false);
    let [creationMo, setCreationMo] = useState(false);
    let bookList = useStudentsStore((state) => state.bookList);

    let [data, setData] = useState(null);
    let [wrongPopList, setWrongPopList] = useState([]);
    let [bk_cd, setBkCd] = useState();

    console.log(clickStudent);

    useEffect(()=>{
        getList();
    },[bookList]);

    const getList = async () => {

        let url = "/class_manage.php/";
        let query = {
            mode: "unit_list",
            usr_seq : clickStudent.usr_seq,
            bk_cd : bookList.value
        };

        let res = await ajax(url, { data: query });

        console.log(res);
        setData(res.data);
    
    };

 
    // 학습 완료
    const studyDone = async (ucode) => {
        let url = "/class_manage.php/";
        let query = {
            mode: "set_passed",
            ucode : ucode,
            usr_seq : clickStudent.usr_seq,
        };

        let res = await ajax(url, { data: query });

        console.log(res);
    };


    // 재응시
    const retry = async (ucode) =>{

        let url = "/class_manage.php/";
        let query = {
            mode: "set_retry",
            ucode : ucode,
            sd_kind : 'CO'
        };

        let res = await ajax(url, { data: query });


    };


    // 오답정복하기 생성 - ucode 배열
    const setCheckList = (checked,ucode) => {
        if(checked){
            setWrongPopList([...wrongPopList, ucode]);
        }else{
            setWrongPopList(wrongPopList.filter(list => list !== ucode));
        }

    }

    
    return(
        <div className='detailClass classManagement'>
            <div className="progress fj" >
                <p>※ 메인 관리 교재를 체크 표시해 두면 오늘의 수업에서 학습 관리하기 편리합니다. (최대 6 종)</p>
                <button className="btn" onClick={()=>setProgressState(true)}>학습 진행률 보기</button>
            </div>
            {
                progressMo && <ProgressModal setProgressState={setProgressState} name={clickStudent.name}/>
            }
            {
                creationMo && <CreationModal 
                setCreationMo={setCreationMo} 
                stuInfo={clickStudent} 
                ucode={wrongPopList}
                bookList={bookList}
                />
            }
           <div className="table-wrap">

           <table className='tableC'>
                    <colgroup>
                        <col width='9.33%'/>
                        <col width='9.33%'/>
                        <col width='32%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='8%'/>
                        <col width='9.33%'/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th rowSpan={2}>학생명 (아이디)</th>
                            <th rowSpan={2}>교재</th>
                            <th rowSpan={2}>단원</th>
                            <th colSpan={5} className='bb'>수행 현황</th>
                            <th rowSpan={2} className='b-none'>학습 완료</th>
                            <th rowSpan={2} className='b-none'>학습 완료</th>
                        </tr>
                        <tr>
                            <th>개념 강의</th>
                            <th>개념 확인</th>
                            <th>개념 설명</th>
                            <th>유형 학습</th>
                            <th>맞춤 클리닉</th>
                        </tr>
                    </thead>
            {
                data && data.map(a=>{
                    return(
                        <tbody key={a}>
                             <tr style={{ background:'gray' }}>
                                <td colSpan={8}>{a.unit1}</td>
                            </tr>
                                {
                                    a.unit2.map((b,i)=>{
                                        return(
                                            <Tr 
                                                key={i}
                                                data={b} 
                                                studyDone={studyDone}
                                                retry={retry}
                                                // ucode={a.ucode}
                                                ucode={b.ucode}
                                                setCheckList={setCheckList}
                                            />
                                        )
                                    })
                                }
                        </tbody>
                    )
                })
            }
            </table>
            </div>
        </div>
    )
}

const Tr = ({data,studyDone,ucode,retry,setCheckList}) => {
    let [resultPop, setResultPop] = useState(false);

    return(
        <tr>         
            <td>{data.title}</td>
            <td className={!data.state1 ? 'disabled' : ''}>{data.state1}</td>
            <td>{data.state2.score}
                <button className={data.state2.avail ? 'btn' : 'btn disabled'}>재응시({data.state2.retry})</button>
            </td>
            <td className={Object.keys(data.state3).length == 0 ? 'disabled' : ''}>
                {
                    Object.keys(data.state3).length !== 0 
                    ?  ( data.state3.file_url ? (
                            <>
                            <div className="btn-wrap">
                                <button>play</button>
                                <button>down</button>
                            </div>
                            <button className={data.state3.avail ? 'btn' : 'btn disabled'}>이해:{data.state3.uds} 전달:{data.state3.send}</button>
                            </>
                        ) : (
                            <>
                                <div>-</div>
                                <button className='btn'>수행 평가</button>
                            </>
                        )
                    )
                    : null 
                }
              
                
            </td>
            <td onClick={()=>setResultPop(true)}>
                {data.state4.score}
                <button 
                className={data.state4.avail ? 'btn' : 'btn disabled'}
                onClick={(e)=>{
                    e.stopPropagation();
                    retry(ucode);
                    }}>재응시({data.state4.retry})</button>
                {
                    resultPop && <ResultPopModal setResultPop={setResultPop} />
                }
            </td>
            <td className={Object.keys(data.state5).length == 0 ? 'disabled' : ''}>
            {
                    Object.keys(data.state5).length !== 0 
                    ?  ( data.state5.avail ? (
                            <>
                                <div>{data.state5.score}</div>
                                <button className="btn">인쇄</button>
                                <button className="btn">재응시({data.state5.retry})</button>
                            </>
                        ) : (
                                <div>-</div>
                        )
                    )
                    : null 
                }
            </td>
            
            <td>
                <button className='btn' onClick={()=>studyDone(ucode)}>학습 완료</button>
                <button className="btn">학습 태도</button>
            </td>
            <td><input type='checkbox' onChange={(e)=>setCheckList(e.target.checked,ucode)}/></td>
        </tr>
        )
    }

export default ClassManagement;