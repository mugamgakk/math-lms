import React, { useState, useEffect, useRef, memo } from "react";
import CreationCheck from '../CreationCheck';
import ajax from "../../../ajax";
import dayjs from "dayjs";
import { useMemo } from "react";

const source = ['개념서', '뜨레스', '엑사스','노벰','맞춤클리닉'];
const type = ['객관식','주관식','서술형','정오 체크'];
const level = ['최상','상','중상','중','중하','하','최하'];

const data = [
        {
            qa_seq : 123,
            ltitle : 'i.수와 연산',
            utitle : '1.소인수분해',
            keyword : '소수와 합성수',
            source : '뜨레스',
            no : 1,
            type : '객관식',
            level :'중'
        },
        {
            qa_seq : 124,
            ltitle : 'i.수와 연산',
            utitle : '1.소인수분해',
            keyword : '소수와 합성수',
            source : '맞춤클리닉',
            no : 1,
            type : '주관식',
            level :'최상'
        },
        {
            qa_seq : 125,
            ltitle : 'i.수와 연산',
            utitle : '1.소인수분해',
            keyword : '소수와 합성수',
            source : '개념서',
            no : 1,
            type : '서술형',
            level :'최하'
        },
        {
            qa_seq : 126,
            ltitle : 'i.수와 연산',
            utitle : '1.소인수분해',
            keyword : '소수와 합성수',
            source : '노벰',
            no : 1,
            type : '객관식',
            level :'상'
        },
    ]

function CreationModal({setCreationMo,stuInfo,bookList}){

    let [checkState,setCheckState] = useState([]);
    let [dataList,setDataList] = useState(data);
    let [newList, setNewList] = useState(dataList);
    let ref = useRef(false);

    console.log(checkState);


    let [obj,setObj] = useState({
        source : source,
        type : type,
        level : level,
    });

    // useEffect(()=>{
    //     createWrongAnswer();
    // },[]);

    // const createWrongAnswer = async () => {
    //     let url = "/class_wrong.php/";
    //     let query = {
    //         mode: "wa_create_list",
    //         usr_seq : 80,
    //         arr_ucode : 'CO'
    //     };

    //     let res = await ajax(url, { data: query });
    //     console.log(res);
    //     // setDataList(res);
    // }

 
    useEffect(()=>{
        let arr = [];
        let arr2 = [];
        let arr3 = [];

        if(ref.current === true){
            obj.source.forEach(a=>{
                dataList.forEach(dd=>{
                    if(a == dd.source){
                        arr.push(dd)
                    }
                })               
            })          
            obj.type.forEach(a=>{
                arr.forEach(dd =>{
                    if(a == dd.type){
                        arr2.push(dd)
                    }
                })
            })
            obj.level.forEach(a=>{
                arr2.forEach(dd =>{
                    if(a == dd.level){
                        arr3.push(dd)
                    }
                })
            })

            setNewList(arr3)

        }else{
            ref.current = true
        }

    },[obj])


    const changeCheckState = (checked,seq) => {
        if(checked){
            setCheckState([...checkState, seq]);
        }else{
            setCheckState(checkState.filter(item => item !== seq));
        }
     
    }

    

    const allCheckState = (checked) => {
        if(checked){
            let arr = [];
            dataList.forEach(list=>{
                for(let key in list){
                    if(key === 'qa_seq'){
                        arr.push(list[key]);
                    }
                }
            });
            setCheckState(arr);
        }else{
            setCheckState([]);
        }
    }

    // 오답 생성 전송
    const sendList = async () => {

        if(!window.confirm('오답 생성 전송?')) return;
        
        let url = "/class_wrong.php/";
        let query = {
            mode: "wa_create_save",
            usr_seq : stuInfo.usr_seq,
            qa_no : checkState
        };
            
            let res = await ajax(url, { data: query });
            console.log(res);
    }

    
    let today = useMemo(()=>{
        let newDate = dayjs(new Date).format('YYYYMMDD');
        return newDate;
    },[])
    
    let [title,setTitle] = useState(`${bookList.label}_오답 정복하기_${today}`);

    return(
        <div className="modal">
            <div className="dim"></div>
            <div className='creationModal cmmnModal'>
                <div className="creationModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[오답 정복하기 생성]{stuInfo.um_nm}/{bookList.label}</strong>
                    </div>
                    <button className="close" onClick={()=>setCreationMo(false)}>X</button>
                </div>
                <div className="creationModal-body cmmnModal-body">
                    <div className='top mb-10'>
                        <div className="top-tit">제목</div>
                        <input type='text' className="top-con" value={title} onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                    <table>
                        <colgroup>
                            <col width='5%'/>
                            <col width='10%'/>
                            <col width='20%'/>
                            <col width='20%'/>
                            <col width='8%'/>
                            <col width='6%'/>
                            <col width='12%'/>
                            <col width='12%'/>
                            <col width='7%'/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>
                                    <div className="check-wrap">
                                        <input type="checkbox" name="" className={checkState.length > 0 && checkState.length < dataList.length ? 'checkAll isCheck' : 'checkAll'} id='checkAll' 
                                        onChange={(e)=>allCheckState(e.target.checked)}
                                         checked={ dataList.length === checkState.length }/>
                                        <label htmlFor='checkAll' className='checkAll pl-20' >선택</label>
                                    </div>
                                    <span>{checkState.length}/{dataList.length}</span>
                                </td>
                                <td>대단원</td>
                                <td>소단원</td>
                                <td>개념(키워드)</td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={source}
                                        obj={obj}
                                        setObj={setObj}
                                        keyName='source'
                                        />
                                        <span>출처</span>
                                    </div>
                                </td>
                                <td>번호</td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={type} 
                                        obj={obj}
                                        setObj={setObj}
                                        keyName='type'
                                        />
                                        <span>문제 형식</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={level}
                                        obj={obj}
                                        setObj={setObj}
                                        keyName='level'
                                        />
                                        <span>난이도</span>
                                    </div>
                                </td>
                                <td>문제 보기</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newList && 
                                newList.map(data=>{
                                    return(
                                        <Tr data={data} key={data.qa_seq} changeCheckState={changeCheckState} checkState={checkState}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="creationModal-foot cmmnModal-foot">
                    <button className="btn">미리보기</button>
                    <button className="btn" onClick={sendList}>생성하기</button>
                    <button className="btn" onClick={()=>setCreationMo(false)}>닫기</button>
                </div>
            </div>
        </div>
    )
}

const Tr = ({data,changeCheckState,checkState}) => {
    return(
        <tr key={data.qa_seq}>
        <td>
            <div className="check-wrap">
                <input type="checkbox" id={data.qa_seq}
                 onChange={(e)=>changeCheckState(e.target.checked,data.qa_seq)} 
                 checked={ checkState.includes(data.qa_seq)}/>
                <label htmlFor={data.qa_seq}></label>
            </div>
        </td>
        <td>{data.ltitle}</td>
        <td>{data.utitle}</td>
        <td>{data.keyword}</td>
        <td>{data.source}</td>
        <td>{data.no}</td>
        <td>{data.type}</td>
        <td>{data.level}</td>
        <td>
            <button className='btn'>보기</button>
        </td>
    </tr>
    )
};
export default CreationModal;