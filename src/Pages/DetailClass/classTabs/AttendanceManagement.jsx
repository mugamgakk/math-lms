import { faR } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ChangeMonth from "../../../components/ChangeMonth";
import SelectBase from "../../../components/ui/select/SelectBase";

const Box = styled.div`
    width: 14.285714%;
    height: 100px;
    border: 1px solid #999;
    padding: 10px;
`;

const Reason = styled.div`
    width: 400px;
    border: 1px solid #999;
    padding: 10px;
    position: absolute;
    right: 100px;
    bottom: 100px;
    background: #fff;
`;

const options = ["출석", "지각", "조퇴", "결석"];

function AttendanceManagement() {
    let [clickNum, setClickNum] = useState(0);
    let [modal, setModal] = useState(false);
    let [day,setDay] = useState([]);
    let [nullDay, setNullDay] = useState([]);

    const changeMonth = async (param) => {

        if(param === "") return;

        let 첫날요일 = dayjs(param).$W;
        let 마지막일 = dayjs(param).daysInMonth();

        let arr = new Array(첫날요일).fill(첫날요일);

        setNullDay(arr);


        let res = await axios.post("http://192.168.21.109:8080/attendace/month", {day : param});

        setDay(res.data.day)
    };

    return (
        <div>
            {modal && (
                <Reason>
                    <h4>출결 사유</h4>
                    <strong>{clickNum + 1} 일</strong>
                    <textarea
                        className="form-control"
                        rows="8"
                        placeholder="사유를 입력해 주세요.(50자 이내)"
                    >
                    </textarea>
                    <div className="text-center">
                        <button className="btn" onClick={()=>{setModal(false)}}>취소</button>
                        <button className="btn">저장</button>
                    </div>
                </Reason>
            )}

            <header className="fj mb-3">
                <div>
                    <button className="btn">선택에서 출석</button>
                </div>
                <div>
                    <ChangeMonth onChange={changeMonth} />
                </div>
                <div>
                    <button className="btn">출결 저장</button>
                </div>
            </header>
            <table>
                <thead>
                    <tr style={{ background: "#ccc" }}>
                        <th style={{ color: "red" }}>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th style={{ color: "red" }}>토</th>
                    </tr>
                </thead>
            </table>
            <div style={{ display: "flex", flexWrap: "wrap" }}>

                {nullDay.map((a, i) => {
                    return <Box key={i} style={{backgroundColor: "#ddd"}}/>;
                })}

                {day.map((a, i) => {
                    return <DayBox item={a} index={i} key={i} setClickNum={setClickNum} setModal={setModal} />;
                })}
            </div>
        </div>
    );
}

function DayBox({ item, index, setClickNum, setModal }) {
    let [value, setValue] = useState(item.attendance);

    return (
        <Box>
            {index + 1}
            {value && (
                <SelectBase
                    onChange={(ele) => {
                        setValue(ele);
                    }}
                    options={options}
                    value={value}
                    defaultValue="선택"
                />
            )}

            {value && value !== "선택" && value !== "출석" ? (
                <button className="btn" onClick={()=>{
                    setClickNum(index);
                    setModal(true)
                }}>사유보기</button>
            ) : null}
        </Box>
    );
}

export default AttendanceManagement;
