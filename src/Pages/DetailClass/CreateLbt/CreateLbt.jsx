import dayjs from "dayjs";
import React from "react";
import useLbtStore from "../../../store/useLbtStore";

const today = new Date();

function CreateLbt() {
    let createLbtInfo = useLbtStore((state) => state.createLbtInfo);
    let createLbtData = useLbtStore((state) => state.createLbtData);

    // console.log(createLbtData)

    return (
        <div style={{ width: "210mm", textAlign: "center" }}>
            <h4>
                {dayjs(today).$y}년 {dayjs(today).$M}월 {createLbtInfo.name}의 패럴랙스 수학 종합
                학습 분석표
            </h4>
            <table>
                <tbody>
                    <tr>
                        <th scope="row">캠퍼스</th>
                        <td>대치 캠퍼스</td>
                        <th scope="row">학년</th>
                        <td>{createLbtInfo.ele}</td>
                        <th scope="row">학습 기간</th>
                        <td>{createLbtInfo.day}</td>
                    </tr>
                    <tr>
                        <th scope="row">학습 교재</th>
                        <td colSpan={5}>{createLbtInfo.book.join(", ")}</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ textAlign: "left" }}>
                {createLbtData &&
                    createLbtData?.map((a) => {
                        return (
                            <>
                                {a.optionItem.length !== 0 && <h3 key={a.option}>{a.option}</h3>}
                                {a.optionItem?.map((dd) => {
                                    return (
                                        <>
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
                                        </>
                                    );
                                })}
                            </>
                        );
                    })}
            </div>
        </div>
    );
}

export default CreateLbt;
