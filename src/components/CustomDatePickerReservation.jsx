import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { weekChange } from "../methods/methods";
import Icon from "./Icon";
import SelectBase from "./ui/select/SelectBase";

const timeSelectOption = () => {
    let arr = [];
    for (let i = 1; i <= 23; i++) {
        i = 10 > i ? "0" + i : i;
        let obj = { value: i, label: i };
        arr.push(obj);
    }
    arr.push({ value: "00", label: "00" });
    return arr;
};

const miniuteSelectOption = () => {
    let arr = [];
    arr.push({ value: "00", label: "00" });
    for (let i = 10; i <= 60; i += 10) {
        let obj = { value: i, label: i };
        arr.push(obj);
    }

    return arr;
};

function CustomDatePickerReservation({
    onChange,
    className = "",
    style,
    maxDate,
    minDate,
    defaultDate = new Date(),
    defualtTime = { value: "00", label: "00" },
    defualtMiniute = { value: "00", label: "00" },
}) {
    // 날짜 선택
    let [value, setValue] = useState(defaultDate);

    let [time, setTime] = useState(defualtTime);
    let [miniute, setMiniute] = useState(defualtMiniute);

    let [dateValue, setDateValue] = useState(new Date(value));
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
    var timeOption = useMemo(() => {
        return timeSelectOption();
    });
    var miniuteOption = useMemo(() => {
        return miniuteSelectOption();
    });

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
        setValue(선택날짜);
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

            선택날짜 = dayjs(선택날짜).format("YYYYMMDD");
            let 최소날짜 = dayjs(minDate).format("YYYYMMDD");

            return 선택날짜 < 최소날짜;
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

            선택날짜 = dayjs(선택날짜).format("YYYYMMDD");
            let 최대날짜 = dayjs(maxDate).format("YYYYMMDD");

            return 선택날짜 > 최대날짜;
        },
        [dateValue]
    );

    useEffect(() => {
        setDateValue(value);
    }, [value]);

    return (
        <button className={`CustomDatePicker-btn ${className} CustomDatePickerReservation`}>
            <span
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <Icon icon={"calendar"} />
            </span>

            {open && (
                <div className="CustomDatePickerReservation-content">
                    <div className={`CustomDatePicker ${className}`} style={style}>
                        <div className="CustomDatePicker-header">
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
                            <div className="format">{dayFormat()}</div>
                            <div
                                onClick={() => {
                                    dateChange(1);
                                }}
                                className="btn"
                            >
                                <Icon icon={"arrowA"} style={{ transform: "scale(0.6)" }} />
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
                                                className={`day ${
                                                    isSameDate(a) ? "current-day" : ""
                                                } ${minDateFn(a) ? "disabled" : ""} ${
                                                    maxDateFn(a) ? "disabled" : ""
                                                }`}
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
                    <div className="CustomDatePicker-time">
                        <span className="time-label">시간</span>
                        <div className="d-flex mb-10">
                            <SelectBase
                                defaultValue="시"
                                width="72px"
                                options={timeOption}
                                onChange={(e) => setTime(e)}
                                value={time}
                                className="mr-10"
                            />
                            <SelectBase
                                defaultValue="분"
                                width="72px"
                                options={miniuteOption}
                                value={miniute}
                                onChange={(e) => setMiniute(e)}
                            />
                        </div>
                        <span className="time-label">예약 일시</span>
                        <div className="timeDay">
                            {new Date(value).getFullYear()}년 {dayjs(value).format("MM")}월
                            {dayjs(value).format("DD")}일 ({weekChange(new Date(value).getDay())})
                        </div>
                        <div className="timetime">
                            {time.value}:{miniute.value}
                        </div>
                        <div className="text-center time-btn">
                            <button
                                className="btn-grey"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                닫기
                            </button>
                            <button
                                className="btn-green"
                                onClick={() => {
                                    onChange &&
                                        onChange(
                                            `${dayjs(value).format("YYYY.MM.DD")}. (${weekChange(
                                                new Date(value).getDay()
                                            )}) ${time.value} : ${miniute.value}`
                                        );
                                        setOpen(false);
                                }}
                            >
                                확인
                            </button>
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

export default CustomDatePickerReservation;
