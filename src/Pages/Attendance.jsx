import React, { useState } from "react";
import ChangeDate from "../components/ChangeDate";
import ContentHeader from "../components/ContentHeader";
import SelectBox from '../components/ui/select/SelectBox';
import SearchBtn from "../components/ui/button/SearchBtn";
import AttendanceItem from "./Attendance/AttendanceItem";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import axios from "axios";



function Attendance() {
    let [allCheck, setAllCheck] = useState(0),
        { attendanceList } = useSelector((state) => state.studentsAttendance),
        [value, onChange] = useState(new Date()),
        [openCalendar, setOpenCalendar] = useState(false);
    let [checkState, setCheckState] = useState([]);

    return (
        <div className="container Attendance">
            <ContentHeader title={"출석 체크"} />
            <ChangeDate value={value} onChange={onChange} />
            <DatePicker
                    className="datepicker-base"
                    onChange={(day)=>{onChange(day)}}
                    value={value}
                    maxDate={new Date()}
                    clearIcon={null}
                    isOpen={openCalendar}
                    openCalendarOnFocus={false}
                    format={"yyyy-MM-dd"}
                />
                <button
                    onClick={() => {
                        setOpenCalendar(!openCalendar);
                    }}
                >
                    캘린더 아이콘
                </button>

            <header className="table-header row">
                <div>
                    <button
                        className="btn"
                        onClick={()=>{
                            axios.post('/test', {data : attendanceList})
                        }}
                    >
                        저장
                    </button>
                </div>
                <div>
                    <SelectBox width={"200px"} checkState={checkState} setCheckState={setCheckState} />
                    
                    <input
                        type="text"
                        className="form-control"
                        placeholder="학생"
                        style={{ width: "200px", margin: "0 5px" }}
                    />
                    <SearchBtn />
                </div>
            </header>

            <table>
                <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "auto" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>학생명(아이디)</th>
                        <th>
                            출결 체크
                            <button
                                className="btn"
                                onClick={() => {
                                    setAllCheck(allCheck + 1);
                                }}
                            >
                                모두출석
                            </button>
                        </th>
                        <th>출결 사유</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceList.map((item, i) => {
                        return (
                            <AttendanceItem
                                item={item}
                                key={item.id}
                                index={i}
                                allCheck={allCheck}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Attendance;
