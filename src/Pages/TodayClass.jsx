import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentHeader from "../components/ContentHeader";
import SelectBox from "../components/ui/select/SelectBox";
import SearchBtn from "../components/ui/button/SearchBtn";
import DatePicker from "react-date-picker"; // 데이트 피커
import ChangeDate from "../components/ChangeDate";
import TodayClassItem from "./TodayClass/TodayClassItem";

import "../style/TodayClass/todayClass.scss";
import axios from "axios";




function TodayClass(){

    let todayClassList = useSelector(state => state.todayClassList);
    let [checkState, setCheckState] = useState([]);

    const [reloadState,setReloadState] = useState(false);
    useEffect(()=>{},[reloadState])
    
    
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);

    console.log('asdf');
  
    return(
        <div className="container TodayClass">
            <ContentHeader title={"오늘의 수업"} />
            <div className="date-area">
                <ChangeDate value={value} onChange={onChange} />
                <DatePicker
                    className="datepicker-base"
                    onChange={(day) => {
                        onChange(day);
                    }}
                    value={value}
                    maxDate={new Date()}
                    clearIcon={null}
                    isOpen={openCalendar}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <button
                    className="btn"
                    onClick={() => {
                        setOpenCalendar(!openCalendar);
                    }}
                >
                    캘린더 아이콘
                </button>
            </div>
            <header className="table-header row">
                <div>
                    <SelectBox width={"200px"} checkState={checkState} setCheckState={setCheckState}  />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="학생"
                        style={{ width: "200px", margin: "0 5px" }}
                    />
                    <SearchBtn />
                    <button
                        className="btn update"
                        onClick={() => setReloadState(!reloadState)}
                    >
                        새로고침
                    </button>
                </div>
            </header>
            <table style={{ margin: '5px 0 0 0' }}>
                <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan={2}>학생명(아이디)</th>
                        <th rowSpan={2}>교재</th>
                        <th rowSpan={2}>단원</th>
                        <th colSpan={5}>수행 현황</th>
                        <th rowSpan={2}>학습 완료</th>
                    </tr>
                    <tr>
                        <th>개념 강의</th>
                        <th>개념 확인/<br />기본 문제</th>
                        <th>개념 설명</th>
                        <th>유형 학습</th>
                        <th>맞춤 클리닉</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        todayClassList.map(list=>{
                            return <TodayClassItem 
                            list={list} 
                            key={list.id}
                            />
                        })
                    }

                </tbody>
            </table>
         
        </div>
    )
}
export default TodayClass;