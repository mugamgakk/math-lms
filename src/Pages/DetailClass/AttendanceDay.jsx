import dayjs from "dayjs";
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

const 오늘 = dayjs(new Date()).format("YYYYMM"); 

const AttendanceDay = memo(({ item, changeData, setModal, setClickDay, currentMonth}) => {

    const formatCurrentDate = ()=>{
        var numDay = item.daynum ? item.daynum : item;
        var numSet = parseInt(numDay) < 10 ? "0" + numDay : numDay;
        var numSet2 = 오늘 + numSet

        return numSet2
    }

    formatCurrentDate()

    


    return (
        <div className={`day ${formatCurrentDate() == currentMonth ? "today" : ""}`}>
            {typeof item === "object" ? (
                <div className="d-flex">
                    <div className="num">
                    {item.daynum}
                    </div>
                    <div className="check-attd">
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
                    </div>
                </div>
            ) : (
                <div className="num">
                    {item}
                </div>
            )}
        </div>
    );
});

export default AttendanceDay;
