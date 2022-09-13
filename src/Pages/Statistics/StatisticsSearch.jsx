import React, { useState } from "react";
import SelectBox from "../../components/ui/select/SelectBox";
import DatePicker from "react-date-picker";
import { useEffect } from "react";
import { useRef } from "react";

function StatisticsSearch({value, setValue}) {
    let [checkState, setCheckState] = useState([]);
    let [studentName, setStudentName] = useState("");
    let [startDay, setStartDay] = useState(new Date());
    let [lastDay, setLastDay] = useState(new Date());

    let initialData = useRef(value);

    // useEffect(()=>{
    //         let a = initialData.current.filter(a=>{
    //             return checkState.includes(a.ban)
    //         })
    
    //         setValue(a)
    // },[checkState])

    return (
        <div className="StatisticsSearch">
            <SelectBox width={"200px"} checkState={checkState} setCheckState={setCheckState} />

            <DatePicker
                className="datepicker-base"
                clearIcon={null}
                onChange={(day) => {
                    setStartDay(day);
                }}
                value={startDay}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                minDetail="month"
            />
            <DatePicker
                className="datepicker-base"
                clearIcon={null}
                onChange={(day) => {
                    setLastDay(day);
                }}
                value={lastDay}
                openCalendarOnFocus={false}
                format={"yyyy-MM-dd"}
                minDetail="month"
            />
            <input
                type="text"
                className="form-control"
                placeholder="학생 이름"
                value={studentName}
                onChange={(e) => {
                    setStudentName(e.target.value);
                }}
            />
            <button type="button" className="btn">
                조회
            </button>
        </div>
    );
}

export default StatisticsSearch;
