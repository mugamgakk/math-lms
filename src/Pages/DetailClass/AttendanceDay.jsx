import React, { useEffect, useState } from "react";
import AMselect from "./AMselect";

const options = ["출석", "지각", "조퇴", "결석"];

function AttendanceDay({ date, setModal, setExnum }) {
    let [selectOption, setSelectOption] = useState(options[0]);

    const changeFn = (ele) => {
        setSelectOption(ele);
    };

    return (
        <div
            style={{
                width: "calc(100% / 7)",
                height: "110px",
                backgroundColor: "#eee",
            }}
        >
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
            </select>


            {date.day ? (
                <div>
                    {date.day}

                    <AMselect value={selectOption} onChange={changeFn} options={options} />

                    <br />
                    {date.설명 && (
                        <button
                            className="btn"
                            onClick={() => {
                                setModal(true);
                                setExnum(date.day);
                            }}
                        >
                            사유
                        </button>
                    )}
                </div>
            ) : (
                date
            )}
        </div>
    );
}

export default AttendanceDay;
