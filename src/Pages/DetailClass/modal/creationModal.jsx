import React, { useState } from "react";
import { useEffect } from "react";
import CreationCheck from '../CreationCheck';
import useStore from '../../../store/useCreationModal';


let 출처 = ['개념서', '뜨레스', '맞춤 클리닉'];
let 문제형식 = ['객관식','주관식','서술형'];
let 난이도 = ['최상','상','중상','중','중하','하','최하'];

function CreationModal({setCreationMo,name}){

    let [checkState,setCheckState] = useState([]);
    let [allCheck, setAllCheck] = useState(0);
    let {data,reCreateData,reCreateFunc} = useStore(state=>state);
    let [dataList,setDataList] = useState(null);

    let [obj,setObj] = useState({
        chul : [],
        mun : [],
        nanido : [],
    })


    useEffect(()=>{
            setDataList(data);
    },[]);
    
    useEffect(()=>{
        data.length === checkState.length ? setAllCheck(2) :
        ( checkState.length > 0 ? setAllCheck(1) : setAllCheck(0)) 
    },[checkState]);
   
    
    
   

    const multiCheckFunc = (checkList,target) => {
        let newList;
        if(reCreateData){
            newList = reCreateData.filter(item => checkList.includes(item[target]));
            reCreateFunc(newList);
            setDataList(reCreateData);
        }else{
         
                newList = data.filter(item => checkList.includes(item[target]));
                setDataList(newList);
        }

    }

    const changeCheckState = (tr) => {
        if(checkState.includes(tr)){
            setCheckState(checkState.filter(item => item !== tr));
        }else{
            setCheckState([...checkState, tr]);
        }
    }

    const allCheckState = (checked) => {
        if(checked){
            setCheckState([...data]);
        }else{
            setCheckState([]);
        }
    }



    return(

        <div className="modal">
            <div className="dim"></div>
            <div className='creationModal cmmnModal'>
                <div className="creationModal-head cmmnModal-head">
                    <div className="tit">
                        <strong>[오답 정복하기 생성]{name}</strong>
                    </div>
                    <button className="close" onClick={()=>setCreationMo(false)}>X</button>
                </div>
                <div className="creationModal-body cmmnModal-body">
                    <div className='top mb-10'>
                        <div className="top-tit">제목</div>
                        <div className="top-con">중2-1뜨레스_오답 정복_20210705</div>
                    </div>
                    <table>
                        <colgroup>
                            <col width='5%'/>
                            <col width='10%'/>
                            <col width='20%'/>
                            <col width='20%'/>
                            <col width='8%'/>
                            <col width='6%'/>
                            <col width='12%'/>
                            <col width='12%'/>
                            <col width='7%'/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>
                                    <div className="check-wrap">
                                        <input type="checkbox" name="" className={allCheck === 1 ? 'checkAll isCheck' : 'checkAll'} id='checkAll' 
                                        onChange={(e)=>allCheckState(e.target.checked)}
                                         checked={ allCheck === 2 }/>
                                        <label htmlFor='checkAll' className='checkAll pl-20' >선택</label>
                                    </div>
                                    <span>(25/25)</span>
                                </td>
                                <td>대단원</td>
                                <td>소단원</td>
                                <td>개념(키워드)</td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={출처}
                                        multiCheckFunc={multiCheckFunc}
                                        keyName='class'
                                        />
                                        <span>출처</span>
                                    </div>
                                </td>
                                <td>번호</td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={문제형식} 
                                        multiCheckFunc={multiCheckFunc}
                                        keyName='answer'
                                        />
                                        <span>문제 형식</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={난이도}
                                        multiCheckFunc={multiCheckFunc}
                                        keyName='level'
                                        />
                                        <span>난이도</span>
                                    </div>
                                </td>
                                <td>문제 보기</td>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {
                                dataList && 
                                dataList.map(tr=>{
                                    return(
                                        <tr key={tr.id}>
                                            <td>
                                                <div className="check-wrap">
                                                    <input type="checkbox" id={tr.id} value=''
                                                     onChange={() => changeCheckState(tr)} 
                                                     checked={ checkState.includes(tr)}/>
                                                    <label htmlFor={tr.id}></label>
                                                </div>
                                            </td>
                                            <td>{tr.deadanwon}</td>
                                            <td>{tr.sodanwon}</td>
                                            <td>{tr.keyword}</td>
                                            <td>{tr.class}</td>
                                            <td>{tr.num}</td>
                                            <td>{tr.answer}</td>
                                            <td>{tr.level}</td>
                                            <td>
                                                <button className='btn'>보기</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="creationModal-foot cmmnModal-foot">
                    <button className="btn">미리보기</button>
                    <button className="btn">생성하기</button>
                    <button className="btn" onClick={()=>setCreationMo(false)}>닫기</button>
                </div>
            </div>
        </div>
    )
}
export default CreationModal;