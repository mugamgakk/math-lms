import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import style from "../style/style-module/components.module.scss"
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";


function LmsDatePicker({
    value = new Date(),
    onChange,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    disabled = false,
    required = false,
    monthPlaceholder = "--",
    width="150px"
}) {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${style.datepicker} datepicker`} style={{width : width}}>
            <DatePicker
                value={value}
                onChange={(day) => {
                    if (onChange) {
                        onChange(day);
                    }
                }}
                className={style.datepickerBody}
                clearIcon={false}
                calendarIcon={false}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                isOpen={isOpen}
                disabled={disabled}
                maxDate={maxDate}
                maxDetail={maxDetail}
                minDate={minDate}
                minDetail={minDetail}
                monthPlaceholder={monthPlaceholder}
                required={required}
                closeCalendar={false}
            />
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className={style.datepickerBtn}
            >
                <FontAwesomeIcon icon={faCalendarDays} />
            </button>
        </div>
    );
}

export default LmsDatePicker;
