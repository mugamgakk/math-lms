// yeonju
import React,{useEffect, useState} from 'react';
import ajax from "../../ajax";
import { fileDown } from "../../methods/methods";
import Icon from '../../components/Icon';


function ViewMessageModal({setViewModal, setWriteModal, type, seq}) {
    let [data,setData] = useState(null);
    console.log(seq,type)

    useEffect(()=>{
        getList();
    },[])

    // useEffect(()=>{

    //     ajax("/notice.php", {data: {
    //         mode: 'notice_view',
    //         nt_seq : seq,
    //         nt_type : type
    //     }
    //     }).then(res=>{
    //         console.log(res);
    //         // setData(res.data);
    //     })   
    // },[]);

    const getList = async () => {

        let url = "/notice.php";
        let query = {
            mode : 'notice_view',
            nt_seq : seq,
            nt_type : type
        };
        
        let res = await ajax(url,{ data : query});
        console.log(res);

     }


    return ( 
        <div className="modal">
            <div className='modal-content viewMessageModal'>
                <div className="modal-header fj">
                      <h2 className="modal-title">보낸 메세지 보기</h2>
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation();
                        setViewModal(false)
                    }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className='modal-body'>
                    {
                        data && (
                            <>
                            <div className='top'>
                                <h3>{data && data.nt_subject}</h3>
                                <div className='fj'>
                                    <div>
                                        <span className='top-tit'>{type} 사람</span>
                                        {data.nt_from_name}
                                    </div>
                                    <div className='date'>{data.date}</div>
                                </div>
                            </div>
                            <div className='mid scroll'>
                                {data.nt_content}
                            </div>
                            <div className='foot'>
                                <div className="file scroll">
                                    <Icon icon={"file"} style={{color:'#666'}} /> 
                                        {
                                            data.files.length > 0 && data.files.map(file=>{
                                                return(
                                                        <div key={file.bf_seq} onClick={()=>fileDown(file.fileurl,file.filename)}>{file.filename}({file.filesize})</div>
                                                )
                                            })
                                        }
                                </div>
                                <div className='fe mt-20'>
                                    <button className='btn-grey'>모두 받기</button>
                                </div> 
                            </div>
                        </>
                        )
                    }
                </div>
                <div className="modal-footer">
                    <button className='btn-orange' 
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

export default ViewMessageModal;