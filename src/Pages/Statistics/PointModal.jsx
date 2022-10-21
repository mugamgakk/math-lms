import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-date-picker";
import ajax from "../../ajax";
import LmsDatePicker from "../../components/LmsDatePicker";
import SkeletonTable from "../../components/SkeletonTable";
import { comma } from "../../methods/methods";


const 오늘  = new Date();
const beforeOneMonth = dayjs(오늘).subtract(1, "M").$d;

function PointModal({ title, setModal, userId }) {
    let [startDay, setStartDay] = useState(beforeOneMonth);
    let [lastDay, setLastDay] = useState(오늘);

    let [list, setList] = useState(null);
    let [loading, setLoading] = useState(true);
    let [totalPoint, setTotalPoint] = useState({
        total_ct : 0,
        total_mi : 0,
        total_point : 0
    })

    const getData = async ()=>{
        loading === false && setLoading(true);

        const url = "/point.php/";
        const params = {
            mode : "list_st",
            usr_seq : userId,
            sdate : dayjs(startDay).format("YYYY-MM-DD"),
            edate : dayjs(lastDay).format("YYYY-MM-DD")
        }

        const res = await ajax(url, {
            data : params
        })

        // console.log(res);

        setList(res.data.list);

        let {total_ct, total_mi, total_point} = res.data;

        setTotalPoint({total_ct, total_mi, total_point});

        setLoading(false)
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className="modal">
            
            <div className="modal-content">
            <header className="modal-header fj">
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
                <div className="modal-body p-3">
                    <div className="fj mb-3">
                        <div></div>
                        <div className="d-flex">
                            <LmsDatePicker
                                onChange={(day) => {
                                    setStartDay(day);
                                }}
                                value={startDay}
                                minDetail="month"
                            />

                            <LmsDatePicker
                                onChange={(day) => {
                                    setLastDay(day);
                                }}
                                value={lastDay}
                                minDetail="month"
                            />
                            <button className="btn" onClick={getData}>조회</button>
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
                            loading && <SkeletonTable R={10} D={5}/>
                        }
                            
                            {
                               !loading && list?.map((a,i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{a.date}</td>
                                            <td>{a.grade}</td>
                                            <td>{a.book}</td>
                                            <td>{a.title}</td>
                                            <td>
                                                <AllItem item="미네랄" index={a.mi} />
                                                <AllItem item="캐럿" index={a.ct} />
                                            </td>
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
                                <td colSpan={4}>획득한 학습 포인트 : {comma(totalPoint.total_point)} 점</td>
                                <td>미네랄 : {totalPoint.total_mi} 개 캐럿 : {totalPoint.total_ct} 개</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

const AllItem = ({item, index})=>{

    item === "미네랄"
    ? item = "https://dictionary.cambridge.org/ko/images/thumb/diamon_noun_002_10599.jpg?version=5.0.252"
    : item = "https://t1.daumcdn.net/cfile/blog/1303451B49BDDA6928"

    const result = []
    for(let i = 0; i < index; i++){
        result.push(<img key={i} width={"20px"} src={item} />)
    }

    return result
}

export default PointModal;
