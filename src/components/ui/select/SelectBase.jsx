import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SelectBase({ width = "130px", onChange, options, value, defaultValue = "선택하세요", disabled }) {
    let [selectOpen, setSelectOpen] = useState(false);

    const openSelect = ()=>{
        if (disabled) return false;
        setSelectOpen(!selectOpen);
    }

    return (
        <div tabIndex={1} style={{width : width}} className={`select ${selectOpen ? "active" : ""} ${disabled ? "disabled" : ""}`} onBlur={()=>{setSelectOpen(false)}}>
            <div className="select-view" onClick={openSelect}>
                <h4>{value === 0 || value ? value :  defaultValue}</h4>
            </div>
            <div className="select-btn" onClick={openSelect}></div>
            <div className="select-list-box">
            <ul className="select-list">
                {
                    options && options.map((a,i)=>{
                        return (
                            <li 
                            key={i}
                            onClick={() => {
                                onChange && onChange(a);
                                setSelectOpen(false);
                            }}
                            >{a}</li>
                        )
                    })
                }
            </ul>
            </div>
        </div>
    );
}

export default SelectBase;
