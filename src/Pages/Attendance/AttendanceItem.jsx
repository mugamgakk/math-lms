import axios from "axios";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import SelectBase from "../../components/ui/select/SelectBase";

const options = ["출석", "지각", "조퇴", "결석"];

const AttendanceItem = memo(({ list, allCheck }) => {
    let [selectOption, setSelectOption] = useState(list.attendance);

    // 출결사유 disabled
    let [reasonDisabled, setReasonDisabled] = useState(false);

    // 출결사유 value
    let [reason, setReaSon] = useState(list.reason);

    let [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        // 선택/출석 사유 입력 영역 비활성화
        if (selectOption === null || selectOption === "출석") {
            setReasonDisabled(true);
        } else {
            setReasonDisabled(false);
        }
    }, [selectOption]);

    useEffect(() => {
        if (allCheck !== 0) {
            setSelectOption("출석");
        }
    }, [allCheck]);

    const saveAttendance = () => {
        setBtnDisabled(true)
        let data = { ...list };
        data.attendance = selectOption;
        data.reason = reason;

        axios.put("http://192.168.11.178:8080/attendace/correction", data).then((res) => {
            // console.log(res);
            setBtnDisabled(false)
        });
    };

    return (
        <tr>
            <td style={{width : "25%"}}>
                {list.name}({list.userId})
            </td>
            <td style={{width : "15%"}}>
                <SelectBase
                    options={options}
                    value={selectOption}
                    onChange={(ele) => {
                        console.log(ele);
                        setSelectOption(ele);
                    }}
                />
            </td>
            <td style={{width : "60%"}}>
                <input
                    type="text"
                    placeholder="사유 입력(50자 이내)"
                    className="form-control"
                    disabled={reasonDisabled}
                    value={reason}
                    onChange={(e) => {
                        setReaSon(e.target.value);
                    }}
                    style={{ width: "90%", display: "inline-block" }}
                />
                <button disabled={btnDisabled} className="btn" onClick={saveAttendance}>
                    저장
                </button>
            </td>
        </tr>
    );
});

export default AttendanceItem;
