import React,{useEffect, useState} from 'react';
import ajax from "../../ajax";
import { fileDown } from "../../methods/methods";


function ViewMessageModal({setViewModal, setWriteModal, tit, type, seq}) {
    let [data,setData] = useState(null);
    console.log(seq,type)
    useEffect(()=>{
        ajax("/notice.php", {data: {
            mode: 'notice_view',
            nt_seq : seq,
            nt_type : type
        }
        }).then(res=>{
            console.log(res);
            // setData(res.data);
        })   
    },[]);

    return ( 
        <div className="modal">
            <div className="dim"></div>
            <div className='ViewMessageModal cmmnModal'>
                <div className="ViewMessageModal-head cmmnModal-head">
                    <div className="tit">
                            <strong>[학습 알림]{tit} 메세지 보기</strong>
                    </div>
                    <button className="close" onClick={(e)=>{
                        e.stopPropagation();
                        setViewModal(false);
                    }}>X</button>
                </div>
                <div className="ViewMessageModal-body">
                    <table>
                        {
                            data && <Tbody data={data} type={type}/>
                        }
                    </table>
                </div>
                <div className="ViewMessageModal-foot">
                    <button className='btn' 
                    onClick={(e)=>{
                        e.stopPropagation();
                        setViewModal(false);
                    }}>
                    확인</button>
                    {
                        type === 'receive' && <button className='btn' onClick={()=>{
                            setViewModal(false);
                            setWriteModal(true);
                        }}>답장 쓰기</button>
                    }
                </div>
            </div>
            </div>
     );
}

function Tbody ({data,type}){
    return(
        <tbody>
        {
            type === 'send'  &&  (
                <>
                    <tr>
                        <th>받는 사람{data.nt_to_cnt}</th>
                        <td>{data.nt_to_name}</td>
                    </tr>
                    <tr>
                        <th>보낸 시각</th>
                        <td>{data.date}</td>
                    </tr>
                </>
            )
        }
       {
            type === 'receive' && (
            <>
               <tr>
                    <th>보낸 사람</th> 
                    <td>{data.nt_from_name}</td>
                </tr>
                <tr>
                    <th>받은 시각</th>
                    <td>{data.date}</td>
                </tr>
            </>
            )
       }
    <tr>
        <th>제목</th>
        <td>{data.nt_subject}</td>
    </tr>
    <tr>
        <th style={{ height:'200px' }}>내용</th>
        <td>
            <p style={{ height:'100%', overflowY:'scroll' }}>{data.nt_content}</p>
        </td>
    </tr>
    {
        type === 'send' && (
            <tr>
                <th>첨부 파일</th>
                <td>
                    {
                        data.files.map(file=>{
                            return(
                                // <div onClick={()=>fileDown(file)}>{file.filename}</div>
                                <div>{file.filename}</div>
                            )
                        })
                    }
                </td>
            </tr>
        )
    }
   </tbody>
    )
}
export default ViewMessageModal;