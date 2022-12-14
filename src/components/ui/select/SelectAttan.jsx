import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../../Icon";

const options = [
    {
        color: "#addb4f",
        label: "출석",
        value: "P",
    },
    {
        color: "#ffb547",
        label: "지각",
        value: "L",
    },
    {
        color: "#3fc0e0",
        label: "조퇴",
        value: "E",
    },
    {
        color: "#ff6666",
        label: "결석",
        value: "A",
    },
];

function SelectAttan({ value, onChange, disabled }) {
    let [active, setActive] = useState(false);
    let [choice, setChoice] = useState();

    const update = (ele) => {
        onChange && onChange(ele);
        setChoice(ele);
        setActive(false)
    };

    useEffect(() => {
        if (value) {
            let result = options.find((a) => a.value === value);
            setChoice(result);
        }
    }, [value]);

    return (
        <div className={`SelectAttan ${active ? "active" : ""}${disabled ? "disabled" : ""}`} tabIndex="1" onBlur={()=>{setActive(false)}}>
            <div className="SelectAttan-view" style={value ?  { backgroundColor: choice?.color } : {}}>
                {value ? choice?.label : "선택"}
            </div>
            <div
                className="SelectAttan-button"
                onClick={() => {
                    setActive(!active);
                }}
            >
                <div
                >
                    <Icon icon={"select_typeC"} style={{ transform: "scale(0.4)" }} />
                </div>
            </div>
            <div className="SelectAttan-option">
                <ul>
                    {options.map((a, i) => {
                        return (
                            <li
                                key={i}
                                style={{ backgroundColor: a.color }}
                                onClick={() => {
                                    update(a);
                                }}
                            >
                                {a.label}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SelectAttan;
