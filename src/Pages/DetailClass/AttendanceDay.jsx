import dayjs from "dayjs";
import React, { memo } from "react";
import SelectAttan from "../../components/ui/select/SelectAttan";

const 오늘 = dayjs(new Date()).format("YYYYMM"); 

const AttendanceDay = memo(({ item, changeData, setModal, setClickDay, currentMonth}) => {

    console.log(item);
    const formatCurrentDate = ()=>{
        var numDay = item.daynum ? item.daynum : item;
        var numSet = parseInt(numDay) < 10 ? "0" + numDay : numDay;
        var numSet2 = 오늘 + numSet

        return numSet2
    }

    return (
        <div className={`day ${formatCurrentDate() == currentMonth ? "today" : ""}`}>
            {typeof item === "object" ? (
                <div className="d-flex">
                    <div className="num">
                    {item.daynum}
                    </div>
                    <div className="check-attd">
                        {/* {item.attd ? item.attd : "없음"} */}
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
