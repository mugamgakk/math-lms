import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-date-picker";
import style from "../style/style-module/components.module.scss"

const fn = (day) => {
    switch (day) {
        case 0:
            return "일";
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        default:
            return "토";
    }
};

function DateNext({value = new Date(), onChange}) {
    const today = new Date();

    let year = value.getFullYear(),
        month = value.getMonth() + 1,
        date = value.getDate(),
        day = fn(value.getDay());

    let [openCalendar, setOpenCalendar] = useState(false);

    const changeDay = (param) => {
        if (param === "prev" && onChange) {
            onChange(new Date(value.setDate(value.getDate() - 1)));
        } else if (param === "next" && onChange) {
            if (value >= new Date(today.setDate(today.getDate() - 1))) {
                return;
            }
            onChange(new Date(value.setDate(value.getDate() + 1)));
        }
    };


    let 날짜 = `${year}. ${month < 10 ? "0" + month : month}. 
    ${date < 10 ? "0" + date : date} (${day})`;

    return (
        <div className={style.nextDate}>
            <div className="fa">
                <button
                    type="button"
                    style={{ fontSize: "30px" }}
                    className={style.arrow}
                    onClick={() => {
                        changeDay("prev");
                    }}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <strong style={{ position: "relative", top: "-3px" }}>{날짜}</strong>
                <button
                    type="button"
                    style={{ fontSize: "30px" }}
                    className={style.arrow}
                    onClick={() => {
                        changeDay("next");
                    }}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <DatePicker
                className={`${style.date}`}
                value={value}
                isOpen={openCalendar}
                maxDate={new Date()}
                onChange={(day)=>{
                    if(onChange){
                        onChange(day)
                    }
                }}
                />

                <button
                    className={style.nextBtn}
                    onClick={() => {
                        setOpenCalendar(!openCalendar);
                    }}
                >
                    <FontAwesomeIcon icon={faCalendarDays} />
                </button>
            </div>
        </div>
    );
}

export default DateNext;
