import React from "react";
import DatePicker from "react-date-picker";
import style from "../style/style-module/components.module.scss"
import { useRef } from "react";
import { useEffect } from "react";
import Icon from "./Icon";


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
    width = "150px"
}) {

    let dateRef = useRef(false);

    return (
        
        <div className="datepicker" style={{width}}>
            <DatePicker
                value={value}
                onChange={(day) => {
                    if (onChange) {
                        onChange(day);
                    }
                }}
                className={style.datepickerBody}
                clearIcon={null}
                calendarIcon={<Icon icon={"apple"}/>}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                disabled={disabled}
                maxDate={maxDate}
                maxDetail={maxDetail} 
                minDate={minDate}
                minDetail={minDetail}
                monthPlaceholder={monthPlaceholder}
                required={required}
                closeCalendar={false}
            />
        </div>
    );
}

export default LmsDatePicker;
