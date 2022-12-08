import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ajax from "../../../ajax";
import Icon from "../../../components/Icon";

const Modal = styled.div`
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 10;
`;

function AttendanceReason({ setModal, clickStudent, month, clickDay }) {
    let [reason, setReason] = useState("");

    const saveReason = async () => {
        const 날짜 = dayjs(month).set("date", clickDay).format("YYYYMMDD");

        const param = {
            mode: "set_reason",
            usr_seq: clickStudent.usr_seq,
            ymd: 날짜,
            reason,
        };

        const res = await ajax("/class_daily.php", { data: param });

        setModal(false);
    };

    const getData = async () => {
        const 날짜 = dayjs(month).set("date", clickDay).format("YYYYMMDD");

        const data = {
            mode: "get_reason",
            usr_seq: clickStudent.usr_seq,
            ymd: 날짜,
        };

        const res = await ajax("/class_daily.php", { data });
        // console.log(res);
        let comment = res.data.reason;

        setReason(comment ?? "");
    };

    useState(() => {
        getData();
    }, []);

    return (
        <div className="modal AttendanceReason">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">[진단 평가] 회원 연동</h4>
                    <button className="btn" onClick={()=>{
                            setModal(false);
                    }}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <h4 className="title">
                         출결 사유
                    </h4>
                    <div className="text-area">
                    <textarea
                        rows="10"
                        cols={40}
                        value={reason}
                        placeholder="사유를 입력해 주세요."
                        onChange={(e) => {
                            setReason(e.target.value);
                        }}
                    ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey-border"
                        onClick={() => {
                            setModal(false);
                        }}
                        style={{marginRight : "20px"}}
                    >
                        취소
                    </button>
                    <button className="btn-orange" onClick={saveReason}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttendanceReason;
