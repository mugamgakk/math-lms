import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import style from "../style/style-module/components.module.scss"
import { useRef } from "react";
import { useEffect } from "react";


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

    let dateRef = useRef(false);

    useEffect(()=>{
        if(dateRef.current ===true){
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
    },[dateRef])

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
                clearIcon={null}
                calendarIcon={null}
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
                onCalendarClose={()=>{
                    setIsOpen(false)
                }}
            />
            <button
                onClick={(e) => {
                    setIsOpen(true);
                }}
                className={style.datepickerBtn}
            >
                <FontAwesomeIcon icon={faCalendarDays} />
            </button>
        </div>
    );
}

export default LmsDatePicker;
