import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SelectBase({ width, onChange, options, value, defaultValue = "선택하세요" , disabled}) {
    let [selectOpen, setSelectOpen] = useState(false);
    useEffect(()=>{
        console.log(disabled);
    },[disabled]);
    return (
        <div className={"select-wrap" + `${selectOpen ? " active" : ""}`} style={{ width: width }}>
            <button
                className={disabled ? "select-show disabled" : "select-show"}
                onClick={() => {
                    if(disabled) return false;
                    setSelectOpen(!selectOpen);
                }}
                onBlur={()=>{
                    setSelectOpen(false)
                }}
            >
                {
                value 
                ? value 
                : defaultValue
                }
            </button>
            <button
                className="select-btn"
                onBlur={()=>{
                    setSelectOpen(false)
                }}
                onClick={() => {
                    if(disabled) return false;
                    setSelectOpen(!selectOpen);
                }}
            ></button>
            <div className="textbook-select-option">
                {options &&
                    options.map((a, i) => {
                        return (
                            <div
                                className="option-item"
                                key={i}
                                onClick={(e) => {
                                    onChange && onChange(a);
                                }}
                            >
                                {a}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default SelectBase;
