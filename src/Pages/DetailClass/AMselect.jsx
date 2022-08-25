import React from "react";
import { useState } from "react";

function AMselect({ width, onChange, options, value }) {
    let [selectOpen, setSelectOpen] = useState(false);
    let [selectText, setSelectText] = useState(value);

    return (
        <div className={"select-wrap" + `${selectOpen ? " active" : ""}`} style={{ width: width }}>
            <div
                className="select-show"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                    // setSelectTest({...selectTest, state : !selectTest.state});
                }}
            >
                {value ? selectText : "선택하세요"}
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
                                    setSelectText(a);
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

export default AMselect;
