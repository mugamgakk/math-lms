import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import Icon from "./Icon";

const 오늘 = new Date();

function CustomDatePicker({
    value = 오늘,
    onChange,
    className = "",
    style,
    maxDate,
    minDate,
}) {
    let [dateValue, setDateValue] = useState(value);
    let [open, setOpen] = useState(false);

    // html render
    var prevDay = useMemo(() => {
        return BeforeMonth(dateValue);
    }, [dateValue]);
    var currentDay = useMemo(() => {
        return currentMonth(dateValue);
    }, [dateValue]);
    var nextDay = useMemo(() => {
        return nextMonth(dateValue);
    }, [dateValue]);

    // 달 변경 버튼 함수
    const dateChange = (num) => {
        var 달 = dateValue.getMonth();

        const aliasDate = new Date(dateValue);

        let 변경달 = new Date(aliasDate.setMonth(달 + num));

        setDateValue(변경달);
    };

    // onChange 이벤트
    const choiceDay = (event, day) => {
        const isDisabled = event.currentTarget.classList.contains("disabled");

        if (isDisabled) return;

        let 선택날짜 = new Date(dateValue.setDate(day));

        onChange && onChange(선택날짜);
    };

    // 날짜 포맷
    const dayFormat = () => {
        var 년도 = dateValue.getFullYear().toString();
        var 월 = dateValue.getMonth() + 1;

        if (월 < 10) {
            월 = "0" + 월;
        }

        월 = 월.toString();

        return `${년도}.${월}`;
    };

    // 현재 날짜 선택
    const isSameDate = (day) => {
        const 값년도 = value.getFullYear();
        const 값달 = value.getMonth();
        const 값일 = value.getDate();

        const aliasDate = new Date(dateValue);

        let 선택날짜 = new Date(aliasDate.setDate(day));

        const 달력년도 = 선택날짜.getFullYear();
        const 달력달 = 선택날짜.getMonth();
        const 달력일 = 선택날짜.getDate();


        if (값년도 === 달력년도 && 값달 === 달력달 && 값일 === 달력일) {
            return true;
        } else {
            return false;
        }
    };

    // 최소날짜
    const minDateFn = useCallback(
        (day) => {
            if (!minDate) {
                return;
            }

            const aliasDate = new Date(dateValue);

            let 선택날짜 = new Date(aliasDate.setDate(day));

            return 선택날짜 < minDate;
        },
        [dateValue]
    );

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
        [dateValue]
    );

    useEffect(()=>{
        setDateValue(value)
    },[value])

    return (
        <button
            className={`CustomDatePicker-btn ${className}`}
            onBlur={() => {
                setOpen(false);
            }}
        >
            <span
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {dayjs(value).format("YYYY-MM-DD")} <Icon icon={"calendar"} />
            </span>

            {open && (
                <div className={`CustomDatePicker ${className}`} style={style}>
                    <div className="CustomDatePicker-header">
                        <div
                            onClick={() => {
                                dateChange(-1);
                            }}
                            className="btn"
                        >
                            <Icon icon={"arrowA"} style={{transform : "rotate(180deg) scale(0.6)"}} />
                        </div>
                        <div className="format">{dayFormat()}</div>
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
                        <div className="date">
                            <div className="date-header">
                                <div>일</div>
                                <div>월</div>
                                <div>화</div>
                                <div>수</div>
                                <div>목</div>
                                <div>금</div>
                                <div>토</div>
                            </div>
                            <div className="date-body">
                                {prevDay.map((a, i) => {
                                    // 숫자 넣으려면 변수넣으면 됨
                                    return (
                                        <div key={i} className="day disabled">
                                            {a}
                                        </div>
                                    );
                                })}
                                {currentDay.map((a, i) => {
                                    // 숫자 넣으려면 변수넣으면 됨
                                    return (
                                        <div
                                            key={i}
                                            className={`day ${isSameDate(a) ? "current-day" : ""} ${
                                                minDateFn(a) ? "disabled" : ""
                                            } ${maxDateFn(a) ? "disabled" : ""}`}
                                            onClick={(e) => {
                                                choiceDay(e, a);
                                            }}
                                        >
                                            {a}
                                        </div>
                                    );
                                })}
                                {nextDay.map((a, i) => {
                                    // 숫자 넣으려면 변수넣으면 됨
                                    return (
                                        <div key={i} className="day disabled">
                                            {a}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </button>
    );
}

// 이전월
const BeforeMonth = (day) => {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    const startDay = new Date(year, month, 0);
    const prevDate = startDay.getDate();
    const prevDay = startDay.getDay();

    let arr = [];

    for (let i = prevDate - prevDay; i <= prevDate; i++) {
        arr.push(i);
    }

    if (arr.length === 7) {
        return [];
    } else {
        return arr;
    }
};

// 현재 월
const currentMonth = (day) => {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();

    const 말일 = new Date(new Date(year, month + 1, 0)).getDate();

    let arr = [];
    for (let i = 1; i <= 말일; i++) {
        arr.push(i);
    }

    return arr;
};

// 다음월
const nextMonth = (day) => {
    const year = new Date(day).getFullYear();
    const month = new Date(day).getMonth();

    // 이번달의 마지막 날 날짜와 요일 구하기
    const lastDay = new Date(year, month + 1, 0);

    const 요일 = lastDay.getDay();

    let arr = [];

    for (let i = 1; i <= 7 - (요일 + 1); i++) {
        arr.push(i);
    }

    return arr;
};

export default CustomDatePicker;
