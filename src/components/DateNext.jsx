import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import style from "../style/style-module/components.module.scss";
import { weekChange } from "../methods/methods"
import { useCallback } from "react";

const today = new Date();

function DateNext({value = today, onChange}) {

    let year = value.getFullYear(),
        month = value.getMonth() + 1,
        date = value.getDate(),
        day = weekChange(value.getDay());

    const changeDay = useCallback((param) => {
        if (param === "prev" && onChange) {
            onChange(new Date(value.setDate(value.getDate() - 1)));
        } else if (param === "next" && onChange) {
            if (value >= new Date(today.setDate(today.getDate() - 1))) {
                alert("현재월 이후로는 선택이 불가합니다.")
                return;
            }
            onChange(new Date(value.setDate(value.getDate() + 1)));
        }
    },[value]);


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
            </div>
        </div>
    );
}

export default DateNext;
