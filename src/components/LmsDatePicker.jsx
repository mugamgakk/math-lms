import React from "react";
import DatePicker from "react-date-picker";
import Icon from "./Icon";
import { useState } from "react";
import dayjs from "dayjs";


function LmsDatePicker({
    value ,
    onChange,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    disabled = false,
    required = false,
    monthPlaceholder = "달력에서 선택",
    style
}) {

    let [isOpen, setIsOpen] = useState(false);

    return (

        <div className="datepicker">
            <div>
            <div className="datepicker-body">
                <DatePicker
                    value={value}
                    onChange={(day) => {
                        if (onChange) {
                            onChange(day);
                        }
                    }}
                    clearIcon={null}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                    disabled={disabled}
                    maxDate={maxDate}
                    maxDetail={maxDetail}
                    minDate={minDate}
                    minDetail={minDetail}
                    required={required}
                    closeCalendar={false}
                    onCalendarClose={()=>{setIsOpen(false)}}
                    isOpen={isOpen}
                />
            </div>
            <button className="datepicker-btn" onClick={()=>{setIsOpen(true)}} style={style}>
                    {
                    value 
                    ? dayjs(value).format("YYYY.MM.DD")
                    : monthPlaceholder
                }
                    <Icon icon={"calendar"} style={{fontSize : "18px", marginLeft : "10px"}} />
            </button>
            </div>
        </div>
    );
}

export default LmsDatePicker;
