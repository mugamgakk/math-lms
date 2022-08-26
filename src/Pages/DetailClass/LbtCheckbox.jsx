import React, { useState, useCallback, useEffect, memo, useRef } from "react";
import style from "../../style/style-module/lbtModal.module.scss";
import { choiceLbt } from "../../feature/studentsListSlice";
import { useDispatch } from "react-redux";




const LbtCheckbox = ({allCheckBtn, list, create})=> {

    const [checkedList, setCheckedList] = useState([...list.optionItem]);

    const didMount = useRef(false);
    let dispatch = useDispatch();

    const allCheck = (checked) => {
        if (checked) {
            setCheckedList([...list.optionItem])
        } else {
            setCheckedList([]);
        }
    };

    const oneCheck = (checked, list) => {
        if (checked) {
            setCheckedList([...checkedList, list]);
        } else {
            setCheckedList(checkedList.filter((ele) => ele != list));
        }
    };

    useEffect(()=>{

    // useEffect 마운트시 실행 막기
        if(didMount.current){
            if(allCheckBtn){
                // console.log(list.optionItem)
                setCheckedList([...list.optionItem]);
            }else{
                setCheckedList([]);
            }
        }else{
            didMount.current = true;
        }

    },[allCheckBtn])

    // 적용 눌렀을시
    useEffect(()=>{
        dispatch(choiceLbt({ name : list.option , arr : checkedList}))

    },[create])



    return (
        <div className="captionGroup">
         
            <input
                type="checkbox"
                id={list.option}
                className={style.formConrol}
                checked={checkedList.length === list.optionItem.length}
                onChange={(e)=>{allCheck(e.target.checked)}}
            />
            <label htmlFor={list.option}>{list.option}</label>
        
            <ul className={style.contentList}>
                {
                    list.optionItem.map((a,i)=>{
                        return (
                            <li key={i}>
                                <input
                                    type="checkbox"
                                    id={a}
                                    className={style.formConrol}
                                    onChange={(e)=>{oneCheck(e.target.checked,a)}}
                                    checked={checkedList.includes(a)}
                                />

                                <label htmlFor={a}>{a}</label>
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    );
}

export default LbtCheckbox;
