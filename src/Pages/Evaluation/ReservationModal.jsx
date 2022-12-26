import React from "react";
import { memo } from "react";
import { useState } from "react";
import CustomDatePickerReservation from "../../components/CustomDatePickerReservation";
import SelectBase from "../../components/ui/select/SelectBase";
import ajax from "../../ajax";
import { useEffect } from "react";
import Icon from "../../components/Icon";

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

function ReservationModal({ close, id }) {
    let [userName, setUserName] = useState("");
    let [reservationDate, setReservationDate] = useState("");
    let [school, setSchool] = useState("");
    let [grade, setGrade] = useState(null);
    let [userCall, setUserCall] = useState(["010", "", ""]);
    let [pCall, setPcall] = useState(["010", "", ""]);
    let [comment, setComment] = useState("");
    let [hagnyeon, setHagnyeon] = useState([{ 학년: null, 학기: null }]);

    const getData = async () => {
        const data = {
            mode: "dr_detail",
            dr_seq: id,
        };

        let res = await ajax("/leveltest.php", {data});

        setUserName(res.data.dr_nm)
        setReservationDate(res.data.dr_date);
        setSchool(res.data.dr_shool);
        setGrade(Number(res.data.dr_grade) );
        setUserCall(res.data.dr_std_phone.split("-"));
        setPcall(res.data.dr_prt_phone.split("-"))
        setComment(res.data.dr_memo);
    };

    const plusJindanSelect = () => {
        let copy = [...hagnyeon];
        copy.push({ 학년: null, 학기: null });
        setHagnyeon(copy);
    };

    const updateJindanSelect = (ele, index) => {
        let copy = [...hagnyeon];
        copy[index] = { ...copy[index], ...ele };
        setHagnyeon(copy);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="modal ReservationModal-modal">
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
                                    <th>학생 이름*</th>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "300px" }}
                                            defaultValue={userName}
                                            className="textInput"
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>예약 일시*</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="textInput mr-10"
                                            defaultValue={reservationDate}
                                            style={{ width: "300px" }}
                                        />
                                        <CustomDatePickerReservation
                                            onChange={(e) => {
                                                setReservationDate(e);
                                            }}
                                        />
                                        <strong className="text-alert">※ 당일 예약 불가</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <th>학교</th>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "300px" }}
                                            defaultValue={school}
                                            className="textInput mr-10"
                                            onChange={(e) => setSchool(e.target.value)}
                                        />
                                        <button type="button" className="btn-green btn-icon">
                                            <Icon icon={"search"} />
                                            검색
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>학년</th>
                                    <td>
                                        <SelectBase
                                            options={학년}
                                            value={grade}
                                            onChange={(ele) => setGrade(ele)}
                                            width="200px"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>연락처*</th>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={userCall[0]}
                                            onChange={(e) => {
                                                let copy = [...userCall];
                                                copy[0] = e.target.value;
                                                setUserCall(copy);
                                            }}
                                        />
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={userCall[1]}
                                            onChange={(e) => {
                                                let copy = [...userCall];
                                                copy[1] = e.target.value;
                                                setUserCall(copy);
                                            }}
                                        />
                                        <span className="dash">-</span>

                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={userCall[2]}
                                            onChange={(e) => {
                                                let copy = [...userCall];
                                                copy[2] = e.target.value;
                                                setUserCall(copy);
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>학부모 연락처</th>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={pCall[0]}
                                            onChange={(e) => {
                                                let copy = [...pCall];
                                                copy[0] = e.target.value;
                                                setPcall(copy);
                                            }}
                                        />
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={pCall[1]}
                                            onChange={(e) => {
                                                let copy = [...pCall];
                                                copy[1] = e.target.value;
                                                setPcall(copy);
                                            }}
                                        />
                                        <span className="dash">-</span>
                                        <input
                                            type="text"
                                            style={{ width: "120px" }}
                                            className="textInput"
                                            defaultValue={pCall[2]}
                                            onChange={(e) => {
                                                let copy = [...pCall];
                                                copy[2] = e.target.value;
                                                setPcall(copy);
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>메모</th>
                                    <td>
                                        <textarea
                                            placeholder="500자 이하 작성"
                                            defaultValue={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <th rowSpan={hagnyeon.length}>진단평가 선택</th>
                                    <td>
                                        <SelectBase
                                            defaultValue="학년"
                                            options={학년}
                                            value={hagnyeon[0].학년}
                                            width="200px"
                                            className="mr-10"
                                            onChange={(ele) => {
                                                let copy = [...hagnyeon];
                                                copy[0].학년 = ele;
                                                setHagnyeon(copy);
                                            }}
                                        />
                                        <SelectBase
                                            defaultValue="학기"
                                            options={학기}
                                            value={hagnyeon[0].학기}
                                            width="200px"
                                            className="mr-10"
                                            onChange={(ele) => {
                                                let copy = [...hagnyeon];
                                                copy[0].학기 = ele;
                                                setHagnyeon(copy);
                                            }}
                                        />
                                        {hagnyeon.length === 1 && (
                                            <button className="btn-box" onClick={plusJindanSelect}>
                                                <Icon icon={"lnbDetail"} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                {hagnyeon.map((a, i) => {
                                    if (i !== 0) {
                                        return (
                                            <Fn
                                                updateJindanSelect={updateJindanSelect}
                                                plusJindanSelect={plusJindanSelect}
                                                ele={a}
                                                index={i}
                                                key={i}
                                                plus={i + 1 === hagnyeon.length}
                                            />
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-grey mr-20" onClick={()=>{ close(false) }}>취소</button>
                    <button className="btn-orange">예약 하기</button>
                </div>
            </div>
        </div>
    );
}

const Fn = memo(({ ele, plus, updateJindanSelect, plusJindanSelect, index }) => {
    const 학기 = [
        { value: 1, label: "1학기" },
        { value: 2, label: "2학기" },
    ];

    return (
        <tr>
            <td>
                <SelectBase
                    value={ele.학년}
                    defaultValue="학년"
                    options={학년}
                    width="200px"
                    className="mr-10"
                    onChange={(e) => {
                        updateJindanSelect({ 학년: e }, index);
                    }}
                />
                <SelectBase
                    value={ele.학기}
                    defaultValue="학기"
                    options={학기}
                    width="200px"
                    className="mr-10"
                    onChange={(e) => {
                        updateJindanSelect({ 학기: e }, index);
                    }}
                />
                {plus && (
                    <button
                        className="btn-box"
                        onClick={() => {
                            plusJindanSelect();
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
