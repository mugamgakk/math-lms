// yeonju
import React, { useState, memo, useEffect } from "react";
import ajax from "../../../ajax";
import ProgressModal from '../modal/progressModal';
import CreationModal from '../modal/CreationModal';
import ResultPopModal from '../modal/ResultPopModal';
import useStudentsStore from "../../../store/useStudentsStore";
import { useCallback } from "react";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import PrintModal_clinic from "../../../components/PrintModal_clinic";

function ClassManagement(){
    let [progressMo, setProgressState] = useState(false);
    let [creationMo, setCreationMo] = useState(false);
    let bookList = useStudentsStore((state) => state.bookList);

    let [data, setData] = useState(null);
    let [wrongPopList, setWrongPopList] = useState([]);
    let [bk_cd, setBkCd] = useState();
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    useEffect(()=>{
        console.log(wrongPopList);
    },[wrongPopList])
    console.log(wrongPopList);

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
    
    // 오답정복하기 클릭

    const confirmWrongModal = (length) => {
        if(length == 0) return window.alert('1개 이상 선택해주세요.');
        setCreationMo(true);
    }

    const allCheck = (checked) => {
        if(!checked){
            setWrongPopList([]);
        }else{
            let arr = [];
            data[0].unit2.map(a=>{
                arr.push(a.ucode);
            });
            setWrongPopList([...arr]);
        }
    }

    return(
        <div className='detailClass classManagement'>
            <div className="fj mb-10">
                <p className="warning">※ 메인 관리 교재를 체크 표시해 두면 오늘의 수업에서 학습 관리하기 편리합니다. (최대 6 종)</p>
                <div className="table-top fa">
                    <button className="btn-orange mr-10" onClick={()=>setProgressState(true)}>학습 진행률 보기</button>
                    <button className="btn-grey btn-icon"><Icon icon={"reload"} />새로고침</button>
                </div>
            </div>
            {
                progressMo && <ProgressModal setProgressState={setProgressState} name={clickStudent.name}/>
            }
            {
                creationMo && <CreationModal 
                setCreationMo={setCreationMo} 
                ucode={wrongPopList}
                />
            }
           <div className="table-wrap">

                <table className='tableC'>
                    <colgroup>
                        <col width='19.71%'/>
                        <col width='11.88%'/>
                        <col width='11.88%'/>
                        <col width='11.88%'/>
                        <col width='11.88%'/>
                        <col width='11.88%'/>
                        <col width='11.88%'/>
                        <col width='8.91%'/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th rowSpan={2}>단원</th>
                            <th colSpan={5} className='bb'>수행 현황</th>
                            <th rowSpan={2}>학습 완료</th>
                            <th rowSpan={2} className='b-none'>오답<br />정복하기<button className="btn-creation" onClick={()=>confirmWrongModal(wrongPopList.length)}>생성</button></th>
                        </tr>
                        <tr>
                            <th>개념 강의</th>
                            <th>개념 확인<button className="btn-creation">일괄 재응시</button></th>
                            <th>개념 설명</th>
                            <th>유형 학습</th>
                            <th>맞춤 클리닉</th>
                        </tr>
                    </thead>
                    </table>
                    <table className="table tableA">
                        <tbody className="scroll">
                            <>
                                <tr className='unit1'>
                                    <td className="fs" style={{ width:'91.09%' }}>
                                        {data && data[0].unit1}
                                    </td>
                                    <td style={{ width:'8.91%' }}>
                                        <Checkbox color='green' id='all' checked={(data && wrongPopList.length == data[0].unit2.length)} onChange={(e) => allCheck(e.target.checked)}/>
                                    </td>
                                </tr>
                                {
                                  data && data[0].unit2.map((b,i)=>{
                                        return(
                                            <Tr 
                                            key={i}
                                            data={b} 
                                            studyDone={studyDone}
                                            retry={retry}
                                            ucode={b.ucode}
                                            setCheckList={setCheckList}
                                            wrongPopList={wrongPopList}
                                            />
                                            )
                                        })
                                    }
                                </>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

const Tr = ({data,studyDone,ucode,retry,setCheckList,wrongPopList}) => {
    let [resultPop, setResultPop] = useState(false);
    let [printMo, setPrintMo] = useState(false);


    return(
        <tr>         
            <td className='fs' style={{ width:'19.8%' }}>{data.title}</td>
            <td style={{ width: '11.88%'}} className={data.state1 ? (data.state1 === '100%' && 'active') : 'disabled' }>{data.state1}</td>
            <td style={{ width: '11.88%'}} className={data.state1 === '100%' && 'active'}>
                <div>
                    {data.state2.score}
                <button className={`btn-orange wh-103 ${data.state2.avail ? '' : 'disabled'}`}>재응시({data.state2.retry})</button>
                </div>
            </td>
            <td  style={{ width: '11.88%'}} className={Object.keys(data.state3).length == 0 ? 'disabled' : (data.state1 === '100%' && 'active')}>
                {
                    Object.keys(data.state3).length !== 0 
                    ?  ( data.state3.file_url ? (
                            <div>
                           <button className={`playBtn ${data.state3.newplay ? 'new' : ''}`} >
                                <Icon icon={"play"} style={{ fontSize:'14px',color:'#444' }} />
                            </button>
                            <button className={`btn-orange wh-103 ${data.state3.avail ? 'btn' : 'btn disabled'}`}>이해:{data.state3.uds} 전달:{data.state3.send}</button>
                            </div>
                        ) : (
                            <div>
                                <div>-</div>
                                <button className='btn-table'>수행 평가</button>
                            </div>
                        )
                    )
                    : null 
                }
              
                
            </td>
            <td style={{ width: '11.88%'}} onClick={()=>setResultPop(true)} className={data.state1 === '100%' && 'active'}>
                <div>
                    {data.state4.score}
                    <button 
                    className={`btn-orange wh-103 ${data.state4.avail ? 'btn' : 'btn disabled'}`}
                    onClick={(e)=>{
                        e.stopPropagation();
                        retry(ucode);
                    }}>재응시({data.state4.retry})</button>
                </div>
                {
                    resultPop && <ResultPopModal setResultPop={setResultPop} />
                }
            </td>
            <td style={{ width: '11.88%'}} className={Object.keys(data.state5).length == 0 ? 'disabled' : (data.state1 === '100%' && 'active')}>
                {
                    Object.keys(data.state5).length !== 0 
                    ?  ( data.state5.avail ? (
                            <div>
                                <div>{data.state5.score}</div>
                                <button className="btn-table" style={{ marginBottom:'4px' }} onClick={()=>setPrintMo(true)}>
                                    <Icon icon={"print"} style={{color:'#666',marginRight:'6px'}}/>
                                    인쇄</button>
                                    {
                                        printMo && <PrintModal_clinic closeModal={setPrintMo}/>
                                    }
                                <button className="btn-orange wh-103">재응시({data.state5.retry})</button>
                            </div>
                        ) : (
                            <div>-</div>
                            )
                            )
                            : null 
                        }
            </td>
            
            <td style={{ width: '11.88%'}}>
                <div>
                    <button className='btn-orange wh-103' onClick={()=>studyDone(ucode)}>학습 완료</button>
                    <button className="btn-table">학습 태도</button>
                </div>
            </td>
            <td style={{ width:'8.91%' }}>
                <Checkbox color='green' checked={wrongPopList.includes(ucode)} onChange={(e)=> setCheckList(e.target.checked,ucode)}/>
            </td>
        </tr>
        )
    }

export default ClassManagement;