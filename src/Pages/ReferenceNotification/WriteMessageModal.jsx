import React, { useEffect, useState, useRef } from 'react';
import ajax from "../../ajax";
import SelectBase from "../../components/ui/select/SelectBase";

function WriteMessageModal({setWriteModal}) {
    let [stuList, setStuList] = useState();
    let [classOption, setClassOption] = useState('반 선택');
    let [classList,setClassList] = useState(null);

    let [checkState,setCheckState] = useState([]);
    
    
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

    
    // const changeCheckState = (tr) => {
    //     if(checkState.includes(tr)){
    //         setCheckState(checkState.filter(item => item !== tr));
    //     }else{
    //         setCheckState([...checkState, tr]);
    //     }
    // }

    // const allCheckState = (checked) => {
    //     if(checked){
    //         setCheckState([...data]);
    //     }else{
    //         setCheckState([]);
    //     }
    // }
    return (
        <div className="modal">
            <div className="dim"></div>
            <div className='WriteMessageModal cmmnModal'>
                <div className="WriteMessageModal-head cmmnModal-head">
                    <div className="tit">
                            <strong>[학습 알림]메시지 보내기</strong>
                    </div>
                    <button className='closeBtn' onClick={()=>setWriteModal(false)}>x</button>
                </div>
                <div className="WriteMessageModal-body cmmnModal-body">
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
                            
                            />
                            <label htmlFor='checkAll' className='checkAll pl-20'>전체선택</label>
                        </div> 
                        {
                            stuList && stuList.map(list=>{
                                return(
                                    <div className="check-wrap">
                                        <input type="checkbox" id={list.usr_seq} />
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
                                    <th>받는 사람</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td>
                                        <div className='fileArea'></div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="WriteMessageModal-foot cmmnModal-foot">
                    <button className='btn'>예약 발송</button>
                    <button className='btn'>발송하기</button>
                    <button className='btn' onClick={()=>setWriteModal(false)}>취소</button>
                </div>

            </div>
        </div>
      );
}

export default WriteMessageModal;