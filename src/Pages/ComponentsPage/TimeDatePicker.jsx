import React, { useState } from "react";
import Calendar from "react-calendar";
import SelectBase from "../../components/ui/select/SelectBase";
import dayjs from "dayjs";
import { weekChange } from "../../methods/methods";

const 시간 = [];
const 분 = ["00", "10", "20", "30", "40", "50"];

for (let i = 1; i <= 23; i++) {
    if (i < 10) {
        시간.push("0" + i.toString());
    } else {
        시간.push(i);
    }
}

const 내일날짜 = dayjs(new Date()).add(1, "d").$d;

function TimeDatePicker({ onChange, open }) {
    const [value, setValue] = useState(내일날짜);
    let [hour, setHour] = useState(9);
    let [miniute, setMiniute] = useState(20);

    const time = dayjs(value);
    const result = `${time.$y}년 ${time.$M + 1}월 ${time.$D}일(${weekChange(time.$W)}) ${
        hour + ":" + miniute
    }`;

    return (
        <div className="Reservation-datepicker">
            <Calendar minDate={내일날짜} onChange={setValue} value={value} />
            <div className="box">
                <h6>시간</h6>
                <SelectBase
                    width={80}
                    value={hour}
                    onChange={(ele) => setHour(ele)}
                    options={시간}
                    defaultValue="시간"
                />
                <SelectBase
                    width={80}
                    value={miniute}
                    onChange={(ele) => setMiniute(ele)}
                    options={분}
                    defaultValue="분"
                />
                <p>예약 일시 : {result}</p>

                <div className="text-center">
                    <button
                        className="btn"
                        onClick={() => {
                            onChange(result);
                        }}
                    >
                        확인
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            open(false);
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TimeDatePicker;
