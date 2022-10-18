import React, { useEffect, useState } from "react";


function SelectTest({width, onChange, reset, list = []}) {

    let [checkState, setCheckState] = useState([]);
    let [selectState, setSelectState] = useState(false);
    let [choiceItem, setChiceItem] = useState('반 선택 (전체)');

    const allCheck = (checked)=>{
        if(checked){
            let copyArr = [];
            list.forEach(item => {copyArr.push(item)});

            setCheckState(copyArr);
            setChiceItem('반 선택 (전체)')
        }else{
            setCheckState([]);
            setChiceItem('반을 선택하세요')
        }
    }


    const oneCheck = (checked, item)=>{

        checked 
        ? setCheckState([...checkState, item])
        : setCheckState(checkState.filter(a=> a !== item));

    }

    useEffect(()=>{
        if(reset > 0){
            setCheckState(list)
        }
    },[reset])

    useEffect(()=>{
        setCheckState(list)
    },[list])

    useEffect(()=>{

        if(checkState.length !== 0){
            if(checkState.length === 1){
                setChiceItem(checkState[0].class_name)
            }else{
                setChiceItem(checkState[0].class_name + `외 ${checkState.length - 1} 개`)
            }
        }
        

        if(list.length === checkState.length){
            setChiceItem('반 선택 (전체)')
        }

        if(checkState.length === 0){
            setChiceItem('반을 선택하세요')
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

                <div className="selectbox-option__allcheck">
                    <input 
                        type="checkbox" 
                        id="all"
                        onChange={(e)=>{allCheck(e.target.checked)}}
                        checked={checkState.length === list.length ? true : false}
                        className={checkState.length > 0 && checkState.length < list.length ? " ischeck" : ''}
                     />
                    <label htmlFor="all">(전체 선택)</label>
                </div>

                <ul className="selectbox-option__list">
                    {
                       list.length !== 0 && list.map(a=>{
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
