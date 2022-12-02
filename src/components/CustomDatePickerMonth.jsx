import React from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import Icon from "./Icon";

function CustomDatePickerMonth({
    value = new Date(),
    onChange,
    style,
    className = "",
    maxDate,
    minDate,
}) {
    let [open, setOpen] = useState(false);
    let [dateValue, setDateValue] = useState(value);

    // html render
    var month = useMemo(() => {
        return monthRender();
    }, [dateValue]);

    // 년도 변경 버튼 함수
    const dateChange = (num) => {
        var 년도 = dateValue.getFullYear();

        let 변경년도 = new Date(dateValue.setFullYear(년도 + num));

        setDateValue(변경년도);
    };

    // onChange 이벤트
    const choiceMonth = (event, month) => {
        const isDisabled = event.currentTarget.classList.contains("disabled");

        if (isDisabled) return;

        let 선택날짜 = new Date(dateValue.setMonth(month - 1));

        onChange && onChange(선택날짜);
    };

    // 현재 날짜 선택
    const isSameDate = (month) => {
        const 값년도 = value.getFullYear();
        const 값달 = value.getMonth();

        const aliasDate = new Date(dateValue);

        let 선택날짜 = new Date(aliasDate.setMonth(month - 1));

        const 달력년도 = 선택날짜.getFullYear();
        const 달력달 = 선택날짜.getMonth();

        // console.log(달력달)

        if (값년도 === 달력년도 && 값달 === 달력달) {
            return true;
        } else {
            return false;
        }
    };

    // 최소날짜
    const minDateFn = (month) => {
        if (!minDate) {
            return;
        }

        const aliasDate = new Date(dateValue);

        let 선택날짜 = new Date(aliasDate.setMonth(month));

        return 선택날짜 < minDate;
    };

    // 최대날짜
    const maxDateFn = useCallback(
        (day) => {
            if (!maxDate) {
                return;
            }

            const aliasDate = new Date(dateValue);

            let 선택날짜 = new Date(aliasDate.setDate(day));

            return 선택날짜 > maxDate;
        },
        [maxDate]
    );

    return (
        <button
            className="CustomDatePicker-btn"
            onBlur={() => {
                setOpen(false);
            }}
        >
            <span
                onClick={() => {
                    setOpen(!open);
                }}
            >
                달력에서 선택 <Icon icon={"calendar"} />
            </span>
            {open && (
                <div className={`CustomDatePicker ${className}`} style={style}>
                    <div className="CustomDatePicker-header" style={{marginBottom : "20px"}}>
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
                                        className={`month-item ${
                                            isSameDate(a) ? "current-month" : ""
                                        } ${minDateFn(a) ? "disabled" : ""} ${
                                            maxDateFn(a) ? "disabled" : ""
                                        }`}
                                        onClick={(e) => {
                                            choiceMonth(e, a);
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
