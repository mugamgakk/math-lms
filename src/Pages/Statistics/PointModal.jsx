import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-date-picker";
import ajax from "../../ajax";
import Icon from "../../components/Icon";
import LmsDatePicker from "../../components/LmsDatePicker";
import SkeletonTable from "../../components/SkeletonTable";
import { comma } from "../../methods/methods";
import { falseModal } from "../../methods/methods";

const 오늘 = new Date();
const beforeOneMonth = dayjs(오늘).subtract(1, "M").$d;

function PointModal({ title, setModal, userId }) {
    let [startDay, setStartDay] = useState(beforeOneMonth);
    let [lastDay, setLastDay] = useState(오늘);

    let [list, setList] = useState(null);
    let [loading, setLoading] = useState(true);
    let [totalPoint, setTotalPoint] = useState({
        total_ct: 0,
        total_mi: 0,
        total_point: 0,
    });

    const getData = async () => {
        loading === false && setLoading(true);

        const url = "/point.php/";
        const params = {
            mode: "list_st",
            usr_seq: userId,
            sdate: dayjs(startDay).format("YYYY-MM-DD"),
            edate: dayjs(lastDay).format("YYYY-MM-DD"),
        };

        const res = await ajax(url, {
            data: params,
        });

        console.log(res);

        setList(res.data.list);

        let { total_ct, total_mi, total_point } = res.data;

        setTotalPoint({ total_ct, total_mi, total_point });

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="modal PointModal" onClick={(e)=>{ falseModal(e, setModal) }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">학습 포인트 내역</h2>
                    <button className="btn" onClick={()=>{setModal(false)}}>
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body p-3">
                    <div className="modal-name">
                        <strong className="name">강수학</strong>
                        <ul className="list">
                            <li>중2-1 노벰</li>
                        </ul>
                    </div>

                    <div className="PointModal-body">
                        <div className="fj">
                            <div></div>
                            <div className="d-flex">
                                <LmsDatePicker
                                    onChange={(day) => {
                                        setLastDay(day);
                                    }}
                                    value={lastDay}
                                    minDetail="month"
                                    style={{ marginRight: "5px" }}
                                />
                                <button
                                    className="btn-grey"
                                    style={{ maxWidth: "100px" }}
                                    onClick={getData}
                                >
                                    조회
                                </button>
                            </div>
                        </div>

                        <table>
                            <colgroup>
                                    <col style={{width : "25%"}}/>
                                    <col style={{width : "10%"}}/>
                                    <col style={{width : "20%"}}/>
                                    <col style={{width : "35%"}}/>
                                    <col style={{width : "10%"}}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>일시</th>
                                    <th>학년</th>
                                    <th>교재</th>
                                    <th>학습 내용</th>
                                    <th>포인트</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2022.08.31  15:15:15</td>
                                    <td>중1-1</td>
                                    <td>교과서별 내신적중</td>
                                    <td>교학사 Ⅰ- 1. 소인수분해</td>
                                    <td>
                                        <div className="carat"></div>
                                        <div className="mineral"></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>
                                        획득한 학습 포인트 : 점
                                    </td>
                                    <td>
                                        <div className="carat"></div>
                                        <div className="mineral"></div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-orange" onClick={()=>{setModal(false)}}>확인</button>
                </div>
            </div>
        </div>
    );
}

const AllItem = ({ item, index }) => {
    item === "미네랄"
        ? (item =
              "https://dictionary.cambridge.org/ko/images/thumb/diamon_noun_002_10599.jpg?version=5.0.252")
        : (item = "https://t1.daumcdn.net/cfile/blog/1303451B49BDDA6928");

    const result = [];
    for (let i = 0; i < index; i++) {
        result.push(<img key={i} width={"20px"} src={item} />);
    }

    return result;
};

export default PointModal;
