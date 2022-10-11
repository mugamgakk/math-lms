import React, { useState, useMemo, useCallback, useRef } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getByteSize } from "../../methods/methods";
import SelectBase from "../../components/ui/select/SelectBase";
import ajax from "../../ajax";
import { useEffect } from 'react';

const 대상 = ['전체','초등','중등','고등'];
const 유형 = ['일반','필독','공지','이벤트'];

function ReferenceRegistrationModal({setRegistModal}) {
    let [target,setTarget] = useState('전체');
    let [category,setCategory] = useState('일반');
    let [title, setTitle] = useState('');
    let [editorContents, setEditorContents] = useState();
    let [fileCheck,setFileCheck] = useState([]);
    let ref = useRef(false);

    useEffect(()=>{
        console.log(category);
        console.log(target);
    },[category,target])

    const editorCon = (event, editor) => {
        setEditorContents(editor.getData());
        console.log(JSON.stringify(editorContents));
    }

    const radioState = (checked,target) => {

        if(checked){
            setCategory(target);
        }

    }
  const checkFile = (checked,file) => {
        if(checked){
            setFileCheck([...fileCheck,file]);
        }else{
            setFileCheck(fileCheck.filter(a => a !== file));               
        }
    }
    const removeFile = (fileCheck) => {

        let arr = [];

        files.forEach(file=>{
            if(!fileCheck.includes(file.name)){
                console.log(file);
                arr.push(file);
            }else{
                총파일크기.current = 총파일크기.current - file.size;
            }
        })
        
        setFileCheck([]);
        setFiles([...arr]);
    }

    let createToday = useMemo(()=>{
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
    
        month = month < 10 ? '0' + month : month;
    
        let newToday = `${year}.${month}.${date}`;
        
        return newToday;

    },[]);



    // 글쓰기 전송

    const formSubmit = () => {
        if(!window.confirm('저장하시겠습니까?')) return false;
     
        ajax("/notice.php", { data : {
            mode : 'write',
            bd_notice : 'N',
            bd_title : title,
            bd_content : JSON.stringify(editorContents),
            files : encodingFiles,
        }
        }).then(res=>{
            console.log(res);
            setRegistModal(false);
        }).catch(error=>{
            console.log('error');
        })

    }


    let [files, setFiles] = useState([]);
    let encodingFiles = [];


    useEffect(()=>{

        files.length > 0 &&

        files.forEach(file=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) { 
              encodingFiles.push(e.target.result);
            }
        });

        console.log(encodingFiles);

    },[files])

    let 총파일크기 = useRef(0);

    const upload = useCallback(
        (파일) => {
            var 업로드파일정규식 = /\.(hwp|doc|docx|xls|xlsx|ppt|pptx|pdf|jpg|png|zip)$/i;
            var 총파일사이즈 = 총파일크기.current;
            var $100mb = 1024 * 1024 * 100; // 100mb

            let arr = [];

            for (let value of 파일) {
                for (let a of files) {
                    if (a.name === value.name) {
                        alert("이미 업로드 된 파일입니다.");
                        return;
                    }
                }

                if (총파일사이즈 >= $100mb) {
                    alert("총 파일 사이즈를 초과하였습니다 (100mb)");
                    return;
                }

                if (업로드파일정규식.test(value.name) === false) {
                    alert("일치하는 파일 형식이 아닙니다.");
                    return;
                }

                if (value.size >= $100mb) {
                    alert("파일이 너무 큽니다.");
                    return;
                }

                arr.push(value);
                총파일크기.current = 총파일크기.current + value.size;
            }

            setFiles([...files, ...arr]);
        },
        [files]
    );
    return ( 
        <div className="modal">
            <div className="dim"></div>
            <div className="rfModal registModal cmmnModal">
                <div className="table">
                    <div className="tr">
                        <div className="th">대상</div>
                        <div className="td">
                        <SelectBase 
                        onChange={(ele)=>setTarget(ele)}
                        options={대상}
                        value={target}
                        defaultValue='전체'
                        width={'150px'}
                    />
                        </div>
                        <div className="th">작성자</div>
                        <div className="td">GNB패럴랙스</div>
                        <div className="th">작성일</div>
                        <div className="td">{createToday}</div>
                    </div>
                    <div className="tr">
                        <div className="th">게시글 유형</div>
                        <div className="td">
                            {
                                유형.map(item=>{
                                    return(
                                        <div className='radioArea'>
                                            <input 
                                            key={item.key} 
                                            type='radio' 
                                            name='radio' 
                                            id={item} 
                                            onChange={(e)=>radioState(e.target.checked,item)}
                                            checked={category === item}
                                            className='radioInput'/>
                                            <label htmlFor={item}>{item}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="tr">
                        <div className="th">글제목</div>
                        <div className="td">
                            <input type="text" onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className='editor'>
                        <CKEditor
                            editor={ClassicEditor}
                            data="중1 수학 자료입니다. 게시물 내용 확인"
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => editorCon(event,editor)}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    </div>
                    <div className='tr mt-10'>
                        <div className="th">첨부파일</div>
                        <div className="td fileTd">
                            <div>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => {
                                        upload(e.target.files);
                                    }}
                                    className="d-none"
                                    multiple
                                />
                
                                <div
                                    style={{ padding: "10px", border: "1px solid #ccc" }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    // 리액트에서 드래그 오버 이벤트를 넣지 않으면 드롭이벤트가 먹지 않음 !
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        var 파일 = e.dataTransfer.files;
                                        // 드롭한 파일들이 모두 들어있음

                                        if (파일.length === 0) {
                                            return;
                                        }

                                        upload(파일);
                                        console.log("드롭됨");
                                    }}
                                >
                                {files.length === 0 && (
                                    <p style={{ textAlign: "center" }}>여기에 첨부파일을 끌어오세요</p>
                                )}
                                {files.map((a, i) => {
                                    return (
                                        <div key={i}>
                                              <input type="checkbox"
                                                onChange={(e)=>checkFile(e.target.checked,a.name)}
                                                checked={fileCheck.includes(a.name)}
                                                />
                                            {a.name} ( {getByteSize(a.size)} )
                                        </div>
                                    );
                                })}
                                </div>
                            </div>
                        </div> 
                        <div className="td">
                        <label htmlFor="file" className="btn">업로드</label>
                        <button className="btn" onClick={()=>removeFile(fileCheck)}>파일삭제</button>
                        </div>    
                    </div>
                </div>
                <div className="foot">
                    <button className='btn' onClick={formSubmit}>저장</button>
                    <button className='btn' onClick={()=>setRegistModal(false)}>취소</button>
                </div>
            </div>
        </div>
     );
}

export default ReferenceRegistrationModal;