import React, { useState } from "react";
import EvaluationPrint from "./EvaluationPrint";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import ResultSave from "./ResultSave";
import MemberLinkModal from "./MemberLinkModal";
import LmsDatePicker from "../../components/LmsDatePicker";
import Icon from "../../components/Icon";
import { useEffect } from "react";
import axios from "axios";
import CheckBox from "../../components/Checkbox";

function JindanContent() {
    let [value, setValue] = useState({
        start: new Date(),
        end: dayjs(new Date()).add(1, "M").$d,
        text: "",
    });
    let [data, setData] = useState(null);

    let [resultModal, setResultModal] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:8080/list").then((res) => {
            setData(res.data.list);
        });
    }, []);
    return (
        <div className="bg bg-content">
            <div className="jindan-order">
                <h4>&lt;진단 평가 진행 순서 &gt;</h4>
                <p>
                    1. 학년 학기를 선택하여 진단 평가지를 인쇄 합니다 . 학생의 현재 학년 학기의 직전
                    단계 를 선택하세요 <br />
                    2. 학생이 응시 완료한 평가지를 보고 문제별 답안을 입력합니다 <br />
                    3. 진단 평가 분석표를 바탕으로 상담을 실시합니다 . 분석표 인쇄 가능 <br />
                </p>
                <p className="text-alert">
                    ※ 진단평가 결과는 등록 회원의 학습 정보로 연동할 수 있습니다 . (1 회 한) <br />※
                    연동하지 않은 평가 결과는 개인 정보 보호 정책에 따라 1 년 후 삭제됩니다 .
                </p>
            </div>
            <EvaluationPrint />

            <div className="fj" style={{ marginBottom: "10px" }}>
                <div>
                    <button className="btn-grey-border mr-10">선택 삭제</button>
                    {resultModal && <ResultSave modal={setResultModal} />}
                    <button
                        className="btn-green"
                        onClick={() => {
                            setResultModal(true);
                        }}
                    >
                        결과 등록
                    </button>
                </div>
                <div className="d-flex fa">
                    <LmsDatePicker
                        onChange={(day) => setValue({ ...value, start: day })}
                        value={value.start}
                    />
                    <span className="water">~</span>
                    <LmsDatePicker
                        onChange={(day) => setValue({ ...value, end: day })}
                        style={{ marginRight: "10px" }}
                        value={value.end}
                    />
                    <input
                        type="text"
                        className="textInput mr-10"
                        value={value.text}
                        placeholder="학생명을 입력하세요"
                        onChange={(e) => setValue({ ...value, text: e.target.value })}
                        style={{ width: "200px" }}
                    />
                    <button
                        className="btn-grey mr-10"
                        onClick={() => {
                            console.log(value);
                        }}
                    >
                        조회
                    </button>
                    <button className="btn-grey btn-icon">
                        <Icon icon={"reload"} />
                        새로고침
                    </button>
                </div>
            </div>
            <table className="table tableA jindan-table">
                <thead>
                    <tr>
                        <th style={{ width: "8.8293%" }}>
                            <CheckBox /> 선택
                        </th>
                        <th style={{ width: "13.8888%" }}>평가 일자</th>
                        <th style={{ width: "9.8214%" }}>학생 명</th>
                        <th style={{ width: "9.8214%" }}>학교</th>
                        <th style={{ width: "11.8055%" }}>평가 범위</th>
                        <th style={{ width: "11.4087%" }}>추천 레벨</th>
                        <th style={{ width: "8.8293%" }}>점수</th>
                        <th style={{ width: "11.8055%" }}>분석표</th>
                        <th style={{ width: "13.8888%" }}>회원 연동</th>
                    </tr>
                </thead>
                <tbody className="scroll">
                    {data?.map((a, i) => {
                        return <Tr item={a} key={i} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({ item }) => {
    let [modal, setModal] = useState(false);

    return (
        <tr>
            <td style={{ width: "8.8293%" }}>
                <CheckBox />
            </td>
            <td style={{ width: "13.8888%" }}>{item.day}</td>
            <td style={{ width: "9.8214%" }}>{item.name}</td>
            <td style={{ width: "9.8214%" }}>{item.school}</td>
            <td style={{ width: "11.8055%" }}>{item.평가범위}</td>
            <td style={{ width: "11.4087%" }}>{item.level}</td>
            <td style={{ width: "8.8293%" }}>{item.score}</td>
            <td style={{ width: "11.8055%" }}>
                <button className="btn-table">보기</button>
            </td>
            <td style={{ width: "13.8888%" }}>
                {modal && <MemberLinkModal setModal={setModal} />}

                <button
                    className="btn-table"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    연동하기
                </button>
            </td>
        </tr>
    );
};

export default JindanContent;
