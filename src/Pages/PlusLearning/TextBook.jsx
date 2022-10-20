import React, {useState} from "react";
import UserInfo from "../../components/UserInfo";
import useStudentsStore from "../../store/useStudentsStore";
import TextBookSearch from "./TextBookSearch";
import PlusTrData from "./PlusTrData";

const data = [
    {
        id: 1,
        대단원: "수와 식의 계산",
        주제: "거듭제곱(1)",
        상태: "학습완료",
        채점: { point: 8, 재응시: 2 },
        시험지: true,
    },
    {
        id: 2,
        대단원: "수와 식의 계산",
        주제: "거듭제곱(2)",
        상태: "오픈전",
        채점: "시험지 채점",
        시험지: true,
    },
    {
        id: 3,
        대단원: "수와 식의 계산",
        주제: "03> 제곱인 수 만들기",
        상태: "학습중",
        채점: "온라인 채점",
        시험지: false,
    },
    {
        id: 4,
        대단원: "수와 식의 계산",
        주제: "04> 약수의 개수 구하기",
        상태: "학습완료",
        채점: { point: 8, 재응시: 2 },
        시험지: false,
    },
];


function TextBook() {
    let [plusData, setPlusData] = useState(data);
    const clickStudent = useStudentsStore(state=>state.clickStudent)


    return (
        <div>
            <UserInfo clickStudent={clickStudent} />
            <p>
                ※ 학습하는 교재의 학년 , 학기에 해당하는 교과서별 내신적중 를 오픈 , 출력할 수
                있습니다 학년 학기별 공통
            </p>
            <p>※ 기간을 설정하여 결과 리포트를 인쇄할 수 있습니다. (저장되지 않음)</p>

            <div className="d-flex fj mb-3">
                <div>
                    <button className="btn">선택 오픈</button>
                    <button className="btn">선택 인쇄</button>
                    <button className="btn">결과 리포트</button>
                </div>
                <TextBookSearch />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>대단원</th>
                        <th>주제</th>
                        <th>상태</th>
                        <th>채점</th>
                        <th>채점</th>
                    </tr>
                </thead>
                <tbody>
                    {plusData.map((res) => {
                        return <PlusTrData key={res.id} type="textBook" res={res} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TextBook;
