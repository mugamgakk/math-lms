import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-date-picker";
import FadeLoader from "react-spinners/FadeLoader";

const override = {
    display : "block",
    margin : "100px auto"
}

const 오늘  = new Date();
const beforeOneMonth = dayjs(오늘).subtract(1, "M").$d;

console.log(beforeOneMonth)
function PointModal({ title, setModal }) {
    let [startDay, setStartDay] = useState(beforeOneMonth);
    let [lastDay, setLastDay] = useState(오늘);
    let [list, setList] = useState(null);
    let [loading, setLoading] = useState(true);

    const getData = async ()=>{
        loading === false && setLoading(true);
        let 시작날짜 = dayjs(startDay).format('YYYY/MM/DD')
        let 끝날짜 = dayjs(lastDay).format('YYYY/MM/DD')
        let url = "/point/detail/?name=강호동&start="+ 시작날짜 +"&end=" + 끝날짜
        let res = await axios.get(url);

        setList(res.data)
        setLoading(false)
    }

    useEffect(()=>{
        getData()
    },[])

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
                                value={lastDay}
                                openCalendarOnFocus={false}
                                format={"yyyy-MM-dd"}
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
                    {
                        <FadeLoader color={"#ccc"} loading={loading} cssOverride={override} size={150} />
                    }
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
                               !loading && list?.map((a,i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{a.일시}</td>
                                            <td>중 1-1</td>
                                            <td>{a.교재}</td>
                                            <td>{a.학습내용}</td>
                                            <td>
                                                {
                                                    "미네랄" in a.포인트
                                                    ? <Dog item="미네랄" index={a.포인트.미네랄} />
                                                    : <Dog item="캐럿" index={a.포인트.캐럿} />
                                                }
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

const Dog = ({item, index})=>{

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
