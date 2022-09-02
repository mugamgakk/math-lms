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

    let [value, setValue] = useState({
        start : new Date(),
        end : dayjs(new Date()).add(1, "M").$d,
        text : ""
    })

    console.log(value)

    let findUser = useReservationStore((state) => state.findUser);

    const postData = (e)=>{
        e.preventDefault();
        findUser(value);
    }

    return (
        <div>
            <form onSubmit={postData}>
            <DatePicker
                className="datepicker-base"
                onChange={day => setValue({...value, start : day})}
                value={value.start}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            ~
            <DatePicker
                className="datepicker-base"
                onChange={day => setValue({...value, end : day})}
                value={value.end}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            <input
                type="text"
                className="form-control"
                value={value.text}
                placeholder="이름 검색"
                onChange={e=>setValue({...value, text : e.target.value})}
            />
            <button className="btn">
                예약자 조회
            </button>
            </form>
        </div>
    );
};

export default ReservationSearch;
