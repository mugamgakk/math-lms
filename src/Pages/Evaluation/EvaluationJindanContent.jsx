import React, { useState } from "react";
import styled from "styled-components";
import EvaluationPrint from "./EvaluationPrint";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import ResultSave from "./ResultSave";
import MemberLinkModal from "./MemberLinkModal";
import LmsDatePicker from "../../components/LmsDatePicker";

const Box = styled.div`
    padding: 20px;
    background-color: #dc3545;
    color: #fff;
    line-height : 20px;
`;

const data = [
    {
        day: "2022.09.01",
        name: "김진우",
        school: "도곡중",
        grade: 2,
        평가범위: "중2-1",
        level: "엑시스",
        score: 90,
    },
    {
        day: "2022.09.21",
        name: "이수근",
        school: "도곡중",
        grade: 2,
        평가범위: "중2-1",
        level: "엑시스",
        score: 90,
    },
    {
        day: "2022.09.11",
        name: "강호동",
        school: "도곡중",
        grade: 2,
        평가범위: "중2-1",
        level: "엑시스",
        score: 90,
    },
];

function EvaluationJindanContent() {
    let [value, setValue] = useState({
        start: new Date(),
        end: dayjs(new Date()).add(1, "M").$d,
        text: "",
    });

    let [resultModal, setResultModal] = useState(false);

    return (
        <div className="col-8">
            <Box className="mb-3">
                진단 평가 진행 순서 <br />
                1. 학년 학기를 선택하여 진단 평가지를 인쇄 합니다 . 학생의 현재 학년 학기의 직전
                단계 를 선택하세요 <br />
                2. 학생이 응시 완료한 평가지를 보고 문제별 답안을 입력합니다 <br />
                3. 진단 평가 분석표를 바탕으로 상담을 실시합니다 . 분석표 인쇄 가능 <br />
                ※ 진단평가 결과는 등록 회원의 학습 정보로 연동할 수 있습니다 . (1 회 한) <br />※
                연동하지 않은 평가 결과는 개인 정보 보호 정책에 따라 1 년 후 삭제됩니다 .
            </Box>
            <EvaluationPrint />
            <div className="fj mb-3">
            <div>
            <button className="btn">선택 삭제</button>
            {resultModal && <ResultSave modal={setResultModal} />}
            <button
                className="btn"
                onClick={() => {
                    setResultModal(true);
                }}
            >
                결과 등록
            </button>
            </div>
            <div className="d-flex">
            <LmsDatePicker
                onChange={(day) => setValue({ ...value, start: day })}
                value={value.start}
            />
            ~
            <LmsDatePicker
            onChange={(day) => setValue({ ...value, end: day })}
            value={value.end}
            />
            <input
                type="text"
                className="form-control name-input"
                value={value.text}
                placeholder="이름 검색"
                onChange={(e) => setValue({ ...value, text: e.target.value })}
                style={{width : "150px"}}
            />
            <button
                className="btn"
                onClick={() => {
                    console.log(value);
                }}
            >
                조회
            </button>
            </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>평가 일자</th>
                        <th>학생 명</th>
                        <th>학교</th>
                        <th>학년</th>
                        <th>평가 범위</th>
                        <th>추천 레벨</th>
                        <th>점수</th>
                        <th>분석표</th>
                        <th>회원 연동</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((a, i) => {
                        return <Tr item={a} key={i}/>;
                    })}
                </tbody>
            </table>
        </div>
    );
}

const Tr = ({item}) => {

    let [modal, setModal] = useState(false);

    return (
        <tr >
            <td>
                <input type="checkbox" />
            </td>
            <td>{item.day}</td>
            <td>{item.name}</td>
            <td>{item.school}</td>
            <td>{item.grade}</td>
            <td>{item.평가범위}</td>
            <td>{item.level}</td>
            <td>{item.score}</td>
            <td>
                <button className="btn btn-s">보기</button>
            </td>
            <td>
                
                {
                    modal && <MemberLinkModal setModal={setModal}/>
                }
            
                <button className="btn btn-s" onClick={()=>{setModal(true)}}>연동하기</button>
            </td>
        </tr>
    );
};

export default EvaluationJindanContent;
