import React, { useState, useRef } from "react";
import LbtCheckbox from "../LbtCheckbox";
import useLbtStore from "../../../store/useLbtStore";
import { falseModal } from "../../../methods/methods";
import Icon from "../../../components/Icon";
import Checkbox from "../../../components/Checkbox";
import { useEffect } from "react";
import ajax from "../../../ajax";
import logo from "../../../assets/img/parallax-logo.png";
import LbtCheckboxResult from "../LbtCheckboxResult";
import ReactToPrint from "react-to-print";
import { htmlToImg } from "../../../methods/methods";

function LbtModal({ setCreateModal }) {
    const dataLists = useLbtStore((state) => state.dataLists);
    const checkedList = useLbtStore((state) => state.checkedList);
    const allCheckfnL = useLbtStore((state) => state.allCheckfnL);

    const printComponent = React.useRef();
    const imgComponent = React.useRef();

    let [viewItem, setViewItem] = useState(null);

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

        setViewItem(checkedList);
    };

    const isAllCheck = () => {
        let result1 = 0;
        let result2 = 0;
        dataLists.forEach((a) => {
            result1 += a.optionItem.length;
        });
        checkedList.forEach((a) => {
            result2 += a.optionItem.length;
        });

        return result1 === result2;
    };

    useEffect(() => {
        getRegult();
    }, []);

    return (
        <div
            className="modal LbtModal"
            onClick={(e) => {
                falseModal(e, setCreateModal);
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">분석표 생성</h4>
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
                    <div className="modal-name">
                        <strong className="name">종합 학습 분석표 생성하기</strong>
                    </div>
                    <div className="LbtModal-body">
                        <div className="left">
                            <div className="head">※ 평균 표시</div>
                            <div className="body">
                                <div className="part">
                                    <div className="part-title">
                                        <Checkbox
                                            color="orange"
                                            id="all"
                                            checked={isAllCheck()}
                                            onChange={(e) => {
                                                allCheckfnL(e.target.checked);
                                            }}
                                            disabled
                                        />
                                        <label htmlFor="all">모두 선택 / 해제</label>
                                    </div>
                                </div>
                                {dataLists.map((a, i) => {
                                    return (
                                        <LbtCheckboxResult
                                            ele={a}
                                            key={i}
                                            checkedItem={checkedList[i]}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="right lbt-print">
                            <div className="head">사유하고 질문하라. Parallax Thingking!</div>
                            <div className="body">
                                <div className="body-title fj">
                                    <h3>
                                        패럴랙스 수학{" "}
                                        <span className="text-orange">교과서별 내신적중</span>{" "}
                                        분석표
                                    </h3>
                                    <img src={logo} alt="" />
                                </div>
                                <table className="lbt">
                                    <colgroup>
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                        <col style={{ width: "80px" }} />
                                        <col style={{ width: "auto" }} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>캠퍼스</th>
                                            <td>대치 캠퍼스</td>
                                            <th>학년</th>
                                            <td>중2</td>
                                        </tr>
                                        <tr>
                                            <th>이름</th>
                                            <td>강수학</td>
                                            <th>교과서</th>
                                            <td>교학사 외</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {viewItem &&
                                    viewItem.map((a, i) => {
                                        return (
                                            <div key={i} className="lbt-content">
                                                {a.optionItem.length > 0 && (
                                                    <div>
                                                        {a.optionItem.map((dd, i) => {
                                                            return (
                                                                <>
                                                                    <div className="title" key={i}>
                                                                        {dd.label}
                                                                    </div>
                                                                    <table className="lbt">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>교과서</th>
                                                                                <th>단원명</th>
                                                                                <th>점수</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td rowSpan={3}>
                                                                                    교학사
                                                                                </td>
                                                                                <td className="text-left">
                                                                                    Ⅲ. 일차함수 1.
                                                                                    일차함수와
                                                                                    그래프
                                                                                </td>
                                                                                <td>88점</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="text-left">
                                                                                    Ⅲ. 일차함수 1.
                                                                                    일차함수와
                                                                                    그래프
                                                                                </td>
                                                                                <td>88점</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="text-left">
                                                                                    Ⅲ. 일차함수 1.
                                                                                    일차함수와
                                                                                    그래프
                                                                                </td>
                                                                                <td>88점</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        {/* 인쇄하기 영역 */}
                        <div className="d-none">
                            <div className="right lbt-print" ref={printComponent}>
                                <div className="head">사유하고 질문하라. Parallax Thingking!</div>
                                <div className="body" style={{ height: "auto" }}>
                                    <div className="body-title fj">
                                        <h3>
                                            패럴랙스 수학
                                            <span className="text-orange">교과서별 내신적중</span>
                                            분석표
                                        </h3>
                                        <img src={logo} alt="" />
                                    </div>
                                    <table className="lbt">
                                        <colgroup>
                                            <col style={{ width: "80px" }} />
                                            <col style={{ width: "auto" }} />
                                            <col style={{ width: "80px" }} />
                                            <col style={{ width: "auto" }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>캠퍼스</th>
                                                <td>대치 캠퍼스</td>
                                                <th>학년</th>
                                                <td>중2</td>
                                            </tr>
                                            <tr>
                                                <th>이름</th>
                                                <td>강수학</td>
                                                <th>교과서</th>
                                                <td>교학사 외</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {viewItem &&
                                        viewItem.map((a, i) => {
                                            return (
                                                <div key={i} className="lbt-content">
                                                    {a.optionItem.length > 0 && (
                                                        <div>
                                                            {a.optionItem.map((dd, i) => {
                                                                return (
                                                                    <>
                                                                        <div
                                                                            className="title"
                                                                            key={i}
                                                                        >
                                                                            {dd.label}
                                                                        </div>
                                                                        <table className="lbt">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>교과서</th>
                                                                                    <th>단원명</th>
                                                                                    <th>점수</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td rowSpan={3}>
                                                                                        교학사
                                                                                    </td>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        {/* jpg 다운로드 영역 */}
                        <div style={{position : "absolute", left : "1500px"}}>
                            <div className="right lbt-print" ref={imgComponent}>
                                <div className="head">사유하고 질문하라. Parallax Thingking!</div>
                                <div className="body" style={{ height: "auto" }}>
                                    <div className="body-title fj">
                                        <h3>
                                            패럴랙스 수학
                                            <span className="text-orange">교과서별 내신적중</span>
                                            분석표
                                        </h3>
                                        <img src={logo} alt="" />
                                    </div>
                                    <table className="lbt">
                                        <colgroup>
                                            <col style={{ width: "80px" }} />
                                            <col style={{ width: "auto" }} />
                                            <col style={{ width: "80px" }} />
                                            <col style={{ width: "auto" }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>캠퍼스</th>
                                                <td>대치 캠퍼스</td>
                                                <th>학년</th>
                                                <td>중2</td>
                                            </tr>
                                            <tr>
                                                <th>이름</th>
                                                <td>강수학</td>
                                                <th>교과서</th>
                                                <td>교학사 외</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {viewItem &&
                                        viewItem.map((a, i) => {
                                            return (
                                                <div key={i} className="lbt-content">
                                                    {a.optionItem.length > 0 && (
                                                        <div>
                                                            {a.optionItem.map((dd, i) => {
                                                                return (
                                                                    <>
                                                                        <div
                                                                            className="title"
                                                                            key={i}
                                                                        >
                                                                            {dd.label}
                                                                        </div>
                                                                        <table className="lbt">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>교과서</th>
                                                                                    <th>단원명</th>
                                                                                    <th>점수</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td rowSpan={3}>
                                                                                        교학사
                                                                                    </td>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="text-left">
                                                                                        Ⅲ. 일차함수
                                                                                        1.
                                                                                        일차함수와
                                                                                        그래프
                                                                                    </td>
                                                                                    <td>88점</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
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

                    <button
                        className="btn-brown  mr-10"
                        onClick={() => {
                            htmlToImg(imgComponent.current);
                        }}
                    >
                        다운로드
                    </button>

                    <ReactToPrint
                        trigger={() => <button className="btn-orange">인쇄하기</button>} //  trigger : 인쇄를 명령할 컴포넌트를 넣어주기
                        content={() => printComponent.current} // content : 인쇄 대상 ref를 넘겨주기
                        // documentTitle= "pdf이름" //pdf 로 저장할때 이름
                    />
                </div>
            </div>
        </div>
    );
}

export default LbtModal;
