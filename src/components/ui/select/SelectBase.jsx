import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import Icon from "../../Icon";

function SelectBase({ width = "130px", onChange, options, value, defaultValue = "선택하세요", disabled }) {
    let [selectOpen, setSelectOpen] = useState(false);
    
    const openSelect = useCallback(() => {
        if (disabled) return false;
        setSelectOpen(!selectOpen);
    },[disabled, selectOpen]);

    const setTitle = useCallback(()=>{
        for(let ele of options){
            if(ele.value === value || ele.value === value.value){
                return ele.label
            }
        }
    },[value])

    return (
        <div tabIndex={1}
            style={{ width: width }}
            className={`select ${selectOpen ? "active" : ""} ${disabled ? "disabled" : ""}`} 
            onBlur={() => { setSelectOpen(false) }}
        >
            <div className="select-view" onClick={openSelect}>
                <h4>{value ? setTitle() : defaultValue}</h4>
            </div>
            <div className="select-btn" onClick={openSelect}>
                <Icon icon={"select_typeA"} />
            </div>
            <div className="select-list-box">
                <ul className="select-list">
                    {
                        options && options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => {
                                        onChange && onChange(a);
                                        setSelectOpen(false);
                                    }}
                                >{a.label}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default SelectBase;
