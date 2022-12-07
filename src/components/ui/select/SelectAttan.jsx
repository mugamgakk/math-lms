import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Icon from '../../Icon';

const options = [
    {
        color : "#addb4f",
        label : "출석",
        value : "P"
    },
    {
        color : "#ffb547",
        label : "지각",
        value : "L"
    },
    {
        color : "#3fc0e0",
        label : "조퇴",
        value : "E"
    },
    {
        color : "#ff6666",
        label : "결석",
        value : "A"
    },
]

function SelectAttan({value, onChange}) {

    let [active, setActive] = useState(false);
    let [choice, setChoice] = useState()

    const update = (ele)=>{
        onChange && onChange(ele);
        setChoice(ele);
    }

    useEffect(()=>{
        if(value){
            let result = options.find(a=> a.value === value );
            setChoice(result);
        }
    },[value])

    return ( 
        <div className={`SelectAttan ${active ? "active" : ""}`}>
            <div className="SelectAttan-view" style={{backgroundColor : choice?.color}}>
                {choice ? choice.label : "선택"}
            </div>
            <div className="SelectAttan-button" onClick={()=>{setActive(!active)}} >
                <button onBlur={()=>{setActive(false)}}>
                <Icon icon={"select_typeC"} style={{transform : "scale(0.4)"}} />
                </button>
            </div>
            <div className="SelectAttan-option">
                <ul>
                    {
                        options.map((a,i)=>{
                            return <li key={i} style={{backgroundColor : a.color}} onClick={()=>{update(a)}}>{a.label}</li>
                        })
                    }
                </ul>
            </div>
        </div>
     );
}

export default SelectAttan;