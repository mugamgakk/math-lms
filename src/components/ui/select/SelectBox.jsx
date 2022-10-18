import React, { useEffect, useState } from "react";
import { useCallback } from "react";


function SelectTest({width, onChange, reset, options}) {

    let [checkState, setCheckState] = useState([]);
    let [selectState, setSelectState] = useState(false);
    let [choiceItem, setChiceItem] = useState('반 선택 (전체)');

    const allCheck = useCallback((checked)=>{
        if(checked){
            let copyArr = [];
            options.forEach(item => {copyArr.push(item)});

            setCheckState(copyArr);
            setChiceItem('반 선택 (전체)')
        }else{
            setCheckState([]);
            setChiceItem('반을 선택하세요')
        }
    },[checkState])


    const oneCheck = useCallback((checked, item)=>{

        checked 
        ? setCheckState([...checkState, item])
        : setCheckState(checkState.filter(a=> a !== item));

    },[checkState])

    useEffect(()=>{
        if(reset > 0){
            setCheckState(options)
        }
    },[reset])

    useEffect(()=>{
        setCheckState(options)
    },[options])

    useEffect(()=>{
        if(options){


        if(checkState.length !== 0){
            if(checkState.length === 1){
                setChiceItem(checkState[0].class_name)
            }else{
                setChiceItem(checkState[0].class_name + `외 ${checkState.length - 1} 개`)
            }
        }
        

        if(options.length === checkState.length){
            setChiceItem('반 선택 (전체)')
        }

        if(checkState.length === 0){
            setChiceItem('반을 선택하세요')
        }

        }

    },[checkState])


    return (
        <div
            className={"selectbox" + `${selectState ? " active" : ""}`}
            style={{width : width}}
        >
            <div className="selectbox-show"
                onClick={()=>{setSelectState(!selectState)}}
            >
                {choiceItem}
            </div>
            <button className="selectbox-btn"
                onClick={()=>{setSelectState(!selectState)}}
            ></button>

            <div className="selectbox-option">
                <div>
                <button className="selectbox-option--lookup" onClick={()=>{
                    onChange(checkState);
                    setSelectState(false);
                    }}>조회</button>

                {
                    options && (
                        <div className="selectbox-option__allcheck">
                            <input 
                                type="checkbox" 
                                id="all"
                                onChange={(e)=>{allCheck(e.target.checked)}}
                                checked={checkState.length === options.length ? true : false}
                                className={checkState.length > 0 && checkState.length < options.length ? " ischeck" : ''}
                            />
                            <label htmlFor="all">(전체 선택)</label>
                        </div>
                    )
                }

                

                <ul className="selectbox-option__list">
                    {
                       options && options.map(a=>{
                        return (
                            <li key={a.class_cd}>
                                <input type="checkbox" checked={checkState.includes(a)} id={a.class_cd} onChange={e=>{oneCheck(e.target.checked, a)}} />
                                <label htmlFor={a.class_cd}>{a.class_name}</label>
                            </li>
                        )
                       })
                    }
                </ul>
            </div>
            </div>
        </div>
    );
}

export default SelectTest;
