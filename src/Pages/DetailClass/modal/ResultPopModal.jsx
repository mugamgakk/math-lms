// yeonju
import React, { useEffect, useState } from "react";
import ajax from "../../../ajax";
import Icon from "../../../components/Icon";
import ReactPlayer from "react-player";
import useStudentsStore from "../../../store/useStudentsStore";
import styled from "styled-components";
import useTable from "../../../hooks/useTable";
import { useQuery } from "react-query";
import { fetchData } from "../../../methods/methods";

const CorrectBtn = styled.button`
    width: 60px;
    height: 30px;
    border-radius: 4px;
    background-color: #eb615a;
    font-weight: 500;
    color: #fff;
    font-size: 16px;
    cursor: default;

    &.not {
        background-color: #fff;
        border: 1px solid #eb615a;
        color: #eb615a;
    }
`;

const VideoButton = styled.button`
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;
    border-radius: 50%;
    cursor: pointer;

    &.disabled{
        cursor: default;
        background-color: #ddd;
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 40%;
        transform: translateY(-50%);
        border-bottom: 6px solid transparent;
        border-top: 6px solid transparent;
        border-left: 9px solid #fff;
        border-right: 9px solid transparent;
    }
`;

const fiveArr = new Array(5).fill(1);

const oneNumber = ["①", "②", "③", "④", "⑤"];

function ResultPopMoal({ setResultPop, ucode }) {
    const clickStudent = useStudentsStore((state) => state.clickStudent);

    // ele, true, false
    let [ref, isTable] = useTable();

    // 클릭한 문제
    let [clickState, setClickState] = useState(0);

    let [videoModal, setVideoModal] = useState(false);

    const param = {
        mode: "qa_result",
        usr_seq: clickStudent.usr_seq,
        ucode: ucode,
        sd_kind: "QA",
        qseq: 1,
    };

    let list = useQuery("classList", () => fetchData("class_result", param), {
        refetchOnWindowFocus: false,
    });

    // 점수
    const score = list.data?.score.split("/");
    // 제목
    const title = list.data?.title.split("/");
    title?.shift();

    const imgUrlTitle =
        list.data?.qa_result[clickState].qa_path +
        list.data?.qa_result[clickState].qa_code +
        "_Q.png";


    // console.log(list.data?.qa_result.map(a=> a.vd_path));

    return (
        <div className="modal">
            <div className="modal-content resultPopModal">
                <div className="modal-header fj">
                    <h2 className="modal-title">학습 결과</h2>
                    <button
                        className="btn"
                        onClick={(e) => {
                            setResultPop(false);
                        }}
                    >
                        <Icon icon={"close"} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="modal-name" style={{ paddingLeft: "20px" }}>
                        <strong className="name">{clickStudent.um_nm}</strong>
                        <ul className="list">
                            <li>{clickStudent.school_grade}</li>
                            {title?.map((a, i) => {
                                return <li key={i}>{a}</li>;
                            })}
                        </ul>
                    </div>
                    <div className="resultPopModal-content">
                        <div className="left">
                            <div className="left-header">
                                <span className="count-label">맞힘 개수</span>
                                <strong className="count">
                                    {score?.[0]}개 / {score?.[1]}개
                                </strong>
                                <span className="date">2022. 07. 12</span>
                            </div>
                            <div className="left-body">
                                <table className="resultPopModal-table custom-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "15%" }}>번호</th>
                                            <th style={{ width: "20%" }}>정답</th>
                                            <th style={{ width: "20%" }}>학생 답</th>
                                            <th style={{ width: "20%" }}>채점</th>
                                            <th style={{ width: "25%" }}>동영상</th>
                                            {isTable && (
                                                <th style={{ width: "17px", border: "none" }}></th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody style={{ maxHeight: "480px" }} ref={ref}>
                                        {list.data?.qa_result.map((a, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td
                                                        style={{ width: "15%" }}
                                                        onClick={() => {
                                                            console.log(clickState, imgUrlTitle);
                                                            setClickState(i);
                                                        }}
                                                    >
                                                        {a.no}
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        {
                                                            a.correct_a
                                                        }
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        {
                                                            a.std_and
                                                        }
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        <CorrectBtn>정답</CorrectBtn>
                                                    </td>
                                                    <td style={{ width: "25%" }}>

                                                        {
                                                            videoModal && <VideoPlayer/>
                                                        }

                                                        {
                                                            a.vd_path 
                                                            ? <VideoButton onClick={()=>{setVideoModal(true)}} />
                                                            : <VideoButton className="disabled" />
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="right">
                            <div className="problem">
                                <div className="problem-header">
                                    <div className="problem-num">
                                        {clickState + 1 < 10
                                            ? "0" + (clickState + 1)
                                            : clickState + 1}
                                    </div>
                                    <div className="problem-detail-title">
                                        {list.data?.qa_result[clickState].qa_keyword}
                                    </div>
                                </div>
                                <div className="problem-body">
                                    <img
                                        src={imgUrlTitle}
                                        alt=""
                                        style={{ width: "100%", marginBottom: "15px" }}
                                    />
                                    {fiveArr.map((a, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="fa"
                                                style={{ marginBottom: "10px" }}
                                            >
                                                <span className="num">{oneNumber[i]}</span>
                                                <img
                                                    style={{ width: "calc(100% - 32.14px)" }}
                                                    key={i}
                                                    src={
                                                        list.data?.qa_result[clickState].qa_path +
                                                        list.data?.qa_result[clickState].qa_code +
                                                        "_" +
                                                        (i + 1) +
                                                        ".png"
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                    <img
                                        src={
                                            list.data?.qa_result[clickState].qa_path +
                                            list.data?.qa_result[clickState].qa_code +
                                            "_S.png"
                                        }
                                        alt=""
                                        width={"100%"}
                                        style={{ marginTop: "60px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn-orange"
                        onClick={(e) => {
                            e.stopPropagation();
                            setResultPop(false);
                        }}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

function VideoPlayer({ closeModal }) {
    return (
        <div className="videoPlayer">
            <div className="top">
                <button className="fc" onClick={() => closeModal(false)}>
                    <Icon icon={"close"} style={{ fontSize: "25px" }} />
                </button>
            </div>
            <ReactPlayer
                url="https://gnbedu.fms.wecandeo.com/100/2948/2021/10/27/17/V24001759.mp4?key=BtsH4AB921cwWjhQSx4eU7wpZ0LhEqKoyGk4l8AaAoo6QxOImYRgVAr11kpl3ePmXQ4lS8%2BmIRbl6Lo69NV4q2NcMOokZlQAWueM9LaPEbo%3D&packageId=1016125&videoId=12557707"
                width="100%"
                height="500px"
                playing={true}
                // muted={true}
                controls={true}
                // light={false}
            />
        </div>
    );
}

export default ResultPopMoal;
