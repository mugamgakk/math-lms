import React, {useState, useEffect, memo} from 'react';
import SelectBase from "../../components/ui/select/SelectBase";
import {Prompt} from "react-router-dom"

const options = ["출석", "지각", "조퇴", "결석"];

const AttendanceTableList = memo(({updateData, ele})=> {
    let [disable, setDisable] = useState(false);
    useEffect(() => {
        // 선택/출석 사유 입력 영역 비활성화
        if (ele.attendance === null || ele.attendance === "출석") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [ele.attendance]);


    return ( 
        <tr>
            <td style={{ width: "25%" }}>{ele.name}</td>
            <td style={{ width: "15%" }}>
                <SelectBase
                    value={ele.attendance}
                    options={options}
                    onChange={(data) => {
                        updateData({_id : ele._id, attendance : data})
                    }}
                />
            </td>
            <td style={{ width: "60%" }}>
                <input
                    type="text"
                    className="form-control"
                    value={ele.reason}
                    disabled={disable}
                    onChange={(e) => {
                        updateData({_id : ele._id, reason : e.target.value})
                    }}
                />
            </td>
        </tr>
     );
})

export default AttendanceTableList;