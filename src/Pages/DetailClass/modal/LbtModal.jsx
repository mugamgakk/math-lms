import React, { useState, useRef } from "react";
import LbtCheckbox from "../LbtCheckbox";
import useLbtStore from "../../../store/useLbtStore";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import { useEffect } from "react";
import ajax from "../../../ajax";
import logo from "../../../assets/img/parallax-logo.png";
import dayjs from "dayjs";
import { arrSort, _cloneDeep } from "../../../methods/methods";

const { $y: todayYear, $M: todayMonth } = dayjs(new Date());
const 산출시점 = dayjs(new Date()).format("YYYY.MM.DD");
const paramList = [
    "lec_stat",
    "lec_assa",
    "an_act",
    "an_con",
    "plus_ct",
    "plus_tb",
    "an_ut",
    "an_bt",
    "attd_stat",
    "an_online",
    "point",
    "attd_eval",
    "tch_comm",
    "art_an",
];

function LbtModal({ setCreateModal, sendLBTData }) {
    const dataLists = useLbtStore((state) => state.dataLists);
    const checkedList = useLbtStore((state) => state.checkedList);
    const allCheckfnL = useLbtStore((state) => state.allCheckfnL);

    const startFormat = dayjs(sendLBTData.startDay);
    const endFormat = dayjs(sendLBTData.endDay);

    // ui
    let [viewItem, setViewItem] = useState(null);
    let [lbtData, setLbtData] = useState(null);

    // 그래프
    let canvas1 = useRef();
    let canvas2 = useRef();

    const getRegult = async () => {
        const data = createDataParam();

        // console.log(data);

        let res = await ajax("/class_result.php", { data });
        // console.log(res.data.lec_assa[0].unit2[0])
        render(res.data);
    };

    //
    const createAnalytics = async () => {
        const data = {
            mode: "set_analytics",
            sdate: dayjs(sendLBTData.startDay).format("YYYY-MM-DD"),
            edate: dayjs(sendLBTData.endDay).format("YYYY-MM-DD"),
        };
        data.arr_bk_cd = sendLBTData.checkList.map((a) => a.bk_cd);
        // console.log(data);
        const res = await ajax("/class_result.php", { data });

        setCreateModal(false);
        // console.log(res)
    };

    const createDataParam = () => {
        let obj = { arr_bk_cd: [] };
        for (let ele of checkedList) {
            ele.optionItem.forEach((a) => {
                obj[a.value] = 1;
            });
        }

        paramList.forEach((a) => {
            if (a in obj) {
                // console.log(a);
            } else {
                obj[a] = 0;
            }
        });

        sendLBTData.checkList.forEach((a) => {
            obj.arr_bk_cd.push(a.bk_cd);
        });

        obj.mode = "get_analytics_tot";
        obj.avg = 1;
        obj.sdate = dayjs(sendLBTData.startDay).format("YYYY-MM-DD");
        obj.edate = dayjs(sendLBTData.endDay).format("YYYY-MM-DD");

        return obj;
    };

    const render = (data) => {
        setLbtData(data);

        setViewItem(checkedList);
        setTimeout(() => {
            let { calc, fig, sol, und } = data.an_act;
            let 계산력 = calc[2].replace("%", "");
            let 추론력 = fig[2].replace("%", "");
            let 문제해결력 = sol[2].replace("%", "");
            let 이해력 = und[2].replace("%", "");
            // 행동영역 분석
            draw1(계산력, 이해력, 추론력, 문제해결력);

            let arr = [];
            data.an_bt.forEach((a) => {
                arr.push(a.graph);
            });

            // 총괄평가 분석
            draw2(...arr, arr.length);
        }, 200);
    };

    const isAllCheck = () => {
        let result1 = 0;
        let result2 = 0;
        dataLists.forEach((a) => {
            result1 += a.optionItem.length;
        });
        checkedList.forEach((a) => {
            result2 += a.optionItem.length;
        });

        return result1 === result2;
    };

    const draw1 = (위 = 0, 우 = 0, 아래 = 0, 좌 = 0) => {
        const ctx = canvas1.current.getContext("2d");
        // 초기화
        ctx.clearRect(0, 0, canvas1.current.width, canvas1.current.height);
        ctx.beginPath();
        ctx.moveTo(100, 10);
        ctx.lineTo(190, 100);
        ctx.lineTo(100, 190);
        ctx.lineTo(10, 100);
        ctx.lineTo(100, 10);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ccc";
        ctx.stroke();

        ctx.fillStyle = "rgba(256,256,256,0.1)";
        ctx.fill();

        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            ctx.moveTo(100, 10 + 20 * i);
            ctx.lineTo(190 - 20 * i, 100);
            ctx.lineTo(100, 190 - 20 * i);
            ctx.lineTo(10 + 20 * i, 100);
            ctx.lineTo(100, 10 + 20 * i);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#ccc";
            ctx.stroke();
        }

        // 영역
        ctx.beginPath();
        // 위
        ctx.moveTo(100, 200 - (100 + 위 / 1.11111111));
        ctx.lineTo(100 + 우 / 1.11111111, 100);
        ctx.lineTo(100, 100 + 아래 / 1.11111111);
        ctx.lineTo(200 - (100 + 좌 / 1.11111111), 100);
        ctx.lineTo(100, 200 - (100 + 위 / 1.11111111));

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ea7851";
        ctx.stroke();

        ctx.fillStyle = "#ea77512f";
        ctx.fill();

        class Text {
            constructor(text, x, y) {
                this.text = text;
                this.x = x;
                this.y = y;
            }

            make() {
                ctx.font = "10px Pretendard";
                ctx.fillStyle = "#444";
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        let font1 = new Text("100", 92, 8);
        font1.make();
        let font2 = new Text("75", 95, 28);
        font2.make();
        let font3 = new Text("50", 95, 48);
        font3.make();
        let font4 = new Text("25", 95, 67);
        font4.make();
        let font5 = new Text("0", 96, 90);
        font5.make();

        // 위 사각형
        ctx.fillStyle = "#ea7851";
        ctx.fillRect(97, 197 - (100 + 위 / 1.11111111), 7, 7);
        // 우
        ctx.fillStyle = "#ea7851";
        ctx.fillRect(95 + 우 / 1.11111111, 95, 7, 7);
        // 아래
        ctx.fillStyle = "#ea7851";
        ctx.fillRect(97, 95 + 아래 / 1.11111111, 7, 7);
        // 좌
        ctx.fillStyle = "#ea7851";
        ctx.fillRect(195 - (100 + 좌 / 1.11111111), 95, 7, 7);
    };

    const draw2 = (...rest) => {
        const ctx = canvas2.current.getContext("2d");
        // 초기화
        ctx.clearRect(0, 0, canvas2.current.width, canvas2.current.height);

        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(240, 95 - 16.66666 * i);
            ctx.lineTo(20, 95 - 16.66666 * i);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#ccc";
            ctx.setLineDash([0]);
            ctx.stroke();
        }

        ctx.font = "10px Pretendard";
        ctx.fillStyle = "#444";
        ctx.fillText("0점", 5, 100);
        ctx.fillText("20점", 0, 83);
        ctx.fillText("40점", 0, 65);
        ctx.fillText("60점", 0, 48);
        ctx.fillText("80점", 0, 33);
        ctx.fillText("100점", 0, 15);

        let location = [
            [25, 39],
            [80, 94],
            [130, 144],
            [180, 194],
        ];

        let dataLeg = rest.pop() - 1;

        // 막대 그러주기

        if (Array.isArray(rest[0])) {
            ctx.fillStyle = "#ea7851";
            // 성취도
            ctx.fillRect(25, 95 - rest[0][0] / 1.17647, 14, rest[0][0] / 1.17647);
            ctx.fillStyle = "#c41b09";
            // 성취도 평균
            ctx.fillRect(39, 95 - rest[0][1] / 1.17647, 14, rest[0][1] / 1.17647);
        }
        if (Array.isArray(rest[1])) {
            ctx.fillStyle = "#ea7851";
            ctx.fillRect(80, 95 - rest[1][0] / 1.17647, 14, rest[1][0] / 1.17647);
            ctx.fillStyle = "#c41b09";
            ctx.fillRect(94, 95 - rest[1][1] / 1.17647, 14, rest[1][1] / 1.17647);
        }
        if (Array.isArray(rest[2])) {
            ctx.fillStyle = "#ea7851";
            ctx.fillRect(130, 95 - rest[2][0] / 1.17647, 14, rest[2][0] / 1.17647);
            ctx.fillStyle = "#c41b09";
            ctx.fillRect(144, 95 - rest[2][1] / 1.17647, 14, rest[2][1] / 1.17647);
        }
        if (Array.isArray(rest[3])) {
            ctx.fillStyle = "#ea7851";
            ctx.fillRect(180, 95 - rest[3][0] / 1.17647, 14, rest[3][0] / 1.17647);
            ctx.fillStyle = "#c41b09";
            ctx.fillRect(194, 95 - rest[3][1] / 1.17647, 14, rest[3][1] / 1.17647);
        }

        // 점선 그려주기
        ctx.beginPath();
        ctx.moveTo(28, 92 - rest[0][0] / 1.17647);
        ctx.lineTo(location[dataLeg][1] - 4, 92 - rest[dataLeg][0] / 1.17647);
        ctx.setLineDash([4]); // 간격이 20인 점선 설정
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
    };

    useEffect(() => {
        // 첫 로드시 모두체크
        allCheckfnL(true);
        getRegult();
    }, []);

    return (
        <div className="modal LbtModal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">종합 학습 분석표 생성</h4>
                    <button
                        className="btn"
                        onClick={() => {
                            setCreateModal(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="LbtModal-body">
                        <div className="left">
                            <div className="head">
                                <span style={{ marginRight: "12px" }}>※ 평균 표시</span>{" "}
                                <span className="fa">
                                    {" "}
                                    ( <span className="head-y">Y</span>
                                    <span className="head-n">N </span> ){" "}
                                </span>
                            </div>
                            <div className="body">
                                <div className="part">
                                    <div className="part-title">
                                        <Checkbox
                                            color="orange"
                                            id="all"
                                            checked={isAllCheck()}
                                            onChange={(e) => {
                                                allCheckfnL(e.target.checked);
                                            }}
                                        />
                                        <label htmlFor="all">모두 선택 / 해제</label>
                                    </div>
                                </div>
                                {dataLists.map((a, i) => {
                                    return (
                                        <LbtCheckbox ele={a} key={i} checkedItem={checkedList[i]} />
                                    );
                                })}
                                <div className="text-center">
                                    <button
                                        className="btn-grey-border"
                                        style={{ minWidth: "100px" }}
                                        onClick={() => {
                                            getRegult();
                                        }}
                                    >
                                        적용
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="right lbt-print">
                            <div className="head">
                                <span className="mr-10">사유하고 질문하라.</span>
                                Parallax Thingking!
                            </div>
                            <div className="body">
                                <div className="body-title fj">
                                    <h3>
                                        {todayYear}년 {todayMonth + 1}월 강수학의 패럴랙스 수학{" "}
                                        <span className="text-orange">종합 학습 분석표</span>
                                    </h3>
                                    <img src={logo} alt="" />
                                </div>

                                <table className="lbt-table" style={{ marginBottom: "20px" }}>
                                    <colgroup>
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>이름</th>
                                            <td>{sendLBTData.clickStudent.um_nm}</td>
                                            <th>학년</th>
                                            <td>{sendLBTData.clickStudent.school_grade}</td>
                                            <th>학습기간</th>
                                            <td>
                                                {`${startFormat.$y}년 ${
                                                    startFormat.$M < 10
                                                        ? "0" + (startFormat.$M + 1)
                                                        : startFormat.$M + 1
                                                }월 ${
                                                    startFormat.$D < 10
                                                        ? "0" + startFormat.$D
                                                        : startFormat.$D
                                                }일 ~ `}
                                                {`${endFormat.$y}년 ${
                                                    endFormat.$M < 10
                                                        ? "0" + (endFormat.$M + 1)
                                                        : endFormat.$M + 1
                                                }월 ${
                                                    endFormat.$D < 10
                                                        ? "0" + endFormat.$D
                                                        : endFormat.$D
                                                }일`}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>학습 교재</th>
                                            <td className="text-left" colSpan={5}>
                                                {sendLBTData.checkList
                                                    .map((a) => a.bk_name)
                                                    .join(",")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* 교재 학습 분석 */}
                                {viewItem && viewItem[0].optionItem.length > 0 ? (
                                    <section className="lbt-content">
                                        <h4 className="lbt-content-title">
                                            <Icon icon={"lbt1"} />
                                            {viewItem[0].option}
                                        </h4>

                                        {viewItem[0].optionItem.some(
                                            (a) => a.label === "단원 학습 현황"
                                        ) && (
                                            <>
                                                <h5 className="lbt-content-sub-title">
                                                    단원 학습 현황
                                                </h5>
                                                <table
                                                    className="lbt-table lbt-table1"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <th>교재 학습 문항 수</th>
                                                            <td>
                                                                {lbtData?.lec_stat.unit_tot} 문항
                                                            </td>
                                                            <th>맞힌 문항 수</th>
                                                            <td>
                                                                {lbtData?.lec_stat.unit_crt} 문항
                                                            </td>
                                                            <th>정답률</th>
                                                            <td>{lbtData?.lec_stat.unit_per}%</td>
                                                        </tr>
                                                        <tr>
                                                            <th>클리닉 학습 문항 수</th>
                                                            <td>
                                                                {lbtData?.lec_stat.clinic_tot} 문항
                                                            </td>
                                                            <th>맞힌 문항 수</th>
                                                            <td>
                                                                {lbtData?.lec_stat.clinic_crt} 문항
                                                            </td>
                                                            <th>정답률</th>
                                                            <td>{lbtData?.lec_stat.clinic_per}%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </>
                                        )}
                                        {viewItem[0].optionItem.some(
                                            (a) => a.label === "단원별 정답률 및 향상도/수행평가"
                                        ) && (
                                            <>
                                                <div className="fe d-flex legend1">
                                                    <div className="yellow">개념 학습</div>
                                                    <div className="blue">유형 학습</div>
                                                    <div className="red">맞춤 클리닉 향상</div>
                                                </div>
                                                <table
                                                    className="lbt-table lbt-table1"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <colgroup>
                                                        <col style={{ width: "100px" }} />
                                                        <col style={{ width: "auto" }} />
                                                        <col style={{ width: "150px" }} />
                                                        <col style={{ width: "70px" }} />
                                                        <col style={{ width: "70px" }} />
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={3}>
                                                                단원별 정답률 및 향상도
                                                            </th>
                                                            <th colSpan={2}>수행 평가</th>
                                                        </tr>
                                                        <tr>
                                                            <th>단원명</th>
                                                            <th>소단원명</th>
                                                            <th>정답률 및 향상도</th>
                                                            <th>이해력</th>
                                                            <th>전달력</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lbtData?.lec_assa.map((a, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{a.unit1}</td>
                                                                    <td
                                                                        className="text-right"
                                                                        style={{
                                                                            verticalAlign: "top",
                                                                            paddingTop: "5px",
                                                                            paddingRight: "5px",
                                                                        }}
                                                                    >
                                                                        {a.unit2.map((s, i) => {
                                                                            return (
                                                                                <div key={i}>
                                                                                    {" "}
                                                                                    {s.title}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </td>
                                                                    <td style={{ padding: "0" }}>
                                                                        <div>
                                                                            <div
                                                                                className="bg-area-wrap"
                                                                                style={{
                                                                                    height: `${
                                                                                        30 +
                                                                                        15 *
                                                                                            a.unit2
                                                                                                .length
                                                                                    }px`,
                                                                                }}
                                                                            >
                                                                                {a.unit2.map(
                                                                                    (s, i) => {
                                                                                        return (
                                                                                            <div
                                                                                                className="area-list"
                                                                                                key={
                                                                                                    i
                                                                                                }
                                                                                            >
                                                                                                <div
                                                                                                    className="area-list-item"
                                                                                                    style={{
                                                                                                        width: `${s.co}%`,
                                                                                                    }}
                                                                                                ></div>
                                                                                                <div
                                                                                                    className="area-list-item"
                                                                                                    style={{
                                                                                                        width: `${s.pa_tr[0]}%`,
                                                                                                    }}
                                                                                                >
                                                                                                    <div
                                                                                                        className="area-list-item-clinic"
                                                                                                        style={{
                                                                                                            width: `${s.pa_tr[1]}%`,
                                                                                                        }}
                                                                                                    ></div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="area-list-item"
                                                                                                    style={{
                                                                                                        width: `${s.pa_he[0]}%`,
                                                                                                    }}
                                                                                                >
                                                                                                    <div
                                                                                                        className="area-list-item-clinic"
                                                                                                        style={{
                                                                                                            width: `${s.pa_he[1]}%`,
                                                                                                        }}
                                                                                                    ></div>
                                                                                                </div>
                                                                                                <div
                                                                                                    className="area-list-item"
                                                                                                    style={{
                                                                                                        width: `${s.pa_no[0]}%`,
                                                                                                    }}
                                                                                                >
                                                                                                    <div
                                                                                                        className="area-list-item-clinic"
                                                                                                        style={{
                                                                                                            width: `${s.pa_no[1]}%`,
                                                                                                        }}
                                                                                                    ></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}

                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            verticalAlign: "top",
                                                                            paddingTop: "5px",
                                                                        }}
                                                                    >
                                                                        {a.unit2.map((s, i) => {
                                                                            return (
                                                                                <div key={i}>
                                                                                    {s.und}점
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            verticalAlign: "top",
                                                                            paddingTop: "5px",
                                                                        }}
                                                                    >
                                                                        {a.unit2.map((s, i) => {
                                                                            return (
                                                                                <div key={i}>
                                                                                    {s.send}점
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </>
                                        )}
                                        {viewItem[0].optionItem.some(
                                            (a) => a.label === "행동 영역 분석"
                                        ) && (
                                            <>
                                                <h5 className="lbt-content-sub-title">
                                                    행동 영역 분석
                                                </h5>
                                                <div
                                                    className="d-flex"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <div style={{ width: "60%" }}>
                                                        <table className="lbt-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>행동영역</th>
                                                                    <th>문항 수</th>
                                                                    <th>맞힌 문항 수</th>
                                                                    <th>성취도</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>계산력</td>
                                                                    <td>
                                                                        {lbtData?.an_act.calc[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.calc[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.calc[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>이해력</td>
                                                                    <td>
                                                                        {lbtData?.an_act.und[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.und[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.und[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>추론력</td>
                                                                    <td>
                                                                        {lbtData?.an_act.fig[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.fig[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.fig[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>문제해결력</td>
                                                                    <td>
                                                                        {lbtData?.an_act.sol[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.sol[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_act.sol[2]}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <p className="info1">
                                                            <strong>계산력</strong> 수학 개념과
                                                            성질을 이해하고 단순 계산에 적용하는
                                                            능력 <br />
                                                            <strong>이해력</strong> 수학적 표현을
                                                            이해하거나 상황을 수학적으로 표현하는
                                                            능력 <br />
                                                            <strong>추론력</strong> 문제상황에서
                                                            수학 법칙을 찾아내거나 참, 거짓을
                                                            판별하는 능력 <br />
                                                            <strong>문제해결력</strong> 두 가지
                                                            이상의 수학 개념이 포함되거나 두 단계
                                                            이상의 사고 과정이 필요한 문제를
                                                            해결하는 능력 <br />
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{ width: "40%" }}
                                                        className="lbt-graph1"
                                                    >
                                                        <span className="item1">계산력</span>
                                                        <span className="item2">이해력</span>
                                                        <span className="item3">추론력</span>
                                                        <span className="item4">
                                                            문제 <br />
                                                            해결력
                                                        </span>
                                                        <canvas
                                                            width={200}
                                                            height={200}
                                                            ref={canvas1}
                                                        ></canvas>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {viewItem[0].optionItem.some(
                                            (a) => a.label === "내용 영역 분석"
                                        ) && (
                                            <>
                                                <div
                                                    className="fa-end"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <div style={{ width: "60%" }}>
                                                        <h5 className="lbt-content-sub-title">
                                                            내용 영역 분석
                                                        </h5>
                                                        <table className="lbt-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>내용영역</th>
                                                                    <th>문항 수</th>
                                                                    <th>맞힌 문항 수</th>
                                                                    <th>성취도</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>수와 연산</td>
                                                                    <td>
                                                                        {lbtData?.an_con.num[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.num[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.num[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>기하</td>
                                                                    <td>
                                                                        {lbtData?.an_con.shape[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.shape[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.shape[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>측정</td>
                                                                    <td>
                                                                        {lbtData?.an_con.mea[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.mea[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.mea[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>규칙성</td>
                                                                    <td>
                                                                        {lbtData?.an_con.patt[0]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.patt[1]}
                                                                    </td>
                                                                    <td>
                                                                        {lbtData?.an_con.patt[2]}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>자료와 가능성</td>
                                                                    <td>{lbtData?.an_con.db[0]}</td>
                                                                    <td>{lbtData?.an_con.db[1]}</td>
                                                                    <td>{lbtData?.an_con.db[2]}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="lbt-graph2">
                                                        <span className="lbt-graph2-bg"></span>
                                                        <span className="lbt-graph2-bg"></span>
                                                        <span className="lbt-graph2-bg"></span>
                                                        <span className="lbt-graph2-bg"></span>
                                                        <span className="lbt-graph2-bg"></span>

                                                        <div
                                                            className="lbt-graph2-bar"
                                                            style={{
                                                                width: `${
                                                                    lbtData?.an_con.num[2] == "-"
                                                                        ? "0"
                                                                        : lbtData?.an_con.num[2]
                                                                }`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className="lbt-graph2-bar"
                                                            style={{
                                                                width: `${
                                                                    lbtData?.an_con.shape[2] == "-"
                                                                        ? "0"
                                                                        : lbtData?.an_con.shape[2]
                                                                }`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className="lbt-graph2-bar"
                                                            style={{
                                                                width: `${
                                                                    lbtData?.an_con.mea[2] == "-"
                                                                        ? "0"
                                                                        : lbtData?.an_con.mea[2]
                                                                }`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className="lbt-graph2-bar"
                                                            style={{
                                                                width: `${
                                                                    lbtData?.an_con.patt[2] == "-"
                                                                        ? "0"
                                                                        : lbtData?.an_con.patt[2]
                                                                }`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className="lbt-graph2-bar"
                                                            style={{
                                                                width: `${
                                                                    lbtData?.an_con.db[2] == "-"
                                                                        ? "0"
                                                                        : lbtData?.an_con.db[2]
                                                                }`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </section>
                                ) : null}

                                {/* 플러스 학습 분석 */}
                                {viewItem && viewItem[1].optionItem.length > 0 ? (
                                    <section
                                        className="lbt-content"
                                        style={{ marginBottom: "20px" }}
                                    >
                                        <h4 className="lbt-content-title fa fj">
                                            <span>
                                                <Icon icon={"lbt2"} />
                                                {viewItem[1].option}
                                            </span>
                                            <p className="lbt-text">
                                                * 플러스 학습은 패럴랙스 수학 학원 선생님을 통해서만
                                                학습이 가능합니다.
                                            </p>
                                        </h4>

                                        <table className="lbt-table">
                                            <thead>
                                                <tr>
                                                    <th>구분</th>
                                                    <th>학년 / 학기</th>
                                                    <th>내용</th>
                                                    <th>점수</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {viewItem[1].optionItem.some(
                                                    (a) => a.label === "교과서별 내신적중"
                                                ) && (
                                                    <>
                                                        {lbtData?.plus_tb.map((a, i) => {
                                                            if (i === 0) {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td
                                                                            rowSpan={
                                                                                lbtData.plus_tb
                                                                                    .length
                                                                            }
                                                                        >
                                                                            교과서별 내신적중
                                                                        </td>
                                                                        <td>{a.grade}</td>
                                                                        <td className="text-left">
                                                                            {a.title}
                                                                        </td>
                                                                        <td>{a.score}</td>
                                                                    </tr>
                                                                );
                                                            } else {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{a.grade}</td>
                                                                        <td className="text-left">
                                                                            {a.title}
                                                                        </td>
                                                                        <td>{a.score}</td>
                                                                    </tr>
                                                                );
                                                            }
                                                        })}
                                                    </>
                                                )}
                                                {viewItem[1].optionItem.some(
                                                    (a) => a.label === "서술형 따라잡기"
                                                ) && (
                                                    <>
                                                        {lbtData?.plus_ct.map((a, i) => {
                                                            if (i === 0) {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td rowSpan={2}>
                                                                            서술형 따라잡기
                                                                        </td>
                                                                        <td>{a.grade}</td>
                                                                        <td className="text-left">
                                                                            {a.title}
                                                                        </td>
                                                                        <td>{a.score}</td>
                                                                    </tr>
                                                                );
                                                            } else {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{a.grade}</td>
                                                                        <td className="text-left">
                                                                            {a.title}
                                                                        </td>
                                                                        <td>{a.score}</td>
                                                                    </tr>
                                                                );
                                                            }
                                                        })}
                                                    </>
                                                )}
                                            </tbody>
                                        </table>
                                    </section>
                                ) : null}
                                {/* 평가 분석 */}
                                {viewItem && viewItem[2].optionItem.length > 0 ? (
                                    <section className="lbt-content">
                                        <h4 className="lbt-content-title d-flex">
                                            <Icon icon={"lbt3"} />
                                            <span className="mr-10">{viewItem[2].option}</span>
                                            <p className="lbt-text">
                                                * 각 평가의 평균 점수는 평균 산출 일자에 따라 달라질
                                                수 있습니다.
                                            </p>
                                        </h4>

                                        {viewItem[2].optionItem.some(
                                            (a) => a.label === "단원평가 분석"
                                        ) && (
                                            <>
                                                <div
                                                    className="fa-end"
                                                    style={{ marginBottom: "50px" }}
                                                >
                                                    <div style={{ width: "60%" }}>
                                                        <div className="fj fa-end">
                                                            <h5 className="lbt-content-sub-title">
                                                                단원평가 분석
                                                            </h5>
                                                            <p className="lbt-text">
                                                                평균 산출 시점 : {산출시점}
                                                            </p>
                                                        </div>
                                                        <table className="lbt-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>평가명</th>
                                                                    <th>평가 일자</th>
                                                                    <th>나의 점수</th>
                                                                    <th>평균</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {lbtData?.an_ut.map((a, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{a.title}</td>
                                                                            <td>{a.date}</td>
                                                                            <td>{a.score}</td>
                                                                            <td>{a.avg}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div>
                                                        <div className="legend2">
                                                            <div className="yellow">나의 점수</div>
                                                            <div className="red">평균</div>
                                                        </div>
                                                        <div
                                                            className="lbt-graph3"
                                                            style={{
                                                                height: lbtData?.an_ut.length * 35,
                                                            }}
                                                        >
                                                            <span className="lbt-graph2-bg"></span>
                                                            <span className="lbt-graph2-bg"></span>
                                                            <span className="lbt-graph2-bg"></span>
                                                            <span className="lbt-graph2-bg"></span>
                                                            <span className="lbt-graph2-bg"></span>

                                                            {/* 나의점수 그래프 */}
                                                            {lbtData?.an_ut.map((a, i) => {
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="lbt-graph2-bar"
                                                                        style={{
                                                                            width: `${a.graph[0]}%`,
                                                                        }}
                                                                    ></div>
                                                                );
                                                            })}

                                                            {lbtData?.an_ut.map((a, i) => {
                                                                {
                                                                    /* 퍼센트 == 평균 */
                                                                }
                                                                return (
                                                                    <strong
                                                                        key={i}
                                                                        className="common-bar"
                                                                        style={{
                                                                            left: `calc(${a.graph[1]}% - 4px)`,
                                                                        }}
                                                                    ></strong>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {viewItem[2].optionItem.some(
                                            (a) => a.label === "총괄평가 분석"
                                        ) && (
                                            <div
                                                className="fa-end"
                                                style={{ marginBottom: "50px" }}
                                            >
                                                <div style={{ width: "60%" }}>
                                                    <div className="fj fa-end">
                                                        <h5 className="lbt-content-sub-title">
                                                            총괄평가 분석
                                                        </h5>
                                                        <p className="lbt-text">
                                                            평균 산출 시점 : {산출시점}
                                                        </p>
                                                    </div>
                                                    <table className="lbt-table">
                                                        <thead>
                                                            <tr>
                                                                <th>평가명</th>
                                                                <th>평가 일자</th>
                                                                <th>성취도</th>
                                                                <th>성취도 평균</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lbtData?.an_bt.map((a, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{a.title}</td>
                                                                        <td>{a.date}</td>
                                                                        <td>{a.score}</td>
                                                                        <td>{a.avg}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="lbt-graph4">
                                                    <div className="legend1 d-flex">
                                                        <div className="yellow">성취도</div>
                                                        <div className="red">성취도 평균</div>
                                                        <div className="line">선형(성취도)</div>
                                                    </div>
                                                    <canvas
                                                        id="canvas2"
                                                        width="240px"
                                                        height="100px"
                                                        ref={canvas2}
                                                    ></canvas>

                                                    {lbtData?.an_bt.map((a, i) => {
                                                        return (
                                                            <span className="list" key={i}>
                                                                {a.title}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                ) : null}
                                {/* 학습 태도 분석 */}
                                {viewItem && viewItem[3].optionItem.length > 0 ? (
                                    <section className="lbt-content">
                                        <h4 className="lbt-content-title">
                                            <Icon icon={"lbt4"} />
                                            {viewItem[3].option}
                                        </h4>

                                        {viewItem[3].optionItem.some(
                                            (a) => a.label === "학원 출결 상황"
                                        ) && (
                                            <>
                                                <div className="fa-end">
                                                    <h5 className="lbt-content-sub-title mr-10">
                                                        학원 출결 상황
                                                    </h5>
                                                    <span className="lbt-text mr-10">
                                                        출석 : {lbtData?.attd_stat.present}일
                                                    </span>
                                                    <span className="lbt-text mr-10">
                                                        지각 : {lbtData?.attd_stat.late}일
                                                    </span>
                                                    <span className="lbt-text mr-10">
                                                        조퇴 : {lbtData?.attd_stat.early}일
                                                    </span>
                                                    <span className="lbt-text">
                                                        결석 : {lbtData?.attd_stat.absent}일
                                                    </span>
                                                </div>
                                                <table
                                                    className="lbt-table"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <colgroup>
                                                        <col style={{ width: "30%" }} />
                                                        <col style={{ width: "70%" }} />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th>출결 사유</th>
                                                            <td className="text-left p-5">
                                                                {lbtData?.attd_stat.reason.map(
                                                                    (a, i) => {
                                                                        return <p key={i}>{a}</p>;
                                                                    }
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </>
                                        )}
                                        {viewItem[3].optionItem.some(
                                            (a) => a.label === "온라인 학습 분석"
                                        ) && (
                                            <div>
                                                <h5 className="lbt-content-sub-title">
                                                    온라인 학습 분석
                                                </h5>
                                                <table
                                                    className="lbt-table"
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>총 온라인 학습 시간</th>
                                                            <th>온라인 학습일 수</th>
                                                            <th>하루 평균 온라인 학습 시간</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{lbtData?.an_online.total}</td>
                                                            <td>{lbtData?.an_online.day}</td>
                                                            <td>{lbtData?.an_online.average}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                        {viewItem[3].optionItem.some(
                                            (a) => a.label === "획득한 학습 포인트"
                                        ) && (
                                            <div className="row" style={{ marginBottom: "20px" }}>
                                                <div className="col-5">
                                                    <h5 className="lbt-content-sub-title">
                                                        획득한 학습 포인트
                                                    </h5>
                                                    <table className="lbt-table">
                                                        <thead>
                                                            <tr>
                                                                <th>캐럿</th>
                                                                <th>미네랄</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{lbtData?.point.ct}개</td>
                                                                <td>{lbtData?.point.mi}개</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-7">
                                                    <div className="lbt-graph5">
                                                        {/* 선 */}
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        {/* 갯수 */}

                                                        <em>30개</em>
                                                        <em>20개</em>
                                                        <em>10개</em>
                                                        <em>0</em>

                                                        {lbtData &&
                                                            sortFn(lbtData.point.recent).map(
                                                                (a, i) => {
                                                                    {
                                                                        /* 현재갯수 * ( 100/ 최대갯수 ) */
                                                                    }
                                                                    return (
                                                                        <strong
                                                                            className="lbt-graph5-bar"
                                                                            key={i}
                                                                        >
                                                                            <div
                                                                                className="ornage-bar"
                                                                                style={{
                                                                                    height: `${
                                                                                        a.rct *
                                                                                        (100 / 30)
                                                                                    }%`,
                                                                                }}
                                                                            ></div>
                                                                            <div
                                                                                className="red-bar"
                                                                                style={{
                                                                                    height: `${
                                                                                        a.rmi *
                                                                                        (100 / 30)
                                                                                    }%`,
                                                                                }}
                                                                            ></div>
                                                                            <span className="month">
                                                                                {a.rmon}월
                                                                            </span>
                                                                        </strong>
                                                                    );
                                                                }
                                                            )}

                                                        <div className="legend1">
                                                            <div className="yellow">캐럴</div>
                                                            <div className="red">미네랄</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {viewItem[3].optionItem.some(
                                            (a) => a.label === "학습 태도 평가"
                                        ) && (
                                            <div className="col-8" style={{ marginBottom: "20px" }}>
                                                <h5 className="lbt-content-sub-title">
                                                    학습 태도 평가
                                                </h5>
                                                <div className="lbt-graph6">
                                                    <div className="lbt-graph6-left">
                                                        <span>학습 집중도</span>
                                                        <span>수업 참여 적극성</span>
                                                        <span>과제 수행</span>
                                                        <span>개념 노트 정리</span>
                                                        <span>오답 노트 정리</span>
                                                    </div>
                                                    <div className="lbt-graph6-area">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>

                                                        {lbtData?.attd_eval.map((a, i) => {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="lbt-graph6-bar"
                                                                    style={{
                                                                        width: `${
                                                                            parseInt(a) * 10
                                                                        }%`,
                                                                    }}
                                                                ></div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="lbt-graph6-right">
                                                        <span>매우 우수</span>
                                                        <span>우수</span>
                                                        <span>보통</span>
                                                        <span>우수</span>
                                                        <span>우수</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                ) : null}

                                {/* 선생님 의견 */}
                                {viewItem &&
                                    viewItem[4].optionItem.some(
                                        (a) => a.label === "선생님의견"
                                    ) && (
                                        <section
                                            className="lbt-content"
                                            style={{ marginBottom: "20px" }}
                                        >
                                            <h4 className="lbt-content-title">
                                                <Icon icon={"lbt6"} />
                                                선생님 의견
                                            </h4>
                                            <div className="opinion-box">
                                                <p>{lbtData.tch_comm}</p>
                                            </div>
                                        </section>
                                    )}
                                {/* ai 분석 */}
                                {viewItem &&
                                    viewItem[4].optionItem.some((a) => a.label === "AI분석") && (
                                        <section className="lbt-content">
                                            <h4 className="lbt-content-title">
                                                <Icon icon={"lbt5"} />
                                                종합 분석 의견
                                            </h4>
                                            <div className="ai-box">
                                                <p>{lbtData.art_an}</p>
                                            </div>
                                        </section>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey-border mr-10"
                        onClick={() => {
                            setCreateModal(false);
                        }}
                    >
                        닫기
                    </button>
                    <button className="btn-orange mr-10" onClick={createAnalytics}>
                        생성하기
                    </button>
                </div>
            </div>
        </div>
    );
}

// month sort
const sortFn = (param) => {
    let arr = _cloneDeep(param);
    arr.forEach((a) => {
        let month = parseInt(a.rmon.replace("월", ""));
        a.rmon = month;
    });
    arr.sort((a, b) => {
        if (a.rmon < b.rmon) {
            return -1;
        } else {
            return 1;
        }
    });
    return arr;
};

export default LbtModal;
