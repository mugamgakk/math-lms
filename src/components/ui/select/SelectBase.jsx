import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SelectBase({ width, onChange, options, value, defaultValue = "선택하세요" , disabled}) {

    let [selectOpen, setSelectOpen] = useState(false);
    useEffect(()=>{
        console.log(disabled);
    },[disabled]);

    console.log(value)
    return (
        <div className={"selectbox" + `${selectOpen ? " active" : ""}`} style={{ width: width }}>
            <button
                className={disabled ? "selectbox-show disabled" : "selectbox-show"}
                onClick={() => {
                    if(disabled) return false;
                    setSelectOpen(!selectOpen);
                }}
            >
                {
                value 
                ? value 
                : defaultValue
                }
            </button>
            <button
                className="selectbox-btn"
                onBlur={()=>{
                    setSelectOpen(false)
                }}
                onClick={() => {
                    if(disabled) return false;
                    setSelectOpen(!selectOpen);
                }}
            ></button>
            <div className="selectbox-option">
                <div>
                {options &&
                    options.map((a, i) => {
                        return (
                            <button key={i} onClick={()=>{
                                onChange && onChange(a);
                                setSelectOpen(false)
                                }} className="selectbox-option__item">
                                {a}
                            </button>
                        );
                    })}
                    </div>
            </div>
        </div>
    );
}

export default SelectBase;
