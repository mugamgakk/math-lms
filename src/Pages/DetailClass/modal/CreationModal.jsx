// yeonju
import React, { useState, useEffect, useRef, useMemo } from "react";
import CreationCheck from '../CreationCheck';
import ajax from "../../../ajax";
import dayjs from "dayjs";
import useStudentsStore from "../../../store/useStudentsStore";
import Icon from "../../../components/Icon";
import { falseModal } from '../../../methods/methods';
import axios from "axios";
import Checkbox from "../../../components/Checkbox";
import { _isScroll } from "../../../methods/methods";

const source = ['개념서', '뜨레스', '엑사스','노벰','맞춤클리닉'];
const type = ['객관식','주관식','서술형','정오 체크'];
const level = ['최상','상','중상','중','중하','하','최하'];


function CreationModal({setCreationMo,ucode}){

    let [checkState,setCheckState] = useState([]);
    let [dataList,setDataList] = useState(null);
    let [newList, setNewList] = useState(null);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);
    let ref = useRef(false);

        let [obj,setObj] = useState({
        source : source,
        type : type,
        level : level,
    });

    useEffect(()=>{
        createWrongAnswer();
    },[]);

    const createWrongAnswer = async () => {
        // let url = "/class_wrong.php";
        // let query = {
        //     mode: "wa_create_list",
        //     usr_seq : clickStudent.usr_seq,
        //     arr_ucode : ucode,
        // };

        // let res = await ajax(url, { data: query });
        const res = await axios("/json/creationModal_table.json");

        console.log(res);
        setDataList(res.data);
        setNewList(res.data);


    }

 
    useEffect(()=>{
        let arr = [];
        let arr2 = [];
        let arr3 = [];

        if(ref.current === true && dataList){
            obj.source.forEach(a=>{
                dataList.forEach(dd=>{
                    if(a == dd.source){
                        arr.push(dd);
                    }
                })               
            })          
            obj.type.forEach(a=>{
                arr.forEach(dd =>{
                    if(a == dd.type){
                        arr2.push(dd);
                    }
                })
            })
            obj.level.forEach(a=>{
                arr2.forEach(dd =>{
                    if(a == dd.level){
                        arr3.push(dd);
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
            usr_seq : clickStudent.usr_seq,
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
    let [scroll,setScroll] = useState(false);

    useEffect(()=>{
        setScroll(_isScroll('creationModal-table', 429))
    });

    return(
        <div className="modal" onClick={(e)=>falseModal(e,setCreationMo)}>
            <div className='modal-content creationModal'>
                <div className="modal-header fj">
                        <h2 className="modal-title">오답 정복하기 생성</h2>
                        <button className="btn" onClick={() => setCreationMo(false)}><Icon icon={"close"} /></button>
                </div>
                <div className="modal-body">
                    <div className="modal-name" style={{ paddingLeft:'20px' }}>
                        <strong className="name">{clickStudent.um_nm}</strong>
                        <ul className="list">
                            <li>{bookList.label}</li>
                        </ul>
                    </div>
                    <div className="contents">
                        <div className="contents-tit fs">
                            <div className="tit fc">제목</div>
                            <div className="text fa">
                                <input type="text" className="textInput" value={title} onChange={(e)=>setTitle(e.target.value)} />
                            </div>
                        </div>
                        <div className="contents-table">
                        <table className="creationModal-table custom-table">
                            <thead>
                                <tr>
                                    <th style={{ width:'6.73%',flexDirection:'column' }}>
                                        <div className="check-wrap">
                                            <Checkbox color='orange' id={'all'} checked={ newList && newList.length === checkState.length } onChange={(e)=>allCheckState(e.target.checked)} />  
                                            <label htmlFor='all'>선택</label>
                                        </div>
                                        <span>{checkState.length}/{newList && newList.length}</span>
                                    </th>
                                    <th style={{ width:'14.51%' }}>대단원</th>
                                    <th style={{ width:'17.3%' }}>소단원</th>
                                    <th style={{ width:'17.4%' }}>개념(키워드)</th>
                                    <th style={{ width:'9.61%' }}>
                                        <CreationCheck 
                                            data={source}
                                            obj={obj}
                                            setObj={setObj}
                                            keyName='source'
                                            tit='출처'
                                        />
                                    </th>
                                    <th style={{ width:'5.76%' }}>번호</th>
                                    <th style={{ width:'9.61%' }}>
                                            <CreationCheck 
                                            data={type} 
                                            obj={obj}
                                            setObj={setObj}
                                            keyName='type'
                                            tit='문제 형식'
                                            />
                                    </th>
                                    <th style={{ width:'8.65%' }}>
                                        <CreationCheck 
                                            data={level}
                                            obj={obj}
                                            setObj={setObj}
                                            keyName='level'
                                            tit='난이도'
                                        />
                                    </th>
                                    <th style={{ width:'10.57%' }}>문제 보기</th>
                                    {
                                        scroll && <th style={{ width: '17px', border:'none' }}></th>
                                    }
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight:'429px' }}>
                                {
                                    newList && newList.map(data=>{
                                        return(
                                            <Tr data={data} key={data.qa_seq} changeCheckState={changeCheckState} checkState={checkState}/>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey mr-4" onClick={()=>setCreationMo(false)}>닫기</button>
                    <button className="btn-orange mr-4" onClick={sendList}>생성하기</button>
                    <button className="btn-brown">미리보기</button>
                </div>
            </div>
        </div>
    )
}

const Tr = ({data,changeCheckState,checkState}) => {
    return(
        <tr key={data.qa_seq}>
            <td style={{ width:'6.73%' }}>
                <div className="check-wrap">
                    <Checkbox color='orange' checked={ checkState.includes(data.qa_seq) } onChange={(e)=>changeCheckState(e.target.checked,data.qa_seq)} />  
                </div>
            </td>
            <td style={{ width:'14.51%' }}>{data.ltitle}</td>
            <td style={{ width:'17.3%' }}>{data.utitle}</td>
            <td style={{ width:'17.4%' }}>{data.keyword}</td>
            <td style={{ width:'9.61%' }}>{data.source}</td>
            <td style={{ width:'5.76%' }}>{data.no}</td>
            <td style={{ width:'9.61%' }}>{data.type}</td>
            <td style={{ width:'8.65%' }}>{data.level}</td>
            <td style={{ width:'10.57%' }}>
                <button className='btn-table'>보기</button>
            </td>
        </tr>
    )
};
export default CreationModal;