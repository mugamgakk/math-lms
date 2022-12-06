import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import useLbtStore from "../../store/useLbtStore";

function LbtCheckbox({ ele, checkedItem }) {
    const setCheckedList = useLbtStore((state) => state.setCheckedList);

    // 체크된것 초기값 모든배열 넣어줌
    let [checkList, setCheckList] = useState(ele.optionItem);

    const allCheck = (checked) => {
        if (checked) {
            setCheckList([...ele.optionItem]);
            setCheckedList({ key: ele.option, value: [...ele.optionItem] });
        } else {
            setCheckList([]);
            setCheckedList({ key: ele.option, value: [] });
        }
    };

    const oneCheck = (checked, element) => {
        if (checked) {
            let result = [...checkList, element];
            setCheckList(result);
            setCheckedList({ key: ele.option, value: result });
        } else {
            let result = checkList.filter((a) => a !== element);
            setCheckList(result);
            setCheckedList({ key: ele.option, value: result });
        }
    };

    return (
        <div className="part" key={ele.option}>
            <div className="part-title">
                <Checkbox
                    color="orange"
                    id={ele.option}
                    checked={checkedItem.optionItem.length === ele.optionItem.length}
                    onChange={(e) => {
                        allCheck(e.target.checked);
                    }}
                />
                <label htmlFor={ele.option}>{ele.option}</label>
            </div>
            <ul className="part-list">
                {ele.optionItem.map((a) => {
                    return (
                        <li key={a.label}>
                            <Checkbox
                                color="orange"
                                id={a.label}
                                onChange={(e) => {
                                    oneCheck(e.target.checked, a);
                                }}
                                checked={checkedItem.optionItem.some((dd) => {
                                    return dd.label === a.label;
                                })}
                            />
                            <label htmlFor={a.label}>{a.label}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default memo(LbtCheckbox);
