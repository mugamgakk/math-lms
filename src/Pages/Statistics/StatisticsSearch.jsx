import React, { useState } from "react";
import SelectBox from "../../components/ui/select/SelectBox";
import DatePicker from "react-date-picker";

function StatisticsSearch({getPointData}) {
    let [studentName, setStudentName] = useState("");
    let [startDay, setStartDay] = useState(new Date());
    let [lastDay, setLastDay] = useState(new Date());

    const searchStudents = ()=>{
        getPointData()
    }


    return (
        <div className="StatisticsSearch">
            <SelectBox width={"200px"} />

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
            <button type="button" className="btn" onClick={searchStudents}>
                조회
            </button>
        </div>
    );
}

export default StatisticsSearch;
