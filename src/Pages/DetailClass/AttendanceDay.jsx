import React, { memo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";
import { Box } from "./classTabs/AttendanceManagement";
import dayjs from "dayjs";
import ajax from "../../ajax";

const options = ["출석", "지각", "조퇴", "결석"];

const AttendanceDay = memo(({ item, changeData, setModal, firstDay, clickStudent }) => {
    let obj = {
        P: "출석",
        L: "지각",
        E: "조퇴",
        A: "결석",
    };

    return (
        <Box bg="#ccc">
            {typeof item === "object" ? (
                <>
                    <p>{item.daynum}</p>
                    <SelectBase
                        width="80px"
                        defaultValue="선택"
                        onChange={(ele) => {
                            let obj = {
                                출석: "P",
                                지각: "L",
                                조퇴: "E",
                                결석: "A",
                            };

                            changeData({ day: item.daynum, attd: obj[ele] });
                        }}
                        value={obj[item.attd]}
                        options={options}
                    />
                    {item.attd && item.attd !== "P" ? (
                        <button className="btn" onClick={async ()=>{

                            const 날짜 = dayjs(firstDay).format("YYYYMM");

                            const data = {
                                mode: "get_reason",
                                usr_seq: clickStudent.usr_seq,
                                ymd: 날짜,
                            };
                            const res = await ajax("/class_daily.php", { data });

                            console.log(res)

                            setModal(true);
                        }}>사유보기</button>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                item
            )}
        </Box>
    );
});

export default AttendanceDay;
