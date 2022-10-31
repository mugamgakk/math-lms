import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ajax from "../../../ajax";

const Modal = styled.div`
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 10;
`;

function AttendanceReason({setModal, clickStudent, firstDay}) {

    let [reason, setReason] = useState("");

    const saveReason = async () => {
        const 날짜 = dayjs(firstDay).format("YYYYMM");

        const param = {
            mode: "set_reason",
            usr_seq: clickStudent.usr_seq,
            ymd : 날짜,
            reason,
        };

        // console.log(param);

        const res = await ajax("/class_daily.php", { data: param });

        setModal(false);
        console.log(res);
    };

    useState(async ()=>{
        const 날짜 = dayjs(firstDay).format("YYYYMM");

        const data = {
            mode: "get_reason",
            usr_seq: clickStudent.usr_seq,
            ymd: 날짜,
        };
        
        const res = await ajax("/class_daily.php", { data });

        console.log(res)
    },[])


    return (
        <Modal>
            <h4>출결사유</h4>
            <textarea rows="10" cols={40} onChange={(e)=>{ setReason(e.target.value) }}></textarea>
            <button
                className="btn"
                onClick={() => {
                    setModal(false);
                }}
            >
                취소
            </button>
            <button className="btn" onClick={saveReason}>저장</button>
        </Modal>
    );
}

export default AttendanceReason;
