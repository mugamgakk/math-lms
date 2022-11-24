import React, { memo } from "react";
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
        <Box bg="white">
            {typeof item === "object" ? (
                <>
                    <p>{item.daynum}</p>
                    <SelectBase
                        width="80px"
                        defaultValue="선택"
                        onChange={(ele) => {

                            changeData({ day: item.daynum, attd: ele.value });
                        }}
                        value={item.attd}
                        options={options}
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
                item
            )}
        </Box>
    );
});

export default AttendanceDay;
