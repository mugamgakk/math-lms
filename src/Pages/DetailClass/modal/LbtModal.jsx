import React, { useState, useRef } from "react";
import LbtCheckbox from "../LbtCheckbox";
import useLbtStore from "../../../store/useLbtStore";
import { falseModal } from "../../../methods/methods";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import { useEffect } from "react";
import ajax from "../../../ajax";
import logo from "../../../assets/img/parallax-logo.png"

function LbtModal({ setCreateModal }) {
    const dataLists = useLbtStore((state) => state.dataLists);
    const checkedList = useLbtStore((state) => state.checkedList);
    const allCheckfnL = useLbtStore((state) => state.allCheckfnL);

    let [viewItem, setViewItem] = useState(null);

    let canvas1 = useRef();

    const getRegult = async () => {
        const data = {
            mode: "get_analytics_tot",
            avg: 1, //평균표시
            lec_stat: 1, // 단원별 학습
            lec_assa: 0, //단원별 정답률 향상도/수행병가
            an_act: 1, //행동 영역 분석
            an_con: 1, //내용 영역 분석
            plus_ct: 1, //플러스 서술
            plus_tb: 1, //플러스 내신
            an_ut: 1, //단원평가분석
            an_bt: 1, //총괄평가분석
            attd_stat: 1, //학원 출결상황
            an_online: 1, //온라인 학습분석
            point: 1, //획득 학습포인트
            attd_eval: 1, //학습태도 평가
            tch_comm: 1, //선생님의견,
            art_an: 1, //AI분석,
            arr_bk_cd: ["m11-co1", "m11-no1"], //교재코드 배열
            sdate: "2022-01-01", //분석표 생성시 선택된 기간
            edate: "2022-01-01", //분석표 생성시 선택된 기간
        };

        let res = await ajax("/class_result.php", { data });

        // console.log(res);

        setViewItem(checkedList)
    };

    const isAllCheck = () => {
        let result1 = 0;
        let result2 = 0;
        dataLists.forEach(a => {
            result1 += a.optionItem.length
        })
        checkedList.forEach(a => {
            result2 += a.optionItem.length
        })

        return result1 === result2
    }

    const draw1 = (위 = 90, 우 = 75, 아래 = 83, 좌 = 84)=>{
        const ctx = canvas1.current.getContext("2d");
        // 초기화
        ctx.clearRect(0,0,canvas1.current.width, canvas1.current.height);
        ctx.beginPath();
        ctx.moveTo(100, 10);
        ctx.lineTo(190, 100);
        ctx.lineTo(100, 190);
        ctx.lineTo(10, 100);
        ctx.lineTo(100, 10);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(256,256,256,0.1)'; 
        ctx.fill(); 
        
        ctx.beginPath();
        ctx.moveTo(100, 60);
        ctx.lineTo(140, 100);
        ctx.lineTo(100, 140);
        ctx.lineTo(60, 100);
        ctx.lineTo(100, 60);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(100, 90);
        ctx.lineTo(110, 100);
        ctx.lineTo(100, 110);
        ctx.lineTo(90, 100);
        ctx.lineTo(100, 90);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ccc";
        ctx.stroke();

        // 영역
        ctx.beginPath();
        // 위
        ctx.moveTo(100, 200 - (100 + 위 / 1.11111111));
        ctx.lineTo(100 + 우 / 1.11111111, 100);
        ctx.lineTo(100, (100 + 아래 / 1.11111111));
        ctx.lineTo(200 - (100 + 좌 / 1.11111111), 100);
        ctx.lineTo(100, 200 - (100 + 위 / 1.11111111));

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ea7851";
        ctx.stroke();

        ctx.fillStyle = '#ea77512f'; 
        ctx.fill(); 
        
        // 글자
        ctx.font = "10px Pretendard";
        ctx.fillStyle = "#444";
        ctx.fillText("100", 75, 15);
        ctx.font = "10px Pretendard";
        ctx.fillStyle = "#444";
        ctx.fillText("50", 80, 55);
        ctx.font = "10px Pretendard";
        ctx.fillStyle = "#444";
        ctx.fillText("0", 85, 90);

        // 위 사각형
        ctx.fillStyle = '#ea7851';
        ctx.fillRect(95, 195 - (100 + 위 / 1.11111111), 10, 10);
        // 우
        ctx.fillStyle = '#ea7851';
        ctx.fillRect(95 + 우 / 1.11111111, 95, 10 ,10);
        // 아래
        ctx.fillStyle = '#ea7851';
        ctx.fillRect(95, (95 + 아래 / 1.11111111), 10 ,10);
        // 좌
        ctx.fillStyle = '#ea7851';
        ctx.fillRect(195 - (100 + 좌 / 1.11111111), 95, 10 ,10);

        
    }

    useEffect(() => {
        getRegult();
    }, []);
    
    useEffect(()=>{
        // 행동 영역 분석 그래프
        setTimeout(()=>{
            draw1()
        },500)
    },[draw1])

    return (
        <div
            className="modal LbtModal"
            onClick={(e) => {
                falseModal(e, setCreateModal);
            }}
        >
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
                            <div className="head"><span style={{ marginRight: "12px" }}>※ 평균 표시</span> <span className="fa"> ( <span className="head-y">Y</span><span className="head-n">N </span> ) </span></div>
                            <div className="body">
                                <div className="part">
                                    <div className="part-title">
                                        <Checkbox
                                            color="orange"
                                            id="all"
                                            checked={isAllCheck()}
                                            onChange={e => { allCheckfnL(e.target.checked) }}
                                        />
                                        <label htmlFor="all">모두 선택 / 해제</label>
                                    </div>
                                </div>
                                {dataLists.map((a, i) => {
                                    return <LbtCheckbox ele={a} key={i} checkedItem={checkedList[i]} />;
                                })}
                                <div className="text-center">
                                    <button className="btn-grey-border" style={{ minWidth: "100px" }} onClick={() => {
                                        getRegult()
                                    }} >적용</button>
                                </div>
                            </div>
                        </div>

                        <div className="right lbt-print">

                            <div className="head">
                                <span className="mr-10">
                                    사유하고 질문하라.
                                </span>
                                Parallax Thingking!
                            </div>
                            <div className="body">
                                <div className="body-title fj">
                                    <h3>2023년 4월 강수학의 패럴랙스 수학 <span className="text-orange">종합 학습 분석표</span></h3>
                                    <img src={logo} alt="" />
                                </div>

                                <table className="lbt-table">
                                    <colgroup>
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>이름</th>
                                            <td>강수학</td>
                                            <th>학년</th>
                                            <td>중2</td>
                                            <th>학습기간</th>
                                            <td>2023년 04월 01일 ~ 2023년 04월 30일</td>
                                        </tr>
                                        <tr>
                                            <th>학습 교재</th>
                                            <td className="text-left" colSpan={5}>중등 수학 2-2 개념서, 중등 수학 2-2 유형서 뜨레스, 중등 수학 2-2 유형서 엑사스 외</td>
                                        </tr>
                                    </tbody>
                                </table>



                                {/* 교재 학습 분석 */}
                                {
                                    viewItem && viewItem[0].optionItem.length > 0
                                        ? (
                                            <section className="lbt-content">
                                                <h4 className="lbt-content-title"><Icon icon={"lbt1"} />{viewItem[0].option}</h4>

                                                {
                                                    viewItem[0].optionItem.some(a => a.label === "단원 학습 현황") && (
                                                        <>
                                                            <h5 className="lbt-content-sub-title">단원 학습 현황</h5>
                                                            <table className="lbt-table lbt-table1" style={{ marginBottom: "20px" }}>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>교재 학습 문항 수</th>
                                                                        <td>540 문항</td>
                                                                        <th>맞힌 문항 수</th>
                                                                        <td>478 문항</td>
                                                                        <th>정답률</th>
                                                                        <td>88.5%</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>클리닉 학습 문항 수</th>
                                                                        <td>540 문항</td>
                                                                        <th>맞힌 문항 수</th>
                                                                        <td>478 문항</td>
                                                                        <th>정답률</th>
                                                                        <td>88.5%</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            
                                                        </>
                                                    )
                                                }
                                                {
                                                    viewItem[0].optionItem.some(a => a.label === "단원별 정답률 및 향상도/수행평가") && (
                                                        <>
                                                            <div className="fe d-flex legend1">
                                                                <div className="yellow">개념 학습</div>
                                                                <div className="blue">유형 학습</div>
                                                                <div className="red">맞춤 클리닉 향상</div>
                                                            </div>
                                                            <table className="lbt-table lbt-table1" style={{ marginBottom: "20px" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan={3}>단원별 정답률 및 향상도</th>
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
                                                                    <tr>
                                                                        <td>Ⅰ. 도형의 성질</td>
                                                                        <td className="text-right">
                                                                            닮은 도형<br />
                                                                            삼각형과 평행선<br />
                                                                            삼각형의 두 변의 중점을 연결한 선 분의 성질<br />
                                                                            평행선과 선분의 길이의 비<br />
                                                                            삼각형의 무게 중심<br />
                                                                            닮음의 활용<br />
                                                                            단원 마무리
                                                                        </td>
                                                                        <td style={{ padding: "0" }}>
                                                                            <div className="bg-area-wrap">
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>

                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            10점<br />
                                                                            -
                                                                        </td>
                                                                        <td>
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            10점<br />
                                                                            -
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Ⅱ. 도형의 닮음</td>
                                                                        <td className="text-right">
                                                                            여러 가지 사각형 (1)<br />
                                                                            여러 가지 사각형 (2)<br />
                                                                            평행사변형<br />
                                                                            삼각형의 외심과 내심<br />
                                                                            이등변 삼각형과 직각 삼각형<br />
                                                                            단원 마무리
                                                                        </td>
                                                                        <td style={{ padding: "0" }}>
                                                                            <div className="bg-area-wrap">
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>
                                                                                <span className="bg-area"></span>

                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "70%" }}></div>
                                                                                    <div className="area-list-item" style={{ width: "90%" }}></div>
                                                                                </div>
                                                                                <div className="area-list">
                                                                                    <div className="area-list-item" style={{ width: "80%" }}></div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            10점<br />
                                                                            -
                                                                        </td>
                                                                        <td>
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            8점<br />
                                                                            10점<br />
                                                                            -
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </>
                                                    )
                                                }
                                                {
                                                    viewItem[0].optionItem.some(a => a.label === "행동 영역 분석") && (
                                                        <>
                                                            <h5 className="lbt-content-sub-title">행동 영역 분석</h5>
                                                            <div className="d-flex" style={{ marginBottom: "20px" }}>
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
                                                                                <td>200</td>
                                                                                <td>180</td>
                                                                                <td>90%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>이해력</td>
                                                                                <td>150</td>
                                                                                <td>142</td>
                                                                                <td>75%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>추론력</td>
                                                                                <td>120</td>
                                                                                <td>100</td>
                                                                                <td>83%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>문제해결력</td>
                                                                                <td>158</td>
                                                                                <td>132</td>
                                                                                <td>84%</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <p className="info1">
                                                                        <strong>계산력</strong> 수학 개념과 성질을 이해하고 단순 계산에 적용하는 능력 <br />
                                                                        <strong>이해력</strong> 수학적 표현을 이해하거나 상황을 수학적으로 표현하는 능력 <br />
                                                                        <strong>추론력</strong> 문제상황에서 수학 법칙을 찾아내거나 참, 거짓을 판별하는 능력 <br />
                                                                        <strong>문제해결력</strong> 두 가지 이상의 수학 개념이 포함되거나 두 단계 이상의 사고 과정이 필요한 문제를 해결하는 능력 <br />
                                                                    </p>
                                                                </div>
                                                                <div style={{ width: "40%" }} className="lbt-graph1">
                                                                    <span className="item1">계산력</span>
                                                                    <span className="item2">이해력</span>
                                                                    <span className="item3">추론력</span>
                                                                    <span className="item4">문제 <br/>해결력</span>
                                                                    <canvas width={200} height={200} ref={canvas1} ></canvas>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                {
                                                    viewItem[0].optionItem.some(a => a.label === "내용 영역 분석") && (
                                                        <>
                                                            <div className="fa-end" style={{marginBottom : "20px"}}>
                                                                <div style={{ width: "60%" }}>
                                                                    <h5 className="lbt-content-sub-title">내용 영역 분석</h5>
                                                                    <table className="lbt-table" >
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
                                                                                <td>-</td>
                                                                                <td>-</td>
                                                                                <td>-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>문자와 식</td>
                                                                                <td>400</td>
                                                                                <td>370</td>
                                                                                <td>93%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>함수</td>
                                                                                <td>200</td>
                                                                                <td>160</td>
                                                                                <td>80%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>기하</td>
                                                                                <td>28</td>
                                                                                <td>24</td>
                                                                                <td>90%</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>확률과 통계</td>
                                                                                <td>-</td>
                                                                                <td>-</td>
                                                                                <td>-</td>
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

                                                                    <div className="lbt-graph2-bar" style={{width : "0%"}}></div>
                                                                    <div className="lbt-graph2-bar" style={{width : "93%"}}></div>
                                                                    <div className="lbt-graph2-bar" style={{width : "80%"}}></div>
                                                                    <div className="lbt-graph2-bar" style={{width : "90%"}}></div>
                                                                    <div className="lbt-graph2-bar" style={{width : "0%"}}></div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }

                                            </section>
                                        )
                                        : null
                                }


                                {/* 플러스 학습 분석 */}
                                {
                                    viewItem && viewItem[1].optionItem.length > 0
                                        ? (
                                            <section className="lbt-content">
                                                <h4 className="lbt-content-title fa">
                                                    <span>
                                                        <Icon icon={"lbt2"} />{viewItem[1].option}
                                                    </span>
                                                    <p>*  플러스 학습은 패럴랙스 수학 학원 선생님을 통해서만 학습이 가능합니다.</p>
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

                                                        {
                                                            viewItem[1].optionItem.some(a => a.label === "교과서별 내신적중") && (
                                                                <>
                                                                    <tr>
                                                                        <td rowSpan={4}>교과서별 내신적중</td>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 1. 유리수와 순환소수 (교학사)</td>
                                                                        <td>75/100</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 2. 식의 계산 (교학사)</td>
                                                                        <td>85/100</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 1. 유리수와 순환소수 (금성)</td>
                                                                        <td>65/100</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 2. 식의 계산 (금성)</td>
                                                                        <td>70/100</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            viewItem[1].optionItem.some(a => a.label === "서술형 따라잡기") && (
                                                                <>
                                                                    <tr>
                                                                        <td rowSpan={2}>서술형 따라잡기</td>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 1. 유리수와 순환소수 (교학사)</td>
                                                                        <td>75/100</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>중 2-1</td>
                                                                        <td className="text-left">Ⅰ. 수와 식 1. 유리수와 순환소수 (금성)</td>
                                                                        <td>65/100</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>

                                            </section>
                                        )
                                        : null
                                }
                                {/* 평가 분석 */}
                                {
                                    viewItem && viewItem[2].optionItem.length > 0
                                        ? (
                                            <section className="lbt-content">
                                                <h4 className="lbt-content-title"><Icon icon={"lbt3"} />{viewItem[2].option}</h4>

                                                {
                                                    viewItem[2].optionItem.some(a => a.label === "단원평가 분석") && (
                                                        <h5 className="lbt-content-sub-title">단원평가 분석</h5>
                                                    )
                                                }
                                                {
                                                    viewItem[2].optionItem.some(a => a.label === "총괄평가 분석") && (
                                                        <h5 className="lbt-content-sub-title">총괄평가 분석</h5>
                                                    )
                                                }
                                            </section>
                                        )
                                        : null
                                }
                                {/* 학습 태도 분석 */}
                                {
                                    viewItem && viewItem[3].optionItem.length > 0
                                        ? (
                                            <section className="lbt-content">
                                                <h4 className="lbt-content-title"><Icon icon={"lbt4"} />{viewItem[3].option}</h4>

                                                {
                                                    viewItem[3].optionItem.some(a => a.label === "학원 출결 상황") && (
                                                        <h5 className="lbt-content-sub-title">학원 출결 상황</h5>
                                                    )
                                                }
                                                {
                                                    viewItem[3].optionItem.some(a => a.label === "온라인 학습 분석") && (
                                                        <h5 className="lbt-content-sub-title">온라인 학습 분석</h5>
                                                    )
                                                }
                                                {
                                                    viewItem[3].optionItem.some(a => a.label === "획득한 학습 포인트") && (
                                                        <h5 className="lbt-content-sub-title">획득한 학습 포인트</h5>
                                                    )
                                                }
                                                {
                                                    viewItem[3].optionItem.some(a => a.label === "학습 태도 평가") && (
                                                        <h5 className="lbt-content-sub-title">학습 태도 평가</h5>
                                                    )
                                                }
                                            </section>
                                        )
                                        : null
                                }

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
                    <button className="btn-orange mr-10">생성하기</button>
                </div>
            </div>
        </div>
    );
}

export default LbtModal;
