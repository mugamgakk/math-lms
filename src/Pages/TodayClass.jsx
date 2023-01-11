// yeonju
import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../components/ContentHeader";
import ajax from "../ajax";
import Tr from "./TodayClass/TodayClassTr";
import DateNext from "../components/DateNext";
import Icon from "../components/Icon";
import CustomDatePicker from "../components/CustomDatePicker";
import ClassSelect from "../components/ui/select/ClassSelect";
import dayjs from "dayjs";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchData } from "../methods/methods";
import SkeletonTable from "../components/SkeletonTable";


function TodayClass() {
    const navigate = useNavigate();

    // 날짜
    let [date, setDate] = useState(new Date());
    // 검색
    let [search, setSearch] = useState("");
    // 반선택
    let [classList, setClassList] = useState([]);
    let [scroll, setScroll] = useState();

    const param = {
        mode: "get_today_class_i",
        ymd: dayjs(date).format("YYYY-MM-DD"),
        class_cd: classList.map((a) => a.class_cd),
        qstr: search,
    };

    const todayClassData = useQuery(["getTodayClass",date, classList] , () => axios("/json/todayClass_table.json"),{
        refetchOnWindowFocus : false
    });
    // const todayClassData = useQuery(["getTodayClass",date, classList] , () => fetchData("class", param));

    // console.log(todayClassData.data)

    const scrollCheck = () => {
        let TR = document.querySelectorAll(".scrollWrap > .item");
        let height = 0;

        for (let ele of TR) {
            height += ele.clientHeight;
        }

        if (550 <= height) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        setScroll(scrollCheck);
    });

    return (
        <>
            <ContentHeader
                title={"오늘의 수업"}
                location={["마이페이지", "수학 학습 관리"]}
                icon="todayClass"
                current={"오늘의 수업"}
            />
            <div className="TodayClass bg layout-height">
                <div className="date-area">
                    <DateNext
                        value={date}
                        onChange={(day) => setDate(day)}
                        style={{ marginRight: "10px" }}
                    />
                    <CustomDatePicker
                        value={date}
                        onChange={(day) => {
                            setDate(day);
                        }}
                        maxDate={new Date()}
                    />
                </div>
                <div className="tableWrap">
                    <header className="table-top row fj">
                        <div className="warning fa">
                            <Icon
                                icon={"warning"}
                                style={{ color: "#eb615a", marginRight: "6px" }}
                            />
                            학생명(아이디) 클릭 시 학생 교재별 상세 보기에서 오답 정복하기와 학습
                            분석표 생성 및 출력이 가능합니다.
                        </div>

                        <div className="d-flex">
                            <ClassSelect
                                className={"mr-10"}
                                defaultValue="반 선택"
                                value={classList}
                                onChange={(ele) => {
                                    setClassList(ele);
                                }}
                                width="212px"
                            />
                            <input
                                type="text"
                                className="textInput mr-10"
                                placeholder="학생명(아이디)"
                                style={{ width: "200px" }}
                                value={search}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        todayClassData.refetch();
                                    }
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <button
                                type="button"
                                className="btn-search btn-green btn-icon mr-10"
                                style={{ width: "81px" }}
                                onClick={()=>{ todayClassData.refetch() }}
                            >
                                <Icon icon={"search"} />
                                검색
                            </button>
                            <button className="btn-grey btn-icon" onClick={()=>{ todayClassData.refetch() }}>
                                <Icon icon={"reload"} />
                                새로 고침
                            </button>
                        </div>
                    </header>

                    <div className="tableHead fa">
                        <div style={{ width: "9.33%" }}>학생명 (아이디)</div>
                        <div style={{ width: "9.33%" }}>교재</div>
                        <div style={{ width: "32%" }}>단원</div>
                        <div style={{ width: "40%" }} className="row f-column">
                            <div className="state">수행 현황</div>
                            <div className="row b-none">
                                <div style={{ width: "20%" }}>개념 강의</div>
                                <div style={{ width: "20%" }}>개념 확인</div>
                                <div style={{ width: "20%" }}>개념 설명</div>
                                <div style={{ width: "20%" }}>유형 학습</div>
                                <div className="b-none" style={{ width: "20%" }}>
                                    맞춤 클리닉
                                </div>
                            </div>
                        </div>
                        <div className="b-none" style={{ width: "9.33%" }}>
                            학습 완료
                        </div>
                        {scroll && <div className="b-none" style={{ width: "17px" }}></div>}
                    </div>
                    <div className="scrollWrap">
                        {
                            todayClassData.isFetching
                            ? (
                                <table className="custom-table">
                                    <tbody>
                                        <SkeletonTable R={10} width={["9.25%", "9.3%", "32.05%", "40%", "9.33%"]} />
                                    </tbody>
                                </table>
                            )
                            : (
                                todayClassData.data?.data.map((a,i)=>{
                                    return (
                                        <div className="item flex" key={i}>
                                            <div className="name br bb" style={{ width: "9.33%" }}>
                                                <strong
                                                    onClick={() => navigate("/detail-class/management")}
                                                >
                                                    {a.name}
                                                </strong>
                                                {a.nickName}
                                            </div>
                                            <div style={{ width: "90.67%" }}>
                                                {a.book.map((b, i) => {
                                                    return (
                                                        <div className="book flex" key={i}>
                                                            <span
                                                                className="book-name fc br bb"
                                                                style={{ width: "10.29%" }}
                                                            >
                                                                {b.bookTit}
                                                            </span>
                                                            <div
                                                                className="classTitWrap"
                                                                style={{ width: "89.71%" }}
                                                            >
                                                                {b.className.map((c, i) => {
                                                                    return (
                                                                        <div
                                                                            className="stateWrap flex bb"
                                                                            key={i}
                                                                        >
                                                                            <span
                                                                                className="classTit fa br"
                                                                                style={{
                                                                                    width: "39.4%",
                                                                                    paddingLeft: "9px",
                                                                                }}
                                                                            >
                                                                                {c.tit}
                                                                            </span>
                                                                            <Tr
                                                                                key={c.tit}
                                                                                data={c}
                                                                                bookTit={b.bookTit}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodayClass;
