import React, { useEffect, useState } from "react";

const arr = [
    "중등 월화수 A",
    "중등 월화수 B",
    "중등 월화수 C",
    // "중등 화목토 A",
    // "중등 화목토 B",
    // "중등 화목토 C"
]


function SelectTest({width, onChange}) {

    let [checkState, setCheckState] = useState(arr);
    let [selectState, setSelectState] = useState(false);
    let [choiceItem, setChiceItem] = useState('반 선택 (전체)');

    const allCheck = (checked)=>{
        if(checked){
            let copyArr = [];
            arr.forEach(item => {copyArr.push(item)});

            setCheckState(copyArr);
            setChiceItem('반 선택 (전체)')
        }else{
            setCheckState([]);
            setChiceItem('반을 선택하세요')
        }
    }

    const oneCheck = (checked, item)=>{
        if(checked){
            setCheckState([...checkState, item]);
        }else{
            setCheckState(checkState.filter(ele => ele !== item))
        }
    }

    useEffect(()=>{

        if(arr.length === checkState.length === false){
                
            if(checkState.length - 1 === 0){
                setChiceItem(checkState[0])
            }else{
                setChiceItem(checkState[0] + `외 ${checkState.length - 1} 개`)
            }
        }

        if(arr.length === checkState.length){
            setChiceItem('반 선택 (전체)')
        }

        if(checkState.length === 0){
            setChiceItem('반을 선택하세요')
        }

    },[checkState])


    return (
        <div
            className={"select-wrap" + `${selectState ? " active" : ""}`}
            style={{width : width}}
        >
            <div className="select-show"
                onClick={()=>{setSelectState(!selectState)}}
            >
                {choiceItem}
            </div>
            <button className="select-btn"
                onClick={()=>{setSelectState(!selectState)}}
            ></button>
            <div className="select-option">
                <button className="lookup" onClick={()=>{
                    onChange(checkState);
                    setSelectState(false);
                    }}>조회</button>

                <div className="all-box">
                    <input 
                        type="checkbox" 
                        id="all"
                        onChange={(e)=>{allCheck(e.target.checked)}}
                        checked={checkState.length === arr.length ? true : false}
                        className={checkState.length > 0 && checkState.length < arr.length ? "isCheck" : ''}
                     />
                    <label htmlFor="all">(전체 선택)</label>
                </div>

                <ul className="item-list">
                    {
                        arr.map((item,i) => {
                            return (
                                <li key={i}>
                                    <input 
                                    type="checkbox" 
                                    id={item}
                                    onChange={e=>{oneCheck(e.target.checked, item)}}
                                    checked={checkState.includes(item) ? true : false}
                                    />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </div>
        </div>
    );
}

export default SelectTest;
