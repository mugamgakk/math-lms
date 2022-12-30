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

function TodayClass() {
    const navigate = useNavigate();
    // 리스트
    let [todayList, setTodayList] = useState(null);
    // 날짜
    let [date, setDate] = useState(new Date());
    // 검색
    let [search, setSearch] = useState('');
    // 반선택
    let [group, setGroup] = useState();

    const getList = async () => {
        const data = {
            mode: "get_today_class",
            ymd: dayjs(date).format("YYYY-MM-DD"),
            class_cd: 137283785634112704,
            qstr: search,
        };

        let res = await ajax("/class.php", { data });

        // console.log(res);
        let { today_list } = res.data;

        setTodayList(today_list);
    };

    useEffect(() => {
        getList();
    }, [date, group]);

    return (
        <>
            <ContentHeader
                title={"오늘의 수업"}
                location={["마이페이지", "수학 학습 관리"]}
                icon="todayClass"
                current={"오늘의 수업"}
            />
            <div className="TodayClass bg">
                <div className="date-area">
                    <DateNext
                        value={date}
                        onChange={(day) => setDate(day)}
                        style={{ marginRight: "4px" }}
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
                            학생명(아이디) 클릭 시 학생 교재별 상세 보기에서 오답 정복하기와 학습 분석표
                            생성 및 출력이 가능합니다.
                        </div>

                        <div className="d-flex">
                            {/* <ClassSelect
                                width={"200px"}
                                value={group}
                                onChange={(ele) => {
                                    setGroup(ele);
                                }}
                            /> */}
                            <input
                                type="text"
                                className="textInput mr-10 ml-10"
                                placeholder="학생명(아이디)"
                                style={{ width: "200px" }}
                                value={search}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        getList();
                                    }
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <button type="button" className="btn-search btn-green mr-10" onClick={getList}>
                                <Icon icon={"search"} />
                                검색
                            </button>
                            <button className="btn-grey btn-icon" onClick={getList}>
                                <Icon icon={"reload"} />
                                새로고침
                            </button>
                        </div>
                    </header>
                    <table className="tableC">
                        <thead>
                            <tr>
                                <th style={{ width: 'calc(100% - 17px) * 0.933' }} rowSpan={2}>학생명 (아이디)</th>
                                <th style={{ width: '9.33%' }} rowSpan={2}>교재</th>
                                <th style={{ width: '32%' }} rowSpan={2}>단원</th>
                                <th style={{ width: '40%' }} colSpan={5} className="bb">
                                    수행 현황
                                </th>
                                <th style={{ width: '9.33%' }} rowSpan={2} className="b-none">
                                    학습 완료
                                </th>
                                <th style={{ width:"17px" }} rowSpan={2}></th>
                            </tr>
                            <tr>
                                <th style={{ width: '8%' }}>개념 강의</th>
                                <th style={{ width: '8%' }}>개념 확인</th>
                                <th style={{ width: '8%' }}>개념 설명</th>
                                <th style={{ width: '8%' }}>유형 학습</th>
                                <th style={{ width: '8%' }}>맞춤 클리닉</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="scrollWrap scroll">
                        {todayList &&
                            todayList.map((a, i) => {
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
                                            {a.book.map((a, i) => {
                                                return (
                                                    <div className="book flex" key={i}>
                                                        <span
                                                            className="book-name fc br bb"
                                                            style={{ width: "10.29%" }}
                                                        >
                                                            {a.bookTit}
                                                        </span>
                                                        <div
                                                            className="classTitWrap"
                                                            style={{ width: "89.71%" }}
                                                        >
                                                            {a.className.map((a, i) => {
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
                                                                            {a.tit}
                                                                        </span>
                                                                        <Tr key={a.tit} data={a} />
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
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodayClass;
