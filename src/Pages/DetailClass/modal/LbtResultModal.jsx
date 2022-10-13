import React, {useRef} from "react";
import style from "../../../style/style-module/lbtModal.module.scss";

const dataLists = [
    {
        option: "교재 학습 분석",
        optionItem: [
            "단원 학습 현황",
            "단원별 정답률 및 향상도/수행평가",
            "행동 영역 분석",
            "내용 영역 분석",
        ],
    },
    {
        option: "플러스 학습 분석",
        optionItem: ["서술형 따라잡기", "교과서별 내신적중"],
    },
    {
        option: "평가 분석",
        optionItem: ["단원평가 분석", "총괄평가 분석"],
    },
    {
        option: "학습 태도 분석",
        optionItem: ["학원 출경 상황", "온라인 학습 분석", "획득한 학습 포인트", "학습 태도 평가"],
    },
    {
        option: "선생님의견",
        optionItem: ["123"],
    },
];

function LbtResultModal({data, setModal}) {

    const printComponent = useRef();

    return (
        <div className={style.modal}>
            <div className={style.content}>
                <h4 className="border-bottom pb-2 mb-2">종합 학습 분석표 보기 / 인쇄</h4>
                <div className="row">
                    <div className={style.left}>
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
                        {
                            dataLists.map((ele,i)=>{
                                return <CheckList checkbox={ele} key={"check" + i} data={data.data[i]}/>
                            })
                        }
                    </div>
                    <div className={style.rightWrap}>
                        <ContentList data={data}/>
                    </div>
                </div>
                <div className={style.btnGroup}>
                    <button className="btn">인쇄하기</button>
                    <button className="btn">다운로드</button>
                    <button className="btn" onClick={()=>{setModal(false)}}>닫기</button>
                </div>
            </div>
        </div>
    );
}

const CheckList = ({checkbox, data})=>{
    let {optionItem} = data;


    return (
        <div style={{textAlign : "left"}}>
            <div>
                <label htmlFor={checkbox.option}>{checkbox.option}</label>
                <input
                    type="checkbox"
                    id={checkbox.option}
                    className={style.formConrol}
                    onChange={()=>{}}
                    checked={optionItem.length == checkbox.optionItem.length}
                />
            </div>
            <ul className={style.contentList} style={{ marginLeft: "20px" }}>
                {checkbox.optionItem.map((a) => {
                    return (
                        <li key={a}>
                            <label htmlFor={a}>{a}</label>
                            <input
                                type="checkbox"
                                id={a}
                                onChange={()=>{}}
                                checked={optionItem.includes(a)}
                                className={style.formConrol}
                            
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

const ContentList = ({data})=>{
    const info = data.info;
    const result = data.data
    return (
        <div style={{ width: "210mm", textAlign: "center" }}>
            <h4>
                {info.makeDay} {info.maker}의 패럴랙스 수학 종합
                학습 분석표
            </h4>
            <table>
                <tbody>
                    <tr>
                        <th scope="row">캠퍼스</th>
                        <td>{info.capus}</td>
                        <th scope="row">학년</th>
                        <td>{info.age}</td>
                        <th scope="row">학습 기간</th>
                        <td>{info.date}</td>
                    </tr>
                    <tr>
                        <th scope="row">학습 교재</th>
                        <td colSpan={5}>{info.book}</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ textAlign: "left" }}>
                {
                    result.map((a,i) => {
                        return (
                            <div key={"contentWrap" + i}>
                                {a.optionItem.length !== 0 && <h3 key={a.option}>{a.option}</h3>}
                                {a.optionItem.map((dd,i) => {
                                    return (
                                        <div key={"list" + i}>
                                            <h4 key={dd}>{dd}</h4>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>2</td>
                                                        <td>3</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default LbtResultModal;
