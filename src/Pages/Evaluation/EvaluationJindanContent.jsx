import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-date-picker";
import SelectBase from "../../components/ui/select/SelectBase";
import dayjs from "dayjs";

const Box = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: ${(props) => props.bg};
`;

const JindanBox = styled.div`
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #eee;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const 학년 = [
    "초등 2학년",
    "초등 3학년",
    "초등 4학년",
    "초등 5학년",
    "초등 6학년",
    "중등 1학년",
    "중등 2학년",
    "중등 3학년",
];
const 학기 = ["1학기", "2학기"];

function EvaluationJindanContent() {
    let [start, setStart] = useState(new Date());
    let [end, setEnd] = useState(new Date());

    




    return (
        <div style={{ width: "850px" }}>
            <Box bg="pink">
                <h5>진단평가 진행 순서</h5>
                <p>
                    학년 학기를 선택하여 진단 평가지를 인쇄 합니다 . 학생의 현재 학년 학기의 직전
                    단계 를 선택하세요
                </p>
                <p>학생이 응시 완료한 평가지를 보고 문제별 답안을 입력합니다</p>
                <p>진단 평가 분석표를 바탕으로 상담을 실시합니다 . 분석표 인쇄 가능</p>
                <p>진단평가 결과는 등록 회원의 학습 정보로 연동할 수 있습니다 . (1 회 한)</p>
                <p>※ 연동하지 않은 평가 결과는 개인 정보 보호 정책에 따라 1 년 후 삭제됩니다 .</p>
            </Box>

            <JindanWrap />

            <button className="btn">선택 삭제</button>
            <button className="btn">결과 등록</button>

            <DatePicker
                className="datepicker-base"
                onChange={(day) => {
                    setStart(day);
                }}
                value={start}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            <DatePicker
                className="datepicker-base"
                onChange={(day) => {
                    setStart(day);
                }}
                value={start}
                clearIcon={null}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
            />
            <input type="text" className="form-control" placeholder="이름" />
            <button className="btn">조회</button>

                <table>

                </table>



        </div>
    );
}

const JindanWrap = () => {
    let [year, setYear] = useState();
    let [half, setHalf] = useState();

    const yearChange = (ele) => {
        setYear(ele);
    };

    useEffect(() => {
        setHalf();
    }, [year]);

    // useEffect(()=>{
    //     if(year === "초등 2학년"){
    //         setHalf(["2학기"])
    //     }
    // },[year])

    return (
        <div>
            <JindanBox>
                <h4>진단 평가지</h4>
                <SelectBase
                    onChange={yearChange}
                    value={year}
                    width={120}
                    options={학년}
                    defaultValue="학년"
                />
                <SelectBase
                    onChange={(ele) => {
                        setHalf(ele);
                    }}
                    value={half}
                    width={120}
                    options={학기}
                    defaultValue="학기"
                />
                <button className="btn">인쇄</button>
            </JindanBox>
        </div>
    );
};

export default EvaluationJindanContent;
