import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import ajax from "../../../ajax";
import Icon from "../../Icon";

function ClassSelect({
    width = "170px",
    onChange,
    value = [],
    defaultValue = "선택하세요",
    disabled,
    className,
}) {
    // 토글
    let [selectOpen, setSelectOpen] = useState(false);
    // 체크된 배열
    let [choiceArr, setChoiceArr] = useState([]);
    // 외 ***반
    let [text, setText] = useState("");
    let [options, setOptions] = useState([]);

    // 1개 체크 함수
    const checkedItem = (checked, ele) => {
        if (checked) {
            // 삭제
            let result = choiceArr.filter((a) => a.class_cd !== ele.class_cd);
            setChoiceArr(result);
        } else {
            // 추가
            let result = [...choiceArr, ele];
            setChoiceArr(result);
        }
    };

    // 전체 체크 함수
    const allCheck = useCallback(() => {
        if (options.length === choiceArr.length) {
            setChoiceArr([]);
        } else {
            setChoiceArr(options);
        }
    }, [choiceArr]);

    const getOptions = async () => {
        const data = {
            mode: "get_tch_class",
        };

        const res = await ajax("/class.php", { data });

        // const classList = res.data.class_list ?? [];

        const classList = [
            { class_cd: "123123", class_name: "중등 월화수목금 A" },
            { class_cd: "54357", class_name: "중등 월화수 b" },
            { class_cd: "5454654", class_name: "중등 월화수 c" },
        ];

        setOptions(classList);
        setChoiceArr(classList);
    };

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
            setText("반 선택");
        }

        if (choiceArr.length === 0) {
            setText(defaultValue);
        }
    }, [choiceArr]);

    useEffect(() => {
        // option 호출
        getOptions();
    }, []);

    return (
        <div
            tabIndex={1}
            style={{ width: width }}
            className={`ClassSelect select ${selectOpen ? "active" : ""} ${
                disabled ? "disabled" : ""
            } ${className}`}
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
                    <li className="fa" onClick={() => {
                                onChange && onChange(choiceArr);
                            }}>
                        <div
                            className="lookup"
                        >
                            조회
                        </div>
                    </li>
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
                        <div className="label">(전체 선택)</div>
                    </li>
                    {options &&
                        options.map((a, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={(e) => {
                                        let isClass = e.currentTarget.classList.contains("active");
                                        checkedItem(isClass, a);
                                    }}
                                    className={`fa ${
                                        choiceArr.some((ele) => a.class_cd === ele.class_cd)
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="label">{a.class_name}</div>
                                    <div className="checkbox"></div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default ClassSelect;
