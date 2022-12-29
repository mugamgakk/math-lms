// yeonju
import React, {useEffect,useState} from 'react';
import ajax from "../../ajax";
import { fileDown } from '../../methods/methods';
import FileSaver from "file-saver";
import JSZip from "jszip";
import Icon from '../../components/Icon';

function ReferenceContentsModal({seq,setModal}) {

    let [contents,setContents] = useState(null);
    
    useEffect(()=>{
        ajax("/board.php", { data : {
            mode : 'view',
            bd_seq : seq,
        }
        }).then(res=>{
            console.log(res);
            setContents(res.data[0]);
        })
    },[])

    const makeZip = (filesArr, fileName = "download") => {

        if(filesArr.length === 0){
            return 
        }
    
        const zip = new JSZip();
    
        filesArr.forEach(ele => {
            zip.file(ele.filename, ele, {binary: true})
        })
    
        zip.generateAsync({type: "blob"})
            .then(content => {
                FileSaver.saveAs(content, fileName)
            })
    }
    
    return ( 
        <div className="modal">
            <div className="modal-content referenceContentsModal">
                <div className="modal-header fj">
                        <h2 className="modal-title">게시물 확인</h2>
                        <button className="btn" onClick={(e) => {
                            e.stopPropagation();
                            setModal(false)
                        }}>
                            <Icon icon={"close"} />
                        </button>
                </div>
                <div className="modal-body">
                    {
                        contents && (
                            <>
                            <div className='top'>
                                <h3>{contents && contents.bd_title}</h3>
                                <div className='text-right'>조회수:{contents.hit}</div>
                                <div className='fj'>
                                <div>
                                    <span className='top-tit'>대상</span>
                                    {contents.bd_cate}
                                </div>
                                <div><span className='top-tit'>작성자</span>{contents.write}</div>
                                <div className='date'>{contents.reg_dt}</div>
                                </div>
                            </div>
                            <div className='mid scroll'>
                                {contents.bd_content}
                            </div>
                            <div className='foot'>
                                <div className="file scroll">
                                    <Icon icon={"file"} style={{color:'#666'}} /> 
                                        {
                                            contents.files.length > 0 && contents.files.map(file=>{
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
                    <button className='btn-brown mr-4'>이전 글 보기</button>
                    <button className='btn-orange-border mr-4' onClick={()=>{

                    }}>수정</button>
                    <button className='btn-orange mr-4'>삭제</button>
                    <button className='btn-grey mr-4' 
                    onClick={(e)=>{
                        setModal(false);
                        e.stopPropagation();
                    }}
                    >닫기</button>
                    <button className='btn-brown'>다음 글 보기</button>
                </div>
            </div>
        </div>
    );
}

export default ReferenceContentsModal;