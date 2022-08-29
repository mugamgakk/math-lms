import React from "react";
import { useState } from "react";

function SelectBase({ width, onChange, options, value, defaultValue }) {
    let [selectOpen, setSelectOpen] = useState(false);

    return (
        <div className={"select-wrap" + `${selectOpen ? " active" : ""}`} style={{ width: width }}>
            <div
                className="select-show"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                    // setSelectTest({...selectTest, state : !selectTest.state});
                }}
            >
                {
                value 
                ? value 
                : !defaultValue
                ? "선택하세요"
                : defaultValue
                }
            </div>
            <button
                className="select-btn"
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
                                    setSelectOpen(false);
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
