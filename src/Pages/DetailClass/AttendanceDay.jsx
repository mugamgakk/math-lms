import React, { useState } from "react";
import { useEffect } from "react";
import SelectBase from "../../components/ui/select/SelectBase";

const options = ["출석", "지각", "조퇴", "결석"];

function AttendanceDay({ date, setModal, setExnum }) {
    let [selectOption, setSelectOption] = useState(date.state);

    useEffect(() => {
        setSelectOption(date.state);
    }, [date.state]);

    const findReason = () => {
        setModal(true);
        setExnum(date.day - 1);
    };

    return (
        <div>
            {date.state ? (
                <>
                    {date.day}
                    <SelectBase
                        onChange={(ele) => {
                            setSelectOption(ele);
                        }} // 파라미터에 option이 들이있음
                        options={options} // 모든 옵션들
                        value={selectOption}
                    />
                    {date.설명 && (
                        <button
                            className="btn"
                            onClick={() => {
                                findReason(date.day);
                            }}
                        >
                            사유보기
                        </button>
                    )}
                </>
            ) : (
                date
            )}
        </div>
    );
}

export default AttendanceDay;
