import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

let Box = styled.div`
    height: 100px;
    background-color: ${(props) => props.bg};
`;

function CreateLbt({ printComponent }) {
    let { lastDay, startDay, subjectArr } = useSelector((state) => state.studentList);
    let { clickStudent } = useSelector((state) => state.studentsSearchSlice);
    let { 교재학습분석, 플러스학습분석, 평가분석, 학습태도분석, 선생님의견 } = useSelector(
        (state) => state.studentList
    );

    // console.log(교재학습분석);
    // console.log(플러스학습분석);
    // console.log(평가분석);
    // console.log(학습태도분석);
    // console.log(선생님의견);


    // console.log(clickStudent ,lastDay , startDay, subjectArr )

    return (
        <div ref={printComponent} style={{ width: "793.701px" }}>
            <h1
                style={{
                    backgroundColor: "orangered",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                사고하고 질문하라
            </h1>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                2022년 {startDay[1]}월 {clickStudent.name}의 패럴랙스 수학 종합 학습 분석표
            </h2>

            <table style={{ marginBottom: "20px" }}>
                <tbody>
                    <tr>
                        <td>캠퍼스</td>
                        <td>대치 캠퍼스</td>
                        <td>학년</td>
                        <td>{clickStudent.age}</td>
                        <td>학습 기간</td>
                        <td>
                            {startDay[0]}년 {startDay[1]}월 {startDay[2]}일 ~ {lastDay[0]}년{" "}
                            {lastDay[1]}월 {lastDay[2]}일
                        </td>
                    </tr>
                    <tr>
                        <td>학습 교재</td>
                        <td colSpan={5}>{subjectArr.join(",")}</td>
                    </tr>
                </tbody>
            </table>

            {교재학습분석.length !== 0 && (
                <section>
                    <h2>교재 학습 분석</h2>
                    {
                        교재학습분석.map(a=>{
                            return (
                                <div style={{ margin: "20px 0" }}>
                            <h4>{a}</h4>
                            <Box bg="#ccc"></Box>
                        </div>
                            )
                        })
                    }
                </section>
            )}

            {플러스학습분석.length !== 0 && (
                <section>
                    <h2>플러스 학습 분석</h2>
                    {
                        플러스학습분석.map(a=>{
                            return (
                                <div style={{ margin: "20px 0" }}>
                            <h4>{a}</h4>
                            <Box bg="orange"></Box>
                        </div>
                            )
                        })
                    }
                </section>
            )}
            {평가분석.length !== 0 && (
                <section>
                    <h2>평가 분석</h2>
                    {
                        평가분석.map(a=>{
                            return (
                                <div style={{ margin: "20px 0" }}>
                            <h4>{a}</h4>
                            <Box bg="green"></Box>
                        </div>
                            )
                        })
                    }
                </section>
            )}
            {학습태도분석.length !== 0 && (
                <section>
                    <h2>학습 태도 분석</h2>
                    {
                        학습태도분석.map(a=>{
                            return (
                                <div style={{ margin: "20px 0" }}>
                            <h4>{a}</h4>
                            <Box bg="yellow"></Box>
                        </div>
                            )
                        })
                    }
                </section>
            )}
            {선생님의견.length !== 0 && (
                <section>
                    <h2>선생님의견</h2>
                    {
                        선생님의견.map(a=>{
                            return (
                                <div style={{ margin: "20px 0" }}>
                            <h4>{a}</h4>
                            <Box bg="blue"></Box>
                        </div>
                            )
                        })
                    }
                </section>
            )}
        </div>
    );
}

export default CreateLbt;
