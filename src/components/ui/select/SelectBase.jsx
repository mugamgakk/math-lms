import React from "react";
import { useState } from "react";

function SelectBase({ width, onChange, options, value, defaultValue = "선택하세요" }) {
    let [selectOpen, setSelectOpen] = useState(false);

    return (
        <div className={"select-wrap" + `${selectOpen ? " active" : ""}`} style={{ width: width }}>
            <button
                className="select-show"
                onClick={() => {
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
