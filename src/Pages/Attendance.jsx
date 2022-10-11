import React, { useState } from "react";
import ChangeDate from "../components/ChangeDate";
import ContentHeader from "../components/ContentHeader";
import DatePicker from "react-date-picker";
import AttendanceItem from './Attendance/AttendanceItem';
import AttendanceSearch from "./Attendance/AttendanceSearch";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function Attendance() {
    // 전체 체크
    let [allCheck, setAllCheck] = useState(0) 

    // 날짜
    let [date, setDate] = useState(new Date());

    // 반 리스트
    let [chulCheckList, setChulCheckList] = useState(null);

    let {data} = useSelector(state=>state.attendanceSlice);

    const changeDate = (day)=>{
        setDate(day)
    }

    useEffect(()=>{
        setChulCheckList(data)
    },[])

    return (
        <div className="container Attendance">

            <ContentHeader title="출석 체크" location={"마이페이지 > 수학 학습 관리 > 오늘의 수업"} />
            
            <ChangeDate value={date} onChange={changeDate} />

            <header className="table-header row">
                <div>    
                    <button
                        className="btn"
                        onClick={()=>{console.log(data)}}
                    >
                        저장
                    </button>
                </div>

                <AttendanceSearch data={data} chulCheckList={chulCheckList} setChulCheckList={setChulCheckList} />
                
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
                    {
                        chulCheckList && chulCheckList.map(list=>{
                            return (
                                <AttendanceItem list={list} key={list.id} allCheck={allCheck}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Attendance;
