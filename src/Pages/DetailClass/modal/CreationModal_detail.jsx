// yeonju
import React, { useState, useEffect, useRef, useMemo } from "react";
import CreationCheck from '../CreationCheck';
import ajax from "../../../ajax";
import dayjs from "dayjs";
import useStudentsStore from "../../../store/useStudentsStore";
import Icon from "../../../components/Icon";
import { falseModal } from '../../../methods/methods';
import axios from "axios";


function CreationModal({setCreationMo,seq}){

    let [dataList,setDataList] = useState(null);
    const clickStudent = useStudentsStore((state) => state.clickStudent);
    let bookList = useStudentsStore((state) => state.bookList);
    let ref = useRef(false);

    console.log(clickStudent);


    useEffect(()=>{
        createWrongAnswer();
    },[]);

    const createWrongAnswer = async () => {
        // let url = "/class_wrong.php";
        // let query = {
        //     mode: "wa_detail",
        //     wa_seq: seq,
        // };

        // let res = await ajax(url, { data: query });
        // console.log(res);
        const res = await axios("/json/creationModalDetail_table.json");
        setDataList(res.data);
    }

    
    let today = useMemo(()=>{
        let newDate = dayjs(new Date).format('YYYYMMDD');
        return newDate;
    },[])
    
    let [title,setTitle] = useState(`${bookList.label}_오답 정복하기_${today}`);

    return(
        <div className="modal" onClick={(e)=>falseModal(e,setCreationMo)}>
            <div className='modal-content creationModal'>
                <div className="modal-header fj">
                        <h2 className="modal-title">오답 정복하기 생성</h2>
                        <button className="btn" onClick={(e) => {
                            e.stopPropagation();
                            setCreationMo(false)
                        }}><Icon icon={"close"} /></button>
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
                        <table className="table tableA">
                            <thead>
                                <tr>
                                    <th style={{ width:'4.81%',flexDirection:'column' }}>No.</th>
                                    <th style={{ width:'12.51%' }}>대단원</th>
                                    <th style={{ width:'17.32%' }}>소단원</th>
                                    <th style={{ width:'17.32%' }}>개념(키워드)</th>
                                    <th style={{ width:'8.66%' }}>출처</th>
                                    <th style={{ width:'4.81%' }}>번호</th>
                                    <th style={{ width:'9.62%' }}>문제 형식</th>
                                    <th style={{ width:'8.66%' }}>난이도</th>
                                    <th style={{ width:'8.66%' }}>문제 보기</th>
                                    <th style={{ width:'7.69%' }}>정답</th>
                                </tr>
                            </thead>
                            <tbody className="scroll" style={{ height:'429px' }}>
                                {
                                    dataList && dataList.map(data=>{
                                        return(
                                            <Tr data={data} key={data.qa_seq} />
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey mr-4" onClick={(e)=>{
                        e.stopPropagation();
                        setCreationMo(false)
                        }}>닫기</button>
                </div>
            </div>
        </div>
    )
}

const Tr = ({data}) => {
    return(
        <tr key={data.no}>
        <td style={{ width:'4.81%' }}>{data.no}</td>
        <td style={{ width:'12.51%' }}>{data.ltitle}</td>
        <td style={{ width:'17.32%' }}>{data.utitle}</td>
        <td style={{ width:'17.32%' }}>{data.keyword}</td>
        <td style={{ width:'8.66%' }}>{data.source}</td>
        <td style={{ width:'4.81%' }}>{data.qa_seq}</td>
        <td style={{ width:'9.62%' }}>{data.type}</td>
        <td style={{ width:'8.66%' }}>{data.level}</td>
        <td style={{ width:'8.66%' }}>
            <button className='btn-table'>보기</button>
        </td>
        <td style={{ width:'7.69%' }}>{data.crt_ans}</td>
    </tr>
    )
};
export default CreationModal;