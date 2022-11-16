import React from "react";
import { useState } from "react";

const att = [
    { value: "P", label: "출석" },
    { value: "L", label: "지각" },
    { value: "E", label: "조퇴" },
    { value: "A", label: "결석" },
];

function AttendanceTableList({ ele, updateData }) {

    let [disable, setDisable] = useState(ele.reason === "" ? true : false);

    return (
        <tr>
            <td>
                {ele.um_nm} ({ele.um_id})
            </td>
            <td>
                {att.map((a) => {
                    return (
                        <button
                            key={a.value}
                            className={`btn ${a.value === ele.attd ? "active" : ""}`}
                            onClick={(e) => { updateData(ele.usr_seq, a.value, "attd") }}
                        >
                            {a.label}
                        </button>
                    );
                })}
            </td>
            <td className="d-flex">
                <button className="btn" onClick={() => { setDisable(!disable) }}>글쓰기</button>
                <input
                    type="text"
                    value={ele.reason}
                    className="form-control"
                    placeholder="사유 입력(50자 이내)"
                    disabled={disable}
                    onChange={(e) => { updateData(ele.usr_seq, e.target.value, "reason") }}
                />
                <button className="btn">저장</button>
            </td>
        </tr>
    );
}

export default AttendanceTableList;
