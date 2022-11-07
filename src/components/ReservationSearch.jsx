import React from "react";
import { useState } from "react";
import useReservationStore from "../store/useReservationStore";
import dayjs from "dayjs";
import ReservationModal from "../Pages/Evaluation/ReservationModal";
import LmsDatePicker from "./LmsDatePicker";
import ajax from "../ajax";
import { useEffect } from "react";

const arr = [
    {
        dr_seq : 1243,
        dr_date : "2022.09.08. 14:00",
        dr_nm : "김일우",
        dr_std_phone : "010-1111-1111",
        dr_shool : "도곡중",
        dr_grade : 2,
        dr_selected : "중2-1",
        dr_recomm : "엑사스",
        dr_score : "90점"
    }
]


function ReservationSearch() {
    const { user, choiceUser, choice } = useReservationStore((state) => state);
    let [reservationModal, setReservationModal] = useState(false);
    let [list, setList] = useState([]);
    let [value, setValue] = useState({
        start: dayjs(new Date()).subtract(1, "M").$d,
        end: new Date(),
        text: ""
    })


    // 예약일시 기준 , 오름차순 정렬
    user.sort((a, b) => {
        if (dayjs(a.date) < dayjs(b.date)) {
            return -1;
        } else {
            return 1;
        }
    });

    const levelTestData = async () => {
        const data = {
            mode: "dt_list",
            sdate: dayjs(value.start).format("YYYY-MM-DD"),
            edate: dayjs(value.start).format("YYYY-MM-DD"),
            qstr: "박",
            kind: "RV"
        }
        try {
            let res = await new Promise((resolve, reject)=>{ setTimeout(()=>{resolve(10)},1000) })
            // let res = await ajax("leveltest.php", { data });

            setList(arr)


        } catch (err) {

        }
    }

    useEffect(() => {
        levelTestData()
    }, [])

    return (
        <div className="bg col-4 mr-3">
            <div className="row mb-2">
                <div className="col-6 pr-2">
                    <LmsDatePicker
                        width="100%"
                        onChange={day => setValue({ ...value, start: day })}
                        value={value.start}
                    />
                </div>
                <div className="col-6 pl-2">
                    <LmsDatePicker
                        width="100%"
                        onChange={day => setValue({ ...value, end: day })}
                        value={value.end}
                    />
                </div>
            </div>
            <div className="d-flex mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={value.text}
                    placeholder="이름 검색"
                    onChange={e => setValue({ ...value, text: e.target.value })}
                    style={{ width: "200px" }}
                />
                <button className="btn">
                    예약자 조회
                </button>
            </div>

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
                    {
                        list.map((ele,i)=>{
                            return <Tr ele={ele} key={"key"+i} />
                        })
                    }
                </tbody>
            </table>
            {
                reservationModal && <ReservationModal close={setReservationModal} />
            }

            <button className="btn" onClick={() => { setReservationModal(true) }} >진단평가 예약</button>
        </div>
    );
}


const Tr = ({ele})=>{
    let [modal, setModal] = useState(false);
    return (
        <tr>
            <td>{ele.dr_nm}</td>
            <td>{ele.dr_date}</td>
            <td>{ele.dr_std_phone}</td>
            <td>
                {
                    modal && <ReservationModal close={setModal} id={ele.dr_seq}/>
                }
                <button className="btn" onClick={()=>{setModal(true)}}>보기</button>
            </td>
        </tr>
    )
}

export default ReservationSearch;
