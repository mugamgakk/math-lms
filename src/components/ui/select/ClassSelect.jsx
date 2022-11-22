import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import Icon from "../../Icon";

function ClassSelect({
    width = "170px",
    onChange,
    options = [],
    value = [],
    defaultValue = "선택하세요",
    disabled,
    className
}) {
    let [selectOpen, setSelectOpen] = useState(false);
    let [choiceArr, setChoiceArr] = useState(value);
    let [text, setText] = useState("");

    const checkedItem = useCallback(
        (checked, ele) => {
            if (checked) {
                // 삭제
                let result = choiceArr.filter((a) => a !== ele);
                onChange && onChange(result);
                setChoiceArr(result);
            } else {
                // 추가
                let result = [...choiceArr, ele];
                onChange && onChange(result);
                setChoiceArr(result);
            }
        },
        [choiceArr]
    );

    const allCheck = useCallback(() => {
        if (options.length === choiceArr.length) {
            setChoiceArr([]);
        } else {
            setChoiceArr(options);
        }
    }, [choiceArr]);

    useEffect(() => {
        if (value.length !== 0) {
            setChoiceArr(value);
        }
    }, [value]);

    useEffect(() => {
        if (!choiceArr | !options) {
            return;
        }

        if (choiceArr.length === 1) {
            setText(choiceArr[0].class_name);
        } else {
            if (choiceArr.length === 0) {
                setText(defaultValue);
            } else {
                setText(
                    choiceArr[choiceArr.length - 1].class_name + ` 외 ${choiceArr.length - 1} 반`
                );
            }
        }

        if (options.length === choiceArr.length) {
            setText("반 선택 (전체)");
        }

        if (choiceArr.length === 0) {
            setText(defaultValue);
        }
    }, [choiceArr]);

    return (
        <div
            tabIndex={1}
            style={{ width: width }}
            className={`select ${selectOpen ? "active" : ""} ${disabled ? "disabled" : ""} ${className}` + ' mr-10'}
            onBlur={() => {
                setSelectOpen(false);
            }}
        >
            <div
                className="select-view"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                }}
            >
                <h4>{text}</h4>
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
                    {/* <li className="fa">
                        <div className="lookup">조회</div>
                    </li> */}
                    <li className="fa" onClick={allCheck}>
                        <div
                            className={`check-state ${
                                options.length === choiceArr.length ? "all" : ""
                            } ${
                                choiceArr.length > 0 && choiceArr.length < options.length
                                    ? "is-item"
                                    : ""
                            }`}
                        ></div>
                        (전체 선택)
                    </li>
                    {options &&
                        options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={(e) => {
                                        let isClass = e.target.classList.contains("active");
                                        checkedItem(isClass, a);
                                    }}
                                    className={`fa ${choiceArr.includes(a) ? "active" : ""}`}
                                >
                                    <div className="checkbox"></div>
                                    {a.class_name}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default ClassSelect;
