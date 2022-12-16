// yeonju
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getByteSize } from "../../methods/methods";
import CheckBox from '../../components/Checkbox'
import Icon from '../../components/Icon';
import CustomDatePicker from '../../components/CustomDatePicker';
import dayjs from 'dayjs';
import { falseModal } from '../../methods/methods'

// const 시간 = Array.from({length: 24}, (v,i) => `${i}시`);

const 시간 = [];

 for(let i=0; i<24; i++){
    시간[i] = { label : `${i}시`, value : `${i}시`};
 }

 const 분 = [];

for(let i=0; i<12; i++){
    i === 0 ? 분[i] = { value : '00분', label: '00분'} : 분[i] = { value : `${i*5}분`, label : `${i*5}분` }
}

function WriteMessageModal({setWriteModal,setViewModal, toName}) {
    let [stuList, setStuList] = useState();

    // 반학생 리스트
    let [classList,setClassList] = useState(null);
    let [classValue, setClassValue] = useState();

    // 반학생 리스트에서 받는사람 선택 체크 배열
    let [checkState,setCheckState] = useState([]);
    // 받는 사람 seq 배열
    let [checkSeq,setCheckSeq] = useState([]);

    
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
    let [date,setDate] = useState(new Date());

    useEffect(()=>{
        getList();
    },[])

    
    const getList = async () => {

        let url = "/notice.php/?mode=notice_usr";
        let query = {
            class_cd : 123123
        };
        
        let res = await ajax(url, query);
        console.log(res);

        let arr = [];
                
        res.data.class_list.map(list=>{
            arr.push({value : list.class_cd, label : list.class_name});
        })

        setClassList([...arr]);
        setStuList(res.data.usr_list);
     }

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


    useEffect(()=>{
        setRegexDate(dateInput.replace(/(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3'));
    },[dateInput]);

    
    let [files, setFiles] = useState([]);
    
    let 총파일크기 = useRef(0);
    
    let encodingFiles = useMemo(()=>{

        let arr = [];
        files.length > 0 &&
        files.forEach(file => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) { 
                arr.push({
                filename : file.name,
                file : e.target.result
                });
            }
        });

        return arr;

    },[files]);


    const changeCheckState = (checked,list) => {
        if(checked){
            setCheckState([...checkState, list.usr_name]);
            setCheckSeq([...checkSeq, parseInt(list.usr_seq)])
        }else{
            setCheckState(checkState.filter(item => item !== list.usr_name));
            setCheckSeq(checkSeq.filter(item => item !== parseInt(list.usr_seq)));
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

    const submitForm = () => {
        let nt_reserve;
        if(rCheck){
            let newDate = dayjs(date).format('YYYY-MM-DD');
            let newHour = hour.label.replace('시','') < 10 ? `0${hour.label.replace('시','')}` : hour.label.replace('시','') ;
            let newMinute = minute.label.replace('분','') < 10 ? `0${minute.label.replace('분','')}` : minute.label.replace('분','');
            nt_reserve = `${newDate} ${newHour}:${newMinute}`;
        }else{
            nt_reserve = null;

        }

        if(!checkForm()){
            return false;
        }else{
            console.log(nt_reserve);
            if(!window.confirm('저장하시겠습니까?')) return false;
            
            ajax("/notice.php", { data : {
                mode : 'notice_write',
                nt_to : checkSeq,
                nt_title : writeTit,
                nt_content : JSON.stringify(editorContents),
                nt_files : encodingFiles,
                nt_reserve : nt_reserve
            }}).then(res=>{
                console.log(res);
                setWriteModal(false);
            }).catch(error=>{
                console.log('error');
            })
        }
    }
return (
        <div className="modal" onClick={(e)=>falseModal(e,setWriteModal)}>
            <div className='modal-content writeMessageModal'>
                <div className="modal-header fj">
                      <h2 className="modal-title">[학습 알림] 메시지 보내기</h2>
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation();
                        setWriteModal(false)
                    }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="left">
                        <SelectBase 
                        onChange={(ele)=>setClassValue(ele)}
                        options={classList && classList}
                        value={classValue && classValue}
                        defaultValue='반 선택'
                        width={'100%'}
                        className={'mb-10'}
                        />
                        <table className='table tableB'>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>
                                        <CheckBox 
                                            onChange={(e)=>allCheckState(e.target.checked)}
                                            checked={ stuList?.length === checkState.length}
                                        />
                                    </th>
                                    <th style={{ width: '150px' }}>이름</th>
                                </tr>
                            </thead>
                            <tbody className='scroll' style={{ height: '584px' }}>
                                {
                                    stuList && stuList.map(list=>{
                                        return(
                                            <tr className="check-wrap" key={list.usr_seq}>
                                                <td style={{ width: '40px' }}>
                                                <CheckBox 
                                                    id={list.usr_seq}
                                                    onChange={(e)=>changeCheckState(e.target.checked,list)}
                                                    checked={checkState.includes(list.usr_name)}
                                                    />
                                                </td>
                                                <td style={{ width: 'calc(100% - 40px)' }}>
                                                    <label htmlFor={list.usr_seq}>{list.usr_name}</label>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="right">
                        <div className='mb-10'>
                            <span className='tit'>받는 사람 ({(checkState && checkState.length > 0 ) && checkState.length})</span>
                            <input type='text' className='textInput' value={to} readOnly/>
                        </div>
                        <div className='mb-10'>
                            <span className='tit'>제목</span>
                            <input type='text' className='textInput' placeholder='제목을 입력하세요.' onChange={(e)=>setWriteTit(e.target.value)}/>
                        </div>
                        <div className='mb-20'>
                            <span className='tit'>내용</span>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{placeholder: "내용을 입력하세요."}} 
                                data=""
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(event, editor) => editorCon(event,editor)}
                                onBlur={(event, editor) => {
                                    // console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log("Focus.", editor);
                                }}
                            />
                        </div>
                        <div className="fileArea fj">
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => {
                                    upload(e.target.files);
                                }}
                                className="d-none"
                                multiple
                            />
                          
                            <div className='scroll' onDragOver={(e) => {
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
                                    // console.log("드롭됨");
                                }}
                            >
                                {files.length === 0 && (
                                    <p className='fc' style={{ textAlign: "center" }}>여기에 첨부파일을 끌어오세요</p>
                                )}
                                {files.map((a, i) => {
                                    return (
                                        <div key={i}>
                                              <CheckBox 
                                                color='orange' 
                                                id={i}
                                                onChange={(e)=>checkFile(e.target.checked,a.name)}
                                                checked={fileCheck.includes(a.name)}
                                                className={'mr-10'}
                                                />
                                            <label htmlFor={i}>{a.name} ( {getByteSize(a.size)} )</label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="fileBtn fs f-column">
                                <label htmlFor="file" className="btn-grey-border">파일 찾기</label>
                                <button 
                                    className="btn-grey btn-icon" 
                                    onClick={()=>removeFile(fileCheck)}
                                    disabled={files.length === 0}
                                    >
                                        <Icon icon={"remove"} />
                                    삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className='reserveWrap fj'>
                    <button className='btn-grey mr-4' onClick={()=>{
                        setWriteModal(false);
                        setViewModal && setViewModal(false);
                    }}>취소</button>
                    <button className='btn-orange mr-4' disabled={rCheck} onClick={submitForm}>발송하기</button>
                    <button className='btn-brown mr-4' disabled={!rCheck} onClick={submitForm}>예약 발송</button>
                        <CheckBox 
                        color={'orange'} 
                        onChange={(e)=>rCheckFunc(e.target.checked)}
                        className={'mr-20'} 
                        />
                          <CustomDatePicker
                        value={date}
                        onChange={(day) => {
                            setDate(day);
                        }}
                        minDate={new Date()}
                        label={true}
                        className={'mr-4'}
                        />
                        <SelectBase 
                        onChange={(ele)=>setHour(ele)}
                        options={시간}
                        value={hour}
                        defaultValue='0시'
                        width={'90px'}
                        disabled={selectDisabled}
                        className={'mr-4'}
                        />
                        <SelectBase 
                        onChange={(ele)=>setMinute(ele)}
                        options={분}
                        value={minute}
                        defaultValue='00분'
                        width={'90px'}
                        disabled={selectDisabled}
                        />
                        
                    </div>
                  
                </div>

            </div>
        </div>
      );
}

export default WriteMessageModal;