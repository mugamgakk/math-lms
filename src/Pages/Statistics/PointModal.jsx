import React, { useState } from "react";
import DatePicker from "react-date-picker";

const data = new Array(100).fill(1);

function PointModal({ title, setModal }) {
    let [startDay, setStartDay] = useState(new Date());
    let [lastDay, setLastDay] = useState(new Date());

    return (
        <div className="modal-bg">
            <div className="modal-content">
                <header className="fj">
                    <h4>[학습 포인트 내역 ] {title}</h4>
                    <button
                        className="btn"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        X
                    </button>
                </header>
                <div className="modal-body">
                    <div className="fj">
                        <div></div>
                        <div>
                            <DatePicker
                                className="datepicker-base"
                                clearIcon={null}
                                onChange={(day) => {
                                    setStartDay(day);
                                }}
                                value={startDay}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
                                minDetail="month"
                            />
                            <DatePicker
                                className="datepicker-base"
                                clearIcon={null}
                                onChange={(day) => {
                                    setLastDay(day);
                                }}
                                value={startDay}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
                                minDetail="month"
                            />
                            <button className="btn">조회</button>
                        </div>
                    </div>

                    <table>
                        <colgroup>
                            <col style={{ width: "263px" }} />
                            <col style={{ width: "250px" }} />
                            <col style={{ width: "190px" }} />
                            <col style={{ width: "auto" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>일시</th>
                                <th>교재</th>
                                <th>학습 내용</th>
                                <th>포인트</th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{overflow : "auto", maxHeight : "300px"}}>
                    <table>
                        <colgroup>
                            <col style={{ width: "263px" }} />
                            <col style={{ width: "70px" }} />
                            <col style={{ width: "180px" }} />
                            <col style={{ width: "190px" }} />
                            <col style={{ width: "auto" }} />
                        </colgroup>
                        <tbody>
                            {
                                data.map(a=>{
                                    return (
                                        <tr>
                                            <td>2022.08.31. 15:15:14</td>
                                            <td>중 1-1</td>
                                            <td>교과서별 내신적중</td>
                                            <td>교학사 소인수 분해</td>
                                            <td>다이아</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                    <table>
                        <colgroup>
                                <col style={{width : "513px"}} />
                                <col style={{width : "auto"}}/>
                        </colgroup>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>획득한 학습 포인트 : 145 점</td>
                                <td>미네랄 2 캐럿 12</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PointModal;
