import React, { useEffect, useState, useRef, useCallback } from 'react';
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getByteSize } from "../../methods/methods";
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';


const 시간 = Array.from({length: 24}, (v,i) => `${i}시`);
const 분 = Array.from({length: 12}, (v,i) => i === 0 ? '00분' : `${i*5}분`);

function WriteMessageModal({setWriteModal,setViewModal, toName}) {
    let [stuList, setStuList] = useState();
    let [classOption, setClassOption] = useState('반 선택');

    // 반학생 리스트
    let [classList,setClassList] = useState(null);

    // 반학생 리스트에서 받는사람 선택 체크 배열
    let [checkState,setCheckState] = useState([]);

    let [editorContents, setEditorContents] = useState();
    let [writeTit,setWriteTit] = useState('');
    let [to,setTo] = useState(toName);
    let [fileCheck,setFileCheck] = useState([]);

    // 예약발송 체크 
    let [rCheck,setRcheck] = useState(false);
    
    let ref = useRef(false);


    let [hour,setHour] = useState('0시');
    let [minute,setMinute] = useState('00분');


    let [dateInput , setDateInput] = useState('');
    let [regexDate, setRegexDate] = useState('');
    let [selectDisabled, setSelectDisabled]  = useState(true);

        // 반학생 리스트
    useEffect(()=>{
    
        ajax("/notice.php/?mode=notice_usr", {
            class_cd : 123123
        }).then(res=>{
                let arr = [];
                
                res.data.class_list.map(list=>{
                    arr.push(list.class_name);
                })

                setClassList([...arr])
                setStuList(res.data.usr_list);
            })   
        
    },[]);
   
    useEffect(()=>{
        if(ref.current){
            if(toName){
                setTo(`${toName},${checkState.join()}`);
            }else{
                setTo(checkState.join());
            }
        }else{
            ref.current = true;
        }
    },[checkState]);

    const rCheckFunc = (checked) => {
        if(checked){
            setRcheck(true); 
            setSelectDisabled(false);
        }else{
            setRcheck(false);
            setSelectDisabled(true);

        }
    }

 
    const checkForm = () => {
        let validation = true;
      
        if(!writeTit){
            window.alert('제목을 입력하세요')
            return;
        }
        if(!to){
            window.alert('받는 사람을 입력하세요')
            return;
        }
        if(!editorContents){
            window.alert('내용을 입력하세요')
            return;
        }

        return validation;
    }

    const submitForm = () => {
        let newDate = `20${regexDate}`;
        let newHour = hour.replace('시','');
        let newMinute = minute.replace('분','');
        let nt_reserve = `${newDate} ${newHour}:${newMinute}`;
        
        if(!checkForm()){
            return false;
        }else{

            if(!window.confirm('저장하시겠습니까?')) return false;
            
            // ajax("/notice.php", { data : {
            //     mode : 'notice_write',
            //     nt_to : checkState,
            //     nt_to_class : 142966200389505901,
            //     nt_title : writeTit,
            //     nt_reserve : nt_reserve,
            //     nt_content : JSON.stringify(editorContents),
            //     nt_files : encodingFiles,
            // }}).then(res=>{
            //     console.log(res);
            //     setWriteModal(false);
            // }).catch(error=>{
            //     console.log('error');
            // })
        }
    }

    useEffect(()=>{
        setRegexDate(dateInput.replace(/(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3'));
    },[dateInput]);


    let [files, setFiles] = useState([]);
    let encodingFiles = [];
    let 총파일크기 = useRef(0);

    useEffect(()=>{
        console.log(files);
        files.length > 0 &&

        files.forEach(file=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) { 
              encodingFiles.push({
                filename : file.name,
                file : e.target.result
            });
            }
        });

        console.log(encodingFiles);

    },[files])



    const changeCheckState = (checked,list) => {
        if(checked){
            setCheckState([...checkState, list]);
        }else{
            setCheckState(checkState.filter(item => item !== list));
        }
    }

    const allCheckState = (checked) => {
        if(checked){
            let arr = [];
            stuList.map(list=>{
                arr.push(list.usr_name);
            });
            setCheckState([...arr]);
        }else{
            setCheckState([]);
        }
    }

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
            <div className='writeMessageModal cmmnModal'>
                <div className="writeMessageModal-head cmmnModal-head">
                    <div className="tit">
                            <strong>[학습 알림]메시지 보내기</strong>
                    </div>
                    <button className='closeBtn' onClick={()=>setWriteModal(false)}>x</button>
                </div>
                <div className="writeMessageModal-body cmmnModal-body">
                    <div className="left">
                        <SelectBase 
                        onChange={(ele)=>setClassOption(ele)}
                        options={classList}
                        value={classOption && classOption}
                        defaultValue='반 선택'
                        width={'150px'}
                        />
                       <div className="left-check">
                        <div className="check-wrap">
                            <input 
                            type="checkbox" 
                            name="" 
                            className='checkAll' 
                            id='checkAll' 
                            onChange={(e)=>allCheckState(e.target.checked)}
                            checked={stuList ? stuList.length === checkState.length : false}
                            />
                            <label htmlFor='checkAll' className='checkAll pl-20'>전체선택</label>
                        </div> 

                        {
                            stuList && stuList.map(list=>{
                                return(
                                    <div className="check-wrap" key={list.usr_seq}>
                                        <input 
                                        type="checkbox" 
                                        id={list.usr_seq}
                                        onChange={(e)=>changeCheckState(e.target.checked,list.usr_name)}
                                        checked={checkState.includes(list.usr_name)}
                                        />
                                    <label htmlFor={list.usr_seq}>{list.usr_name}</label>
                                    </div>
                                )
                            })
                        }

                       </div>
                    </div>
                    <div className="right">
                        <table>
                            <tbody>
                                <tr>
                                    <th>받는 사람{(checkState && checkState.length > 0 ) && checkState.length}</th>
                                    <td>{to}</td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td className='title'>
                                        <input type="text" placeholder='제목을 입력하세요' onChange={(e)=>setWriteTit(e.target.value)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td>
                                    <div className='editor' style={{ width:'542px' }}>
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
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td className="fileArea fj">
                                        <div>
                                            <input
                                                type="file"
                                                id="file"
                                                onChange={(e) => {
                                                    upload(e.target.files);
                                                    console.log('asd');
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
                                        <div className="fileBtn">
                                            <label htmlFor="file" className="btn">파일 찾기</label>
                                            <button className="btn" onClick={()=>removeFile(fileCheck)}>파일삭제</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="WriteMessageModal-foot cmmnModal-foot">
                    <div className='reserveWrap fj'>
                        <input 
                        type="tel" 
                        className='form-control'
                        placeholder='00-00-00' 
                        maxLength={8}
                        value={regexDate}
                        onChange={(e)=>{
                            setDateInput(e.target.value);
                        }}
                        style={{ width:'100px' }}
                        disabled={selectDisabled}
                        />
                        <SelectBase 
                        onChange={(ele)=>setHour(ele)}
                        options={시간}
                        value={hour}
                        defaultValue='0시'
                        width={'150px'}
                        disabled={selectDisabled}
                        />
                        <SelectBase 
                        onChange={(ele)=>setMinute(ele)}
                        options={분}
                        value={minute}
                        defaultValue='00분'
                        width={'150px'}
                        disabled={selectDisabled}
                        />
                        <input 
                        className='rCheck' 
                        type="checkbox" 
                        onChange={(e)=>rCheckFunc(e.target.checked)}/>
                    </div>
                    <button className={ rCheck ? 'btn' : 'btn disabled'} onClick={submitForm}>예약 발송</button>
                    <button className={rCheck ? 'btn disabled' : 'btn'} onClick={submitForm}>발송하기</button>
                    <button className='btn' onClick={()=>{
                        setWriteModal(false);
                        setViewModal && setViewModal(false);
                    }}>취소</button>
                </div>

            </div>
        </div>
      );
}

export default WriteMessageModal;