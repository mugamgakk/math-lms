import React from "react";
import { memo } from "react";
import { useState } from "react";
import TimeDatePicker from "../ComponentsPage/TimeDatePicker";
import SelectBase from "../../components/ui/select/SelectBase";
import ajax from "../../ajax";
import { useEffect } from "react";
import Icon from "../../components/Icon";
import { falseModal } from "../../methods/methods";

const 학년 = [
    { value: 2, label: "초등 2학년" },
    { value: 3, label: "초등 3학년" },
    { value: 4, label: "초등 4학년" },
    { value: 5, label: "초등 5학년" },
    { value: 6, label: "초등 6학년" },
    { value: 1, label: "중등 1학년" },
    { value: 2, label: "중등 2학년" },
    { value: 3, label: "중등 3학년" },
];

const 학기 = [
    { value: 1, label: "1학기" },
    { value: 2, label: "2학기" },
];

const arr = {
    dr_seq: 1243,
    dr_date: "2022.09.08. 14:00",
    dr_nm: "김일우",
    dr_std_phone: "010-1111-1111",
    dr_shool: "도곡중",
    dr_grade: 2,
    dr_selected: "중2-1",
    dr_recomm: "엑사스",
    dr_score: "90점",
};

function ReservationModal({ close, id }) {
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

    let [list, setList] = useState({});

    // 진당평가 선택 갯수 카운트
    let [count, setCount] = useState([]);

    const send = (e) => {
        e.preventDefault();
        console.log(value);
    };

    const getData = async () => {
        const data = {
            mode: "dr_detail",
            dr_seq: id,
        };

        try {
            let res = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(10);
                }, 1000);
            });

            setList(arr);
            // let res = ajax("leveltest.php", {data})
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // 타임 피커 상태
    const [reservationPicker, setReservationPicker] = useState(false);
    // 타임 피커 선택 값
    const [reservationValue, setReservationValue] = useState();

    return (
        <div
            className="modal ReservationModal-modal"
            onClick={(e) => {
                falseModal(e, close);
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">[진단 평가] 예약 등록</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            close(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">예약자 정보 입력</strong>
                    </div>

                    <div style={{ padding: "20px" }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>학생 이름*</td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "300px" }}
                                            value={list.dr_nm}
                                            className="textInput"
                                            onChange={(e) =>
                                                setValue({ ...value, name: e.target.value })
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>예약 일시*</td>
                                    <td>
                                        <input
                                            type="text"
                                            className="textInput mr-10"
                                            style={{ width: "300px" }}
                                        />
                                        {/* <div className="picker-group"> */}
                                            <button
                                                className="btn-grey-border btn-box mr-10"
                                                onClick={() => {
                                                    setReservationPicker(!reservationPicker);
                                                }}
                                            >
                                                <Icon icon={"calendar"} />
                                            </button>
                                            {/* {reservationPicker && (
                                                <TimeDatePicker
                                                    open={setReservationPicker}
                                                    onChange={(day) => {
                                                        setValue({ ...value, day: day });
                                                        setReservationPicker(false);
                                                    }}
                                                />
                                            )}
                                            value : {value.day} */}
                                        {/* </div> */}
                                        <strong className="text-alert">※ 당일 예약 불가</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>학교</td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "300px" }}
                                            value={value.school}
                                            className="textInput mr-10"
                                            onChange={(e) =>
                                                setValue({ ...value, school: e.target.value })
                                            }
                                        />
                                        <button type="button" className="btn-green btn-icon">
                                        <Icon icon={"search"} />검색
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>학년</td>
                                    <td>
                                        <SelectBase
                                            options={학년}
                                            value={value.grade}
                                            onChange={(ele) => setValue({ ...value, grade: ele })}
                                            width="200px"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>연락처*</td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={"010"}
                                            maxLength={3}
                                            onChange={(e) => {
                                                setValue({
                                                    ...value,
                                                    userNum: {
                                                        ...value.userNum,
                                                        1: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            maxLength={4}
                                            onChange={(e) => {
                                                setValue({
                                                    ...value,
                                                    userNum: {
                                                        ...value.userNum,
                                                        2: e.target.value,
                                                    },
                                                });
                                            }}
                                        />
                                        <span className="dash">-</span>

                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            maxLength={4}
                                            onChange={(e) => {
                                                setValue({
                                                    ...value,
                                                    userNum: {
                                                        ...value.userNum,
                                                        3: e.target.value,
                                                    },
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
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            maxLength={3}
                                            defaultValue="010"
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
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
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
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
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
                                            onChange={(e) =>
                                                setValue({ ...value, memo: e.target.value })
                                            }
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={count.length + 1}>진단평가 선택</td>
                                    <td>
                                        <SelectBase
                                            defaultValue="학년"
                                            options={학년}
                                            value={value.진단평가학년1}
                                            width="200px"
                                            className="mr-10"
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
                                            width="200px"
                                            className="mr-10"
                                            onChange={(ele) => {
                                                setValue({
                                                    ...value,
                                                    진단평가학기1: ele,
                                                });
                                            }}
                                        />
                                        {count.length === 0 && (
                                            <button
                                                className="btn-box"
                                                onClick={() => {
                                                    setCount([...count, 1]);
                                                }}
                                            >
                                                <Icon icon={"lnbDetail"} />
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
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey mr-20">취소</button>
                    <button className="btn-orange">예약 하기</button>
                </div>
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
                    width="100px"
                    onChange={(ele) => setValue({ ...value, ["진단평가학년" + (index + 2)]: ele })}
                />
                <SelectBase
                    defaultValue="학기"
                    options={학기}
                    value={value["진단평가학기" + (index + 2)]}
                    width="100px"
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
