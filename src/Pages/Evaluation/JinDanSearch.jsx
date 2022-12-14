import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDatePicker from "../../components/CustomDatePicker";
import jindanStore from "../../store/jindanStore";
import ReservationModal from "./ReservationModal";

function JinDanSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const resetJindan = jindanStore((state) => state.resetJindan);

    let [reservModal, setReservModal] = useState(false);
    let [list, setList] = useState(null);

    const getList = async () => {
        let res = await axios("/json/jindan.json");

        setList(res.data);
    };

    useEffect(() => {
        getList();
        resetJindan();
    }, []);

    return (
        <>
            {reservModal && <ReservationModal close={setReservModal} />}

            <div className="bg bg-list JinDanSearch">
                <header className="student-list-header" style={{ marginBottom: "10px" }}>
                    <div className="student-list-tab">
                        <ul>
                            <li
                                onClick={() => {
                                    navigate("/evaluation/routine");
                                }}
                            >
                                재원생 정기평가
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/evaluation/jindan");
                                }}
                                className={`active`}
                            >
                                진단평가
                            </li>
                        </ul>
                    </div>
                </header>
                <div style={{ marginBottom: "10px" }} className="fa">
                    <CustomDatePicker label={true} />
                    <span className="water">~</span>
                    <CustomDatePicker label={true} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        className="textInput mr-10"
                        placeholder="학생명을 입력하세요"
                        style={{ width: "calc(100% - 110px)" }}
                    />
                    <button className="btn-green" style={{ minWidth: "100px" }}>
                        예약자 조회
                    </button>
                </div>

                <table className="table tableB">
                    <thead>
                        <tr className="active">
                            <th style={{ width: "15%" }}>이름</th>
                            <th style={{ width: "42%" }}>예약 일시</th>
                            <th style={{ width: "33%" }}>연락처</th>
                            <th style={{ width: "20%" }}>보기</th>
                        </tr>
                    </thead>
                    <tbody style={{ maxHeight: "517px" }}>
                        {list?.map((a, i) => {
                            return <Tr ele={a} key={i} />;
                        })}
                    </tbody>
                </table>
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <button
                        className="btn-grey"
                        onClick={() => {
                            setReservModal(true);
                        }}
                    >
                        진단평가 예약
                    </button>
                </div>
            </div>
        </>
    );
}

const Tr = ({ ele }) => {
    const { jindanStudent, setJindanStudent } = jindanStore();
    let [modal, setModal] = useState(false);

    return (
        <tr className={`${jindanStudent?.이름 === ele.이름 ? "active" : ""}`}>
            <td
                style={{ width: "15%" }}
                onClick={() => {
                    setJindanStudent(ele);
                }}
            >
                {ele.이름}
            </td>
            <td style={{ width: "42%" }}>{ele.예약일시}</td>
            <td style={{ width: "33%" }}>{ele.연락처}</td>
            <td style={{ width: "20%" }}>
                {modal && <ReservationModal close={setModal} />}
                <button
                    className="btn-table"
                    style={{ minWidth: "50px" }}
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    보기
                </button>
            </td>
        </tr>
    );
};

export default JinDanSearch;
