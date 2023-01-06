import dayjs from "dayjs";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import CustomDatePickerMonth from "../../components/CustomDatePickerMonth";
import Icon from "../../components/Icon";
import SkeletonTable from "../../components/SkeletonTable";
import { comma, fetchData, _isScroll } from "../../methods/methods";

const 오늘 = new Date();

function PointModal({ title, setModal, userId }) {
    let [month, setMonth] = useState(오늘);
    let [scroll, setScroll] = useState(false);

    const dateFormat = useMemo(() => {
        let obj = {
            start: dayjs(month).format("YYYY-MM") + "-01",
        };

        let a = dayjs(month).format("YYYY-MM");
        let b = dayjs(new Date()).format("YYYY-MM");

        if (a === b) {
            obj.end = dayjs(new Date()).format("YYYY-MM-DD");
        } else {
            obj.end = dayjs(month).format("YYYY-MM") + "-" + dayjs(month).daysInMonth();
        }

        return obj;
    },[month]);

    const param = {
        mode: "list_st",
        usr_seq: userId,
        sdate: dateFormat.start,
        edate: dateFormat.end,
    };

    const pointList = useQuery("pointList", () => fetchData("point", param), {
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        setScroll(_isScroll("statistics-point-table", 440));
    });

    return (
        <div
            className="modal PointModal"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">학습 포인트 내역</h2>
                    <button
                        className="btn"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
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
                            <div className="fa">
                                <CustomDatePickerMonth
                                    value={month}
                                    onChange={e=> setMonth(e) }
                                    style={{minWidth : "120px"}}
                                    label={true}
                                    className="mr-10"
                                    maxDate={오늘}
                                />
                                <button
                                    className="btn-green btn-icon"
                                    style={{ width: "81px" }}
                                    onClick={()=>{
                                        pointList.refetch();
                                    }}
                                >
                                    <Icon icon={"search"} />
                                    조회
                                </button>
                            </div>
                        </div>

                        <table className="statistics-point-table custom-table">
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }}>일시</th>
                                    <th style={{ width: "10%" }}>학년</th>
                                    <th style={{ width: "20%" }}>교재</th>
                                    <th style={{ width: "35%" }}>학습 내용</th>
                                    <th style={{ width: "15%" }}>포인트</th>
                                    {scroll && <th style={{ width: "17px", border: "none" }}></th>}
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight: "440px" }}>
                                {pointList.isFetching ? (
                                    <SkeletonTable R={5} width={["20%", "10%", "20%", "35%", "15%"]} />
                                ) : (
                                    pointList.data?.list.map((a,i) => {
                                        return (
                                            <tr key={i}>
                                                <td style={{ width: "20%" }}>{a.date}</td>
                                                <td style={{ width: "10%" }}>{a.grade}</td>
                                                <td style={{ width: "20%" }}>{a.book}</td>
                                                <td style={{ width: "35%" }} className="t-start">
                                                    {a.title}
                                                </td>
                                                <td style={{ width: "15%" }}>
                                                    {a.ct > 0 && <div className="carat"></div>}
                                                    {a.mi > 0 && <div className="mineral"></div>}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td style={{ width: "85%" }}>
                                        획득한 학습 포인트 : {comma(pointList.data?.total_point ?? 0)} CP
                                    </td>
                                    <td style={{ width: "15%" }}>
                                        <div className="fa">
                                            <div className="carat"></div>
                                            {pointList.data?.total_ct}개
                                            <div
                                                className="mineral"
                                                style={{ marginLeft: "5px" }}
                                            ></div>
                                            {pointList.data?.total_mi}개
                                        </div>
                                    </td>
                                    {scroll && <td style={{ width: "17px", border: "none" }}></td>}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-orange"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PointModal;
