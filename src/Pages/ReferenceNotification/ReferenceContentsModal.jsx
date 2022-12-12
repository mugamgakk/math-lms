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
    
    console.log(contents);
    return ( 
        <div className="modal">
            <div className="modal-content">
            <div className="modal-header fj">
                        <h2 className="modal-title">GNB패럴랙스</h2>
                        <button className="btn" onClick={(e) => {
                            e.stopPropagation();
                            setModal(false)
                        }}>
                            <Icon icon={"close"} />
                        </button>
                    </div>
                <h3>No.{seq}</h3>
                {
                    contents && (
                    <div className="table">
                        <div className="tr">
                            <div className="th">대상</div>
                            <div className="td">{contents.bd_cate}</div>
                            <div className="th">작성자</div>
                            <div className="td">{contents.write}</div>
                            <div className="th">작성일</div>
                            <div className="td">{contents.reg_dt}</div>
                            <div className="th">조회수</div>
                            <div className="td">{contents.hit}</div>
                        </div>
                        <div className="tr">
                            <div className="th">글제목</div>
                            <div className="td">{contents.bd_title}</div>
                        </div>
                        <div className='textArea'>
                            {contents.bd_content}
                        </div>
                        <div className='tr'>
                            <div className="th">첨부파일</div>
                            <div className="td fileTd">
                                <div className='fileArea'>
                                    {
                                        contents.files.length > 0 && contents.files.map(file=>{
                                            
                                            return(
                                                <div key={file.bf_seq} onClick={()=>fileDown(file.fileurl,file.filename)}>{file.filename}({file.filesize})</div>
                                            )
                                        })
                                    }
                                </div>
                            </div> 
                            <div className="td"><button className='btn'>선택 받기</button></div>
                            <div className="td"><button className='btn'>모두 받기</button></div>
                            
                        </div>
                    </div>
                    )
                }
                <div className="modal-footer">
                    <button className='btn'>이전 글 보기</button>
                    <button className='btn'>수정</button>
                    <button className='btn'>삭제</button>
                    <button className='btn' 
                    onClick={(e)=>{
                        setModal(false);
                        e.stopPropagation();
                    }}
                    >닫기</button>
                    <button className='btn'>다음 글 보기</button>
                </div>
            </div>
        </div>
    );
}

export default ReferenceContentsModal;