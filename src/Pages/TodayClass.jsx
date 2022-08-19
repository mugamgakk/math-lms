import React, { useEffect, useState } from "react";
import ContentHeader from "../components/ContentHeader";
import SelectBox from "../components/ui/select/SelectBox";
import SearchBtn from "../components/ui/button/SearchBtn";
import DatePicker from "react-date-picker"; // 데이트 피커
import ChangeDate from "../components/ChangeDate";
import TodayClassItem from "./TodayClass/TodayClassItem";
import AssessmentModal from './TodayClass/AssessmentModal';
import AttModal from './TodayClass/AttModal';
import "../style/TodayClass/todayClass.scss";
import axios from "axios";




function TodayClass(){

    let [todayClassList,setTodayClassList] = useState([
        {
          id : 0,
          name : '강수학',
          nickName : 'kangsh',
          thum : null,
          book : '중1-1 아르케 1',
          class : '1-2. (진분수) ÷ (자연수)',
          state1 : '100%',
          state2 : '25/30',
          state3 : undefined,
          state4 : undefined,
          state5 : null,
          sodanwon: '1.소인수분해',
      },
      {
          id : 1,
          name : '강시후',
          nickName : 'kshhhh',
          thum : null,
          book : '중1-1 뜨레스',
          class : 'ㅣ-3. (가분수) ÷ (자연수)',
          state1 : '100%',
          state2 : '10/12',
          state3 : {
            assessment : false,
            newplay : true,
          },
          state4 : '25/25',
          state5 : 'Pass',
          sodanwon: '2.소인수분해',
          
      },
      {
          id : 2,
          name : '김민찬',
          nickName : 'minck',
          thum : null,
          book : '중2-2 엑사스',
          class : 'Ⅱ-3. 공배수와 최소공배수',
          state1 : '33%',
          state2 : '-/12',
          state3 : {
            assessment : true,
            uds : 5,
            send : 10
          },
          state4 : '5/25',
          state5 : '-/4',
          sodanwon: '3.소인수분해',

      },
      {
          id : 3,
          name : '김민찬',
          nickName : 'minck',
          thum : null,
          class : '중2-2 엑사스',
          book : 'Ⅱ-3. 공배수와 최소공배수',
          state1 : undefined,
          state2 : undefined,
          state3 : {
            assessment : true,
            uds : 5,
            send : 10
          },
          state4 : '5/25',
          state5 : null,
          sodanwon: '5.소인수분해',

      },
    ]);

    let [modalCount, setModalCount] = useState(0);
    let [checkState, setCheckState] = useState([]);

    // 모달 상태관리
    let [modalCondition,setModalCondition] = useState({
        attModal : false,
        assessmentModal : false
    });

    const closeModal = (target) => {
        setModalCondition({
            ...modalCondition,
            [target] : false,
        })
    }
    
    const openModal = (target) => {
        setModalCondition({
            ...modalCondition,
            [target] : !modalCondition[target],            
        });
    }


    const [reloadState,setReloadState] = useState(false);
    useEffect(()=>{},[reloadState])
    
    
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);


  
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
                            openModal={openModal}
                            setModalCount={setModalCount}
                            />
                        })
                    }

                </tbody>
            </table>
            {
                modalCondition.assessmentModal ? 
                <AssessmentModal 
                modalCount={modalCount} 
                todayClassList={todayClassList}
                closeModal={closeModal} /> 
                : null
            }
            {
                modalCondition.attModal ? 
                <AttModal 
                modalCount={modalCount}
                todayClassList={todayClassList}
                closeModal={closeModal}
                /> 
                : null
            }
        </div>
    )
}
export default TodayClass;