import React, { useState } from "react";
import { useEffect } from "react";
import Icon from "../../Icon";

function MultiSelect({
    width = "130px",
    className,
    onChange,
    options,
    value = [],
    defaultValue = "선택하세요",
    limit,
    disabled,
}) {
    let [selectOpen, setSelectOpen] = useState(false);
    let [choiceArr, setChoiceArr] = useState(value);

    const checkedItem = (checked, ele) => {
        if (limit && limit === choiceArr.length && !checked) {
            alert("더이상 선택이 불가합니다.");
            return;
        }

        if (checked) {
            let result = choiceArr.filter((a) => a.value !== ele.value);
            onChange && onChange(result);
            setChoiceArr(result);
        } else {
            let result = [...choiceArr, ele];
            onChange && onChange(result);
            setChoiceArr(result);
        }
    };

    useEffect(() => {
        setChoiceArr(value);
    }, [value]);

    return (
        <div
            tabIndex={1}
            style={{ width: width }}
            className={`select ${selectOpen ? "active" : ""} ${className} ${
                disabled ? "disabled" : ""
            }`}
            onBlur={()=>{
                setSelectOpen(false);
            }}
        >
            <div
                className="select-view"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                }}
            >
                <h4>
                    {
                        value.length === 0
                        ? defaultValue
                        : (
                            value.length === options.length
                            ? defaultValue
                            :choiceArr[choiceArr.length -1].label
                        )
                    }
                </h4>
            </div>
            <div
                className="select-btn"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                }}
            >
                <Icon icon={"select_typeA"} />
            </div>
            <div className="select-list-box">
                <ul className="select-list">
                    {options &&
                        options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={(e) => {
                                        let isClass = e.currentTarget.classList.contains("active");
                                        checkedItem(isClass, a);
                                    }}
                                    className={`fj ${
                                        choiceArr.some((ele) => a.value === ele.value)
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="label">{a.label}</div>
                                    <div
                                        className={`checkbox ${
                                            choiceArr.some((ele) => a.value === ele.value)
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <Icon icon={"checkboxarrow"} />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default MultiSelect;
