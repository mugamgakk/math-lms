import React, { useState } from "react";
import { useEffect } from "react";

function SelectBook({
    width = "130px",
    onCheck,
    onChange,
    options,
    checkValue = [],
    defaultValue = "선택하세요",
    limit,
    disabled,
    value
}) {
    let [selectOpen, setSelectOpen] = useState(false);
    let [choiceArr, setChoiceArr] = useState(checkValue);
    let [chiceItem, setChiceItem] = useState(value);

    const checkedItem = (checked, ele) => {
        if (limit && limit === choiceArr.length && !checked) {
            alert("더이상 선택이 불가합니다.");
            return;
        }

        if (checked) {
            let result = choiceArr.filter((a) => a !== ele);
            onCheck && onCheck(result);
            setChoiceArr(result);
        } else {
            let result = [...choiceArr, ele];
            onCheck && onCheck(result);
            setChoiceArr(result);
        }
    };

    useEffect(() => {
        setChoiceArr(checkValue);
    }, [checkValue]);

    useEffect(()=>{
        setChiceItem(value);
    },[value])

    return (
        <div
            tabIndex={1}
            style={{ width: width }}
            className={`select ${selectOpen ? "active" : ""} ${disabled ? "disabled" : ""}`}
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
                    {chiceItem ? chiceItem.label : defaultValue}
                    <div className={`checkbox ${
                                        choiceArr.some((c) => c.value === chiceItem.value) ? "active" : ""
                                    }`} 
                          ></div>
                </h4>
            </div>
            <div
                className="select-btn"
                onClick={() => {
                    setSelectOpen(!selectOpen);
                }}
            ></div>
            <div className="select-list-box">
                <ul className="select-list">
                    {options &&
                        options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    className={`fa`}
                                >
                                    <strong onClick={()=>{ setChiceItem(a); onChange && onChange(a) }}>
                                        {a.label}
                                    </strong>
                                    <div className={`checkbox ${
                                        choiceArr.some((c) => c.value === a.value) ? "active" : ""
                                    }`} 
                                    onClick={(e)=>{
                                        let isClass = e.target.classList.contains("active");
                                            checkedItem(isClass, a);

                                    }}></div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default SelectBook;
