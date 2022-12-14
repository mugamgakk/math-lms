import React from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Icon from "../../Icon";

function SelectBase({
    width = "130px",
    onChange,
    options = [],
    value,
    defaultValue = "선택하세요",
    disabled,
    className = "",
}) {
    let [selectOpen, setSelectOpen] = useState(false);

    const openSelect = useCallback(() => {
        if (disabled) return false;
        setSelectOpen(!selectOpen);
    }, [disabled, selectOpen]);

    const setTitle = () => {
        if (value === undefined || value === null || value === "") {
            return defaultValue;
        } else {
            for (let ele of options) {
                if (ele.value === value || ele.value === value.value) {
                    return ele.label;
                }
            }
        }
    }

    return (
        <div
            tabIndex={1}
            style={{ width: width }}
            className={`select ${selectOpen ? "active" : ""} ${
                disabled ? "disabled" : ""
            } ${className}`}
            onBlur={() => {
                setSelectOpen(false);
            }}
        >
            <div className="select-view" onClick={openSelect}>
                <h4>{setTitle()}</h4>
            </div>
            <div className="select-btn" onClick={openSelect}>
                <Icon icon={"select_typeA"} />
            </div>
            <div className="select-list-box">
                <ul className="select-list">
                    {options &&
                        options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => {
                                        onChange && onChange(a);
                                        setSelectOpen(false);
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

export default SelectBase;
