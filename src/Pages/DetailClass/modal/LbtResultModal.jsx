import React, { useState, useRef } from "react";
import LbtCheckbox from "../LbtCheckbox";
import useLbtStore from "../../../store/useLbtStore";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import { useEffect } from "react";
import ajax from "../../../ajax";
import logo from "../../../assets/img/parallax-logo.png";
import dayjs from "dayjs";
import { arrSort, fetchData, _cloneDeep } from "../../../methods/methods";
import { useQuery } from "react-query";

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

function LbtResultModal({ setResultLbtModal, printSeq }) {
    const dataLists = useLbtStore((state) => state.dataLists);
    // ui
    let [viewItem, setViewItem] = useState(null);
    let [lbtData, setLbtData] = useState(null);

    // 그래프
    let canvas1 = useRef();
    let canvas2 = useRef();

    const dataParam = {
        mode : "get_analytics",
        prt_seq : printSeq
    }

    const getList = useQuery("lbtChecked", ()=> fetchData("class_result",dataParam), {
        refetchOnWindowFocus : false
    });

    console.log(getList.data?.arr_chk);


    const render = (data) => {
        setLbtData(data);

        // setViewItem(checkedList);
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

    return (
        <div className="modal LbtModal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">종합 학습 분석표 생성</h4>
                    <button
                        className="btn"
                        onClick={() => {
                            setResultLbtModal();
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="LbtModal-body">
                        <div className="left">
                            <div className="head">
                                <span style={{ marginRight: "12px" }}>※ 평균 표시</span>
                            </div>
                            <div className="body">
                                <div className="part">
                                    <div className="part-title">
                                    </div>
                                </div>
                                {
                                    dataLists.map((a,i)=>{
                                        return <div className="part" key={a.option}>
                                        <div className="part-title" style={{display : a.option === "comment" ? "none" : "block"}} >
                                            <Checkbox
                                                color="orange"
                                                id={a.option}
                                                disabled={true}
                                            />
                                            <label htmlFor={a.option}>{a.option}</label>
                                        </div>
                                        <ul className={`part-list ${a.option === "comment" ? "part-list-comment" : ""}`}>
                                            {a.optionItem.map((a) => {
                                                return (
                                                    <li key={a.label}>
                                                        <Checkbox
                                                            color="orange"
                                                            id={a.label}
                                                            disabled={true}
                                                        />
                                                        <label htmlFor={a.label}>{a.label}</label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    })
                                }
                          
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-grey-border mr-10"
                        onClick={() => {
                            setResultLbtModal(false);
                        }}
                    >
                        닫기
                    </button>
                    <button className="btn-brown">다운로드</button>
                    <button className="btn-orange mr-10" >인쇄하기</button>
                </div>
            </div>
        </div>
    );
}

export default LbtResultModal;
