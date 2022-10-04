import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useLbtStore from "../../store/useLbtStore";
import style from "../../style/style-module/lbtModal.module.scss";

function LbtCheckbox({ checkbox, count, allCheckBtn }) {
    let [checkList, setCheckList] = useState(checkbox.optionItem);
    let setCreateData = useLbtStore((state) => state.setCreateData);

    let ref = useRef(false);

    const allCheck = (checked) => {
        if (checked) {
            setCheckList(checkbox.optionItem);
        } else {
            setCheckList([]);
        }
    };

    const oneCheck = (checked, ele) => {
        if (checked) {
            setCheckList([...checkList, ele]);
        } else {
            setCheckList(checkList.filter((a) => a !== ele));
        }
    };

    useEffect(() => {
        setCreateData({ option: checkbox.option, optionItem: checkList });
    }, [count]);

    useEffect(() => {
        if (ref.current) {
            if (allCheckBtn) {
                setCheckList(checkbox.optionItem);
            } else {
                setCheckList([]);
            }
        } else {
            ref.current = true;
        }
    }, [allCheckBtn]);

    return (
        <div>
            <div>
                <label htmlFor={checkbox.option}>{checkbox.option}</label>
                <input
                    type="checkbox"
                    id={checkbox.option}
                    onChange={(e) => {
                        allCheck(e.target.checked);
                    }}
                    checked={checkList.length === checkbox.optionItem.length}
                    className={style.formConrol}
                />
            </div>
            <ul className={style.contentList} style={{ marginLeft: "20px" }}>
                {checkbox.optionItem.map((a) => {
                    return (
                        <li key={a}>
                            <label htmlFor={a}>{a}</label>
                            <input
                                type="checkbox"
                                id={a}
                                className={style.formConrol}
                                checked={checkList.includes(a)}
                                onChange={(e) => {
                                    oneCheck(e.target.checked, a);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LbtCheckbox;
