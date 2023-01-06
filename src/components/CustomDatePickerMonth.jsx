import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import Icon from "./Icon";

const 오늘 = new Date();

function CustomDatePickerMonth({
    value = 오늘,
    onChange,
    style,
    className = "",
    maxDate,
    minDate,
    label = false
}) {
    let [open, setOpen] = useState(false);
    let [dateValue, setDateValue] = useState(value);

    // html render
    var month = useMemo(() => {
        return monthRender();
    }, []);

    // 년도 변경 버튼 함수
    const dateChange = (num) => {
        var 년도 = dateValue.getFullYear();

        const aliasDate = new Date(dateValue);

        let 변경년도 = new Date(aliasDate.setFullYear(년도 + num));

        setDateValue(변경년도);
    };

    // onChange 이벤트
    const choiceMonth = (event, month) => {
        const isDisabled = event.currentTarget.classList.contains("disabled");

        if (isDisabled) return;

        const aliasDate = new Date(dateValue);

        let 선택날짜 = new Date(aliasDate.setMonth(month - 1));

        onChange && onChange(선택날짜);
    };


    // 현재 날짜 선택
    const isSameDate = (month) => {

        const 값날짜 = dayjs(value).format("YYYYMM");

        const aliasDate = new Date(dateValue);

        const 선택날짜 = new Date(aliasDate.setMonth(month - 1));

        const 달력달 = dayjs(선택날짜).format("YYYYMM");

        if (값날짜 === 달력달) {
            return true
        } else {
            return false
        }

    };

    // 최소날짜
    const minDateFn = useCallback((month) => {
        if (!minDate) {
            return;
        }

        const aliasDate = new Date(dateValue);

        let 선택날짜 = new Date(aliasDate.setMonth(month - 1));

        let a = dayjs(선택날짜).format("YYYYMM")
        let b = dayjs(maxDate).format("YYYYMM")

        if (a === b) {
            return false
        }

        return a < b;
    }, [dateValue]);

    // 최대날짜
    const maxDateFn = useCallback(
        (month) => {
            if (!maxDate) {
                return;
            }

            const aliasDate = new Date(dateValue);

            let 선택날짜 = new Date(aliasDate.setMonth(month - 1));

            let a = dayjs(선택날짜).format("YYYYMM")
            let b = dayjs(maxDate).format("YYYYMM")

            if (a === b) {
                return false
            }

            return a > b;
        },
        [dateValue]
    );

    useEffect(() => {
        setDateValue(value)
    }, [value])

    return (
        <button
            className={`CustomDatePicker-btn ${className}`}
            style={style}
            onBlur={() => {
                setOpen(false);
            }}
        >
            <span
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {
                    label 
                    ? dayjs(value).format("YYYY-MM")
                    : "달력에서 선택"

                }
                
                <Icon icon={"calendar"} />
            </span>
            {open && (
                <div className={`CustomDatePicker`}>
                    <div className="CustomDatePicker-header" style={{ marginBottom: "20px" }}>
                        <div
                            onClick={() => {
                                dateChange(-1);
                            }}
                            className="btn"
                        >
                            <Icon
                                icon={"arrowA"}
                                style={{ transform: "rotate(180deg) scale(0.6)" }}
                            />
                        </div>
                        <div className="format">{dateValue.getFullYear()}</div>
                        <div
                            onClick={() => {
                                dateChange(1);
                            }}
                            className="btn"
                        >
                            <Icon icon={"arrowA"}
                                style={{ transform: "scale(0.6)" }}
                            />
                        </div>
                    </div>
                    <div className="CustomDatePicker-body">
                        <div className="month">
                            {month.map((a, i) => {
                                return (
                                    <div
                                        className={`month-item ${isSameDate(a) ? "current-month" : ""
                                            } ${minDateFn(a) ? "disabled" : ""} ${maxDateFn(a) ? "disabled" : ""
                                            }`}
                                        onClick={(e) => {
                                            choiceMonth(e, a);
                                            setOpen(false);
                                        }}
                                        key={i}
                                    >
                                        {a}월
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </button>
    );
}

const monthRender = () => {
    let arr = [];
    for (let i = 1; i <= 12; i++) {
        arr.push(i);
    }

    return arr;
};

export default CustomDatePickerMonth;
