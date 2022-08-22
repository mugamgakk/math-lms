import React, { useState, useRef, useEffect } from "react";
import style from "../../../style/style-module/lbtModal.module.scss";
import LbtCheckbox from "../LbtCheckbox";
import ReactToPrint from 'react-to-print'; // pdf, 인쇄


const dataLists = [
    [
        { id: 1, data: "단원 학습 현황" },
        { id: 2, data: "단원별 정답률 및 향상도/수행평가" },
        { id: 3, data: "행동 영역 분석" },
        { id: 4, data: "내용 영역 분석" },
    ],
    [
        { id: 5, data: "서술형 따라잡기" },
        { id: 6, data: "교과서 적중문제" },
    ],
    [
        { id: 7, data: "학원 출결 상황" },
        { id: 8, data: "온라인 학습 분석" },
    ],
];


const arr = new Array(10).fill(1)

function LbtModal(props) {
    const [allCheckBtn, setAllCheckBtn] = useState(false);
    const printComponent = useRef();


    return (
        <div
            className={style.modal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.setModal(false);
                }
            }}
        >
            <div className={style.content}>
                {
                    props.modalState === "생성"
                    ? <h4>종합 학습 분석표 생성하기</h4>
                    : <h4>종합 학습 분석표 보기 / 인쇄</h4>
                }
                <div className="row">
                    <div className={style.left}>

                        {
                            props.modalState === "인쇄" && <div className={style.disabled}></div>
                        }

                        <strong>
                            평균 표시(
                            <input
                                type="checkbox"
                                className={style.formConrol}
                                defaultChecked
                                disabled
                            />
                            Y
                            <input type="checkbox" className={style.formConrol} disabled />
                            N)
                        </strong>

                        <div>
                            <button
                                className="btn"
                                onClick={() => {
                                    setAllCheckBtn(!allCheckBtn);
                                }}
                            >
                                모두 선택 / 해제
                            </button>
                        </div>

                        <div className="contentGroup">
                            {dataLists.map((list, i) => {
                                return (
                                    <LbtCheckbox
                                        dataLists={list}
                                        allCheckBtn={allCheckBtn}
                                        key={i}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={style.rightWrap}>

                        
                    <div className={style.right} ref={printComponent} style={{width : "793.701px"}} >
                        
                            <h1 style={{backgroundColor : "orangered", color : "#fff", fontSize : "20px" , textAlign : "center", marginBottom : "20px"}}>사고하고 질문하라</h1>
                            <h2 style={{textAlign : "center", marginBottom : "20px"}}>2022년 4월 강수학의 패럴랙스 수학 종합 학습 분석표</h2>

                            <table style={{marginBottom : "20px"}}>
                                <tbody>
                                    <tr>
                                        <td>캠퍼스</td>
                                        <td>대치 캠퍼스</td>
                                        <td>학년</td>
                                        <td>중2</td>
                                        <td>학습 기간</td>
                                        <td>2021년 4월 1일 ~ 2021년 4월 30일</td>
                                    </tr>
                                    <tr>
                                        <td>학습 교재</td>
                                        <td colSpan={5}>중 2-1 개념서, 중 2-1 뜨레스, 중 2-1 노벰</td>
                                    </tr>
                                </tbody>
                            </table>

                            {
                                arr.map((a,i)=>{
                                    return (
                                        <table style={{marginBottom : "20px"}} key={i}>
                                        <tbody>
                                            <tr>
                                                <td>교재 학습 문제 수</td>
                                                <td>540 문항</td>
                                                <td>맞힌 문제 수</td>
                                                <td>478 문항</td>
                                                <td>정답률</td>
                                                <td>88.5%</td>
                                            </tr>
                                            <tr>
                                                <td>컬러닉 학습 문제 수</td>
                                                <td>88 문항</td>
                                                <td>맞힌 문제 수</td>
                                                <td>76문항</td>
                                                <td>정답률</td>
                                                <td>88.5%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    )
                                })
                            }


                    </div>
                    </div>
                </div>
                <div className={style.btnGroup}>
                    {
                        props.modalState === "생성"
                        ? (
                            <>
                                <button className="btn">생성</button>
                                <button className="btn" onClick={()=>{props.setModal(false);}}>닫기</button>
                            </>
                        )
                        : (
                            <>
                            <ReactToPrint
                            trigger={() => <button className="btn">인쇄하기</button>} 
                            content={() => printComponent.current} 
                            />
                            <ReactToPrint
                            trigger={() => <button className="btn">다운로드</button>} 
                            content={() => printComponent.current} 
                            />
                            <button className="btn" onClick={()=>{props.setModal(false);}}>닫기</button>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default LbtModal;
