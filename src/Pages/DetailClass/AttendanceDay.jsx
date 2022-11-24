import React, { memo } from "react";
import SelectAttan from "../../components/ui/select/SelectAttan";
import SelectBase from "../../components/ui/select/SelectBase";
import { Box } from "./classTabs/AttendanceManagement";

const options = [
    { value: 'P', label: '출석' },
    { value: 'L', label: '지각' },
    { value: 'E', label: '조퇴' },
    { value: 'A', label: '결석' },
];


const AttendanceDay = memo(({ item, changeData, setModal, setClickDay}) => {

    return (
        <div className="day">
            {typeof item === "object" ? (
                <>
                    <div className="num">
                    {item.daynum}
                    </div>
                    <SelectAttan
                        onChange={(ele) => {

                            changeData({ day: item.daynum, attd: ele.value });
                        }}
                        value={item.attd}
                    />
                    {item.attd && item.attd !== "P" ? (
                        <button className="btn-table" onClick={async () => {
                            setModal(true);
                            setClickDay(item.daynum)
                        }}>사유보기</button>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <div className="num">
                    {item}
                </div>
            )}
        </div>
    );
});

export default AttendanceDay;
