import React, { useState, useEffect, memo } from "react";
import SelectBase from "../../components/ui/select/SelectBase";

const options = [
    { value: "P", label: "출석" },
    { value: "L", label: "지각" },
    { value: "E", label: "조퇴" },
    { value: "A", label: "결석" },
];

const AttendanceTableList = memo(({ updateData, ele }) => {
    let [disable, setDisable] = useState(false);

    useEffect(() => {
        // 선택/출석 사유 입력 영역 비활성화
        if (ele.attd === "P") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [ele.attd]);

    return (
        <tr>
            <td style={{ width: "25%" }}>
                {ele.um_nm} ({ele.um_id})
            </td>
            <td style={{ width: "15%" }}>
                <SelectBase
                    value={ele.attd}
                    options={options}
                    onChange={(res) => {
                        updateData({userId : ele.usr_seq, value : res.value, key : "attd"});
                    }}
                />
            </td>
            <td style={{ width: "60%" }}>
                <input 
                type="text"
                className="form-control" 
                value={ele.reason} 
                disabled={disable} 
                onChange={e=>{ 
                    updateData({userId : ele.usr_seq, value : e.target.value, key : "reason"});
                }}
                />
            </td>
        </tr>
    );
});

export default AttendanceTableList;
