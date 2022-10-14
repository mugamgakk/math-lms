import React, { useState } from "react";
import { useEffect } from "react";
import CreationCheck from '../CreationCheck';
import useStore from '../../../store/useCreationModal';
import { useRef } from "react";

const arr = [20,10,2,4];

const arr2 = ["박","최", "김"];


arr2.sort((a,b)=>{

    if(a < b){
        return -1
    }else{
        return 1
    }
})


let 출처 = ['개념서', '뜨레스', '맞춤 클리닉'];
let 문제형식 = ['객관식','주관식','서술형'];
let 난이도 = ['최상','상','중상','중','중하','하','최하'];

function CreationModal({setCreationMo,name}){

    let [checkState,setCheckState] = useState([]);
    let {data,reCreateData,reCreateFunc} = useStore(state=>state);
    let [dataList,setDataList] = useState(null);

    let ref = useRef(false)


    // 이것은 체크된 값
    // 키값 키네임이랑 똑같게
    let [obj,setObj] = useState({
        class : 출처,
        answer : 문제형식,
        level : 난이도,
    })

    // console.log(obj)

    useEffect(()=>{
            setDataList(data);
    },[]);

    // console.log(data)
    
    useEffect(()=>{
        let arr = [];
        let arr2 = [];
        let arr3 = [];

        if(ref.current === true){

            obj.class.forEach(a=>{
                data.forEach(dd =>{
                    if(a === dd.class){
                        arr.push(dd)
                    }
                })
               
            })
            obj.answer.forEach(a=>{
                arr.forEach(dd =>{
                    if(a === dd.answer){
                        arr2.push(dd)
                    }
                })
            })
            obj.level.forEach(a=>{
                arr2.forEach(dd =>{
                    if(a === dd.level){
                        arr3.push(dd)
                    }
                })
            })

            console.log(arr3)

            setDataList(arr3)

        }else{
            ref.current = true
        }

        
        // for(let key in obj){
        //     obj[key].forEach(a=>{
        //         console.log(a)
        //     })
        // }
    },[obj])


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
                        <input type='text' className="top-con" value='중2-1뜨레스_오답 정복_20210705' />
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
                                        <input type="checkbox" name="" className={checkState.length > 0 && checkState.length < data.length ? 'checkAll isCheck' : 'checkAll'} id='checkAll' 
                                        onChange={(e)=>allCheckState(e.target.checked)}
                                         checked={ data.length === checkState.length }/>
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
                                        obj={obj}
                                        setObj={setObj}
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
                                        obj={obj}
                                        setObj={setObj}
                                        keyName='answer'
                                        />
                                        <span>문제 형식</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='toggleWrap fj'>
                                       <CreationCheck 
                                        data={난이도}
                                        obj={obj}
                                        setObj={setObj}
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