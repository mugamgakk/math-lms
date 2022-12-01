import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LmsDatePicker from "../../components/LmsDatePicker";
import jindanStore from "../../store/jindanStore";
import ReservationModal from "./ReservationModal";

function JinDanSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const resetJindan = jindanStore(state=>state.resetJindan);

    let [reservModal, setReservModal] = useState(false);
    let [list, setList] = useState(null);
    
    useEffect(() => {
        axios.post("http://localhost:8080/reserv").then((res) => {
            console.log(res)
            setList(res.data.list);
        });

        resetJindan();
    },[]);

    return (
        <>
        {
            reservModal && <ReservationModal close={setReservModal}/>
        }
        

        <div className="bg bg-list JinDanSearch">
            <header className="JinDanSearch-header" style={{ marginBottom: "10px" }}>
                <h4>평가 관리</h4>
                <ul className="content-tabs2">
                    <li
                        onClick={() => {
                            navigate("/evaluation/routine");
                        }}
                        className={`${location.pathname.includes("routine") ? "active" : ""}`}
                    >
                        재원생 정기평가
                    </li>
                    <li
                        onClick={() => {
                            navigate("/evaluation/jindan");
                        }}
                        className={`${location.pathname.includes("jindan") ? "active" : ""}`}
                    >
                        진단평가
                    </li>
                </ul>
            </header>
            <div style={{ marginBottom: "10px" }}>
                <LmsDatePicker style={{ width: "146px" }} />
                <span className="water">~</span>
                <LmsDatePicker style={{ width: "146px" }} />
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
                <tbody style={{maxHeight : "522px"}}>
                    {list?.map((a,i) => {
                        return <Tr ele={a} key={i}/>;
                    })}
                </tbody>
            </table>
            <div className="text-center" style={{marginTop : "20px"}}>
                <button className="btn-grey" onClick={()=>{setReservModal(true)}}>진단평가 예약</button>
            </div>
        </div>
        </>
    );
}

const Tr = ({ele}) => {
    const {jindanStudent,setJindanStudent} = jindanStore();
    
    return (
        <tr className={`${jindanStudent?.이름 === ele.이름 ? "active" : ""}`}>
            <td style={{ width: "15%" }} onClick={()=>{setJindanStudent(ele)}}>{ele.이름}</td>
            <td style={{ width: "42%" }}>{ele.예약일시}</td>
            <td style={{ width: "33%" }}>{ele.연락처}</td>
            <td style={{ width: "20%" }}>
                <button className="btn-table" style={{ minWidth: "50px" }}>
                    보기
                </button>
            </td>
        </tr>
    );
};

export default JinDanSearch;
