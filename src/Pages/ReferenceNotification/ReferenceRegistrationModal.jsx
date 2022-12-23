// yeonju
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getByteSize } from "../../methods/methods";
import SelectBase from "../../components/ui/select/SelectBase";
import ajax from "../../ajax";
import { useEffect } from 'react';
import Icon from '../../components/Icon';
import RadioBox from '../../components/RadioBox';
import CheckBox from '../../components/Checkbox';

const 대상 = [
    { value: null, label: '전체'},
    { value: '초등', label: '초등'},
    { value: '중등', label: '중등'},
    { value: '고등', label: '고등'},
];
const 유형 = ['일반','필독','공지','이벤트'];

function ReferenceRegistrationModal({setModal}) {
    let [target,setTarget] = useState();
    let [category,setCategory] = useState('일반');
    let [title, setTitle] = useState('');
    let [editorContents, setEditorContents] = useState();
    let [fileCheck,setFileCheck] = useState([]);
    let ref = useRef(false);


    const editorCon = (event, editor) => {
        setEditorContents(editor.getData());
        console.log(JSON.stringify(editorContents));
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
            setModal(false);
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
            console.log(fileReader)
            fileReader.onload = function(e) { 
              encodingFiles.push({
                filename : file.name,
                file : e.target.result
            });
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
            <div className="modal-content referenceRegistrationModal">
                <div className="modal-header fj">
                    <h2 className="modal-title">게시물 등록</h2>
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation();
                        setModal(false)
                    }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="tr fs mb-20">
                        <div className="th">대상</div>
                        <div className="td fc w-160">
                        <SelectBase 
                        onChange={(ele)=>setTarget(ele)}
                        options={대상}
                        value={target}
                        defaultValue='전체'
                        width={'150px'}
                    />
                        </div>
                        <div className="th">작성자</div>
                        <div className="td fc w-160">GNB패럴랙스</div>
                        <div className="th">작성일</div>
                        <div className="td fc w-160">{createToday}</div>
                    </div>
                    <div className="tr fs mb-20">
                        <div className="th">게시글 유형</div>
                        <div className="td fa" style={{ paddingLeft:'10px' }}>
                            {
                                유형.map(item=>{
                                    return(
                                        <RadioBox
                                        checked={category === item}
                                        name={'modalRadio'}
                                        onChange={(e)=> {e.target.checked && setCategory(item)}}
                                        label={item}
                                        className={'category'}
                                        />
                                        )
                                    })
                                }
                            </div>
                    </div>
                    <div className="tr fs mb-20">
                        <div className="th">글제목</div>
                        <div className="td fc">
                            <input type="text" className='textInput' onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className='tr editor fs mb-20'>
                        <div className="th">내용</div>
                        <div className="td scroll">
                            <CKEditor
                                editor={ClassicEditor}
                                config={{placeholder: "내용을 입력하세요."}} 
                                data=""
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
                    </div>
                    <div>
                        <span>첨부파일</span>
                        <div className="file td fj">
                            <div className='fileArea scroll' style={{ padding:'10px' }}>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => {
                                        upload(e.target.files);
                                    }}
                                    className="d-none"
                                    multiple
                                />
                
                                <div style={{ height:'100%'}} onDragOver={(e) => {
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
                                    <p className='fc' style={{height:"100%" }}>여기에 첨부파일을 끌어오세요.</p>
                                )}
                                {files.map((a, i) => {
                                    return (
                                        <div key={i}>
                                                <CheckBox  
                                                    color='orange'
                                                    onChange={(e)=>checkFile(e.target.checked,a.name)}
                                                    checked={fileCheck.includes(a.name)}
                                                />
                                            {a.name} ( {getByteSize(a.size)} )
                                        </div>
                                    );
                                })}
                                </div>
                            </div>
                            <div className='fileBtn fa f-column' style={{ justifyContent: 'space-between' }}>
                                <label htmlFor="file" className="btn-grey-border">파일 찾기</label>
                                <button className="btn-grey btn-icon" onClick={()=>removeFile(fileCheck)}>
                                    <Icon icon={"remove"} />
                                    삭제
                                </button>
                            </div>    
                        </div> 
                    </div>
                </div>
                <div className="modal-footer">
                    <button className='btn-grey mr-4' onClick={()=>setModal(false)}>취소</button>
                    <button className='btn-orange' onClick={formSubmit}>저장</button>
                </div>
            </div>
        </div>
     );
}

export default ReferenceRegistrationModal;