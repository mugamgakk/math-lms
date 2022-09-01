import React from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import useReservationStore from "../store/useReservationStore";
import dayjs from "dayjs";

function ReservationSearch() {
    const { user, choiceUser, choice } = useReservationStore((state) => state);


    // 예약일시 기준 , 오름차순 정렬
    user.sort((a, b) => {
        if (dayjs(a.date) < dayjs(b.date)) {
            return -1;
        } else {
            return 1;
        }
    });

    return (
        <div style={{ width: "320px" }}>
            <Search />

            <table style={{ fontSize: "12px" }}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>예약일시</th>
                        <th>연락처</th>
                        <th>보기</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((a, i) => {
                        return (
                            <tr
                                key={i}
                                style={
                                    a.name === choiceUser?.name
                                        ? { background: "rgba(0,0,0,0.3)" }
                                        : null
                                }
                            >
                                <td>{a.name}</td>
                                <td>{a.date}</td>
                                <td>{a.phone}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            choice(a);
                                        }}
                                    >
                                        보기
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Search = () => {
    let [start, setStart] = useState(new Date());
    let [end, setEnd] = useState(new Date());
    let [text, setText] = useState("");
    let findUser = useReservationStore((state) => state.findUser);

    return (
        <div>
            <DatePicker
                className="datepicker-base"
                onChange={(day) => {
                    setStart(day);
                }}
                value={start}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            ~
            <DatePicker
                className="datepicker-base"
                onChange={(day) => {
                    setEnd(day);
                }}
                value={end}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            <input
                type="text"
                className="form-control"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    findUser(text);
                }}
            >
                예약자 조회
            </button>
        </div>
    );
};

export default ReservationSearch;
