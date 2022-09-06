import React from "react";
import { memo } from "react";
import { useState } from "react";
import TimeDatePicker from "../ComponentsPage/TimeDatePicker";
import SelectBase from "../../components/ui/select/SelectBase";

const 학년 = [
    "초등 2학년",
    "초등 3학년",
    "초등 4학년",
    "초등 5학년",
    "초등 6학년",
    "중등 1학년",
    "중등 2학년",
    "중등 3학년",
];

const 학기 = ["1학기", "2학기"];

function ReservationModal() {
    let [value, setValue] = useState({
        name: "",
        day: "",
        school: "",
        grade: null,
        userNum: { 1: "", 2: "", 3: "" },
        parentsNum: { 1: "", 2: "", 3: "" },
        memo: "",
        진단평가학년1: null,
        진단평가학기1: null,
    });

    console.log(value);

    // 진당평가 선택 갯수 카운트
    let [count, setCount] = useState([]);

    const send = (e) => {
        e.preventDefault();
        console.log(value);
    };

    // 타임 피커 상태
    const [reservationPicker, setReservationPicker] = useState(false);
    // 타임 피커 선택 값
    const [reservationValue, setReservationValue] = useState();

    return (
        <div className="modal-bg">
            <div className="modal-content">
                <header className="fj">
                    <h4>진단평가 예약등록</h4>
                    <button className="btn">닫기</button>
                </header>
                <div className="modal-body">
                    <form onSubmit={send}>
                        <table>
                            <tbody>
                            <tr>
                                <td rowSpan={7}>예약자 정보</td>
                                <td>학생 이름*</td>
                                <td>
                                    <input
                                        type="text"
                                        value={value.name}
                                        className="form-control"
                                        onChange={(e) =>
                                            setValue({ ...value, name: e.target.value })
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>예약 일시*</td>
                                <td>
                                <div className="picker-group">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setReservationPicker(!reservationPicker);
                                        }}
                                    >
                                        예약피커
                                    </button>
                                    {reservationPicker && (
                                        <TimeDatePicker
                                            open={setReservationPicker}
                                            onChange={(day) => {
                                                setValue({ ...value, day: day })
                                                setReservationPicker(false);
                                            }}
                                        />
                                    )}
                                    value : {value.day}
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>학교</td>
                                <td>
                                <input
                                    type="text"
                                    value={value.school}
                                    className="form-control"
                                    onChange={(e) => setValue({ ...value, school: e.target.value })}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td>학년</td>
                                <td>
                                <SelectBase
                                    options={학년}
                                    value={value.grade}
                                    onChange={(ele) => setValue({ ...value, grade: ele })}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td>연락처*</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={3}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                userNum: { ...value.userNum, 1: e.target.value },
                                            });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={4}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                userNum: { ...value.userNum, 2: e.target.value },
                                            });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={4}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                userNum: { ...value.userNum, 3: e.target.value },
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>학부모 연락처</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={3}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                parentsNum: {
                                                    ...value.parentsNum,
                                                    1: e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={4}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                parentsNum: {
                                                    ...value.parentsNum,
                                                    2: e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength={4}
                                        onChange={(e) => {
                                            setValue({
                                                ...value,
                                                parentsNum: {
                                                    ...value.parentsNum,
                                                    3: e.target.value,
                                                },
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>메모</td>
                                <td>
                                    <textarea
                                        rows="10"
                                        onChange={(e) =>
                                            setValue({ ...value, memo: e.target.value })
                                        }
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={count.length + 1}>
                                    진단평가 선택
                                </td>
                                <td>
                                    <SelectBase
                                        defaultValue="학년"
                                        options={학년}
                                        value={value.진단평가학년1}
                                        onChange={(ele) => {
                                            setValue({
                                                ...value,
                                                진단평가학년1: ele,
                                            });
                                        }}
                                    />
                                    <SelectBase
                                        defaultValue="학기"
                                        options={학기}
                                        value={value.진단평가학기1}
                                        onChange={(ele) => {
                                            setValue({
                                                ...value,
                                                진단평가학기1: ele,
                                            });
                                        }}
                                    />
                                    {count.length === 0 && (
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                setCount([...count, 1]);
                                            }}
                                        >
                                            +
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {count.length !== 0 &&
                                count.map((a, i) => {
                                    return (
                                        <Fn
                                            setCount={setCount}
                                            count={count}
                                            index={i}
                                            value={value}
                                            setValue={setValue}
                                            key={i}
                                        />
                                    );
                                })}
                                </tbody>
                        </table>
                    </form>
                </div>
                        <button className="btn">전송</button>
            </div>
        </div>
    );
}

const Fn = memo(({ setCount, count, index, value, setValue }) => {
    const 학기 = ["1학기", "2학기"];

    return (
        <tr>
            <td>
                <SelectBase
                    defaultValue="학년"
                    options={학년}
                    value={value["진단평가학년" + (index + 2)]}
                    onChange={(ele) => setValue({ ...value, ["진단평가학년" + (index + 2)]: ele })}
                />
                <SelectBase
                    defaultValue="학기"
                    options={학기}
                    value={value["진단평가학기" + (index + 2)]}
                    onChange={(ele) => setValue({ ...value, ["진단평가학기" + (index + 2)]: ele })}
                />
                {count.length === index + 1 && (
                    <button
                        className="btn"
                        onClick={() => {
                            setCount([...count, 1]);
                        }}
                    >
                        +
                    </button>
                )}
            </td>
        </tr>
    );
});

export default ReservationModal;
