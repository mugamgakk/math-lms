// yeonju
import React,{useEffect, useState} from 'react';
import ajax from "../../ajax";
import { fileDown } from "../../methods/methods";
import Icon from '../../components/Icon';


function ViewMessageModal({setViewModal, setWriteModal, type, seq}) {
    let [data,setData] = useState(null);

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {

        let url = "/notice.php";
        let query = {
            mode : 'notice_view',
            nt_seq : seq,
            nt_type : type
        };
        
        let res = await ajax(url,{ data : query});
        console.log(res.data);
        setData(res.data[0]);

     }


    return ( 
        <div className="modal">
            <div className='modal-content viewMessageModal'>
                <div className="modal-header fj">
                    {
                        type == 'send' ? <h2 className="modal-title">보낸 메세지 보기</h2>
                        : <h2 className="modal-title">받은 메세지 보기</h2>

                    }
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
                                        {
                                            type == 'send' ? (
                                                <>
                                                    <span className='top-tit'>받는 사람</span>
                                                    {data.nt_to_name}
                                                </>
                                            ) : (
                                                <>
                                                    <span className='top-tit'>보낸 사람</span>
                                                    {data.nt_from_name}
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='date'>{data.rdate}</div>
                                </div>
                            </div>
                            <div className='mid scroll'>
                                {data.nt_content}
                            </div>
                            <div className='foot'>
                                <div className="file scroll">
                                    <Icon icon={"file"} style={{color:'#666'}} /> 
                                        {
                                            data.files && data.files.map(file=>{
                                                return(
                                                        <div key={file.bf_seq} onClick={()=>fileDown(file.fileurl,file.filename)}>{file.filename}({file.filesize})</div>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
                <div className="modal-footer">
                    {
                        type === 'receive' && <button className='btn-brown mr-4' onClick={()=>{
                            setViewModal(false);
                            setWriteModal(true);
                        }}>답장 쓰기</button>
                    }
                    <button className='btn-orange' 
                    onClick={(e)=>{
                        e.stopPropagation();
                        setViewModal(false);
                    }}>
                    확인</button>
                </div>
            </div>
            </div>
     );
}

export default ViewMessageModal;