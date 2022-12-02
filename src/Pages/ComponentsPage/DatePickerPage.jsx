import React, { useState } from "react";
import DatePicker from "react-date-picker"; // 데이트 피커
import DateNext from "../../components/DateNext";
import LmsDatePicker from "../../components/LmsDatePicker";
import TimeDatePicker from "./TimeDatePicker";

import CustomDatePicker from "../../components/CustomDatePicker";
import CustomDatePickerMonth from "../../components/CustomDatePickerMonth";

function DatePickerPage() {
    const [value, onChange] = useState(new Date());
    const [openCalendar, setOpenCalendar] = useState(false);

    const [lmsDValue, setLmsDValue] = useState(new Date());

    const [next, setNext] = useState(new Date());

    const [test, setTest]= useState(new Date());

    return (
        <div style={{ marginTop: "100px" }}>


            <CustomDatePicker value={test} onChange={e=>{ setTest(e) }}/>
            <CustomDatePickerMonth value={test} onChange={e=>{ setTest(e) }}/>

            <div>
                <LmsDatePicker
                    value={lmsDValue}
                    onChange={(ele) => { setLmsDValue(ele) }}
                />
                <button className="btn">버튼</button>
            </div>

            <h2>PROPS</h2>
            <pre>
                {`
                maxDate : 최대 선택할수 있는 날짜 설정
                minDate : 최소 선택할수 있는 날짜 설정
                minDetail : 최대 선택할수 있는 날짜 범위
                minDetail : 최소 선택할수 있는 날짜 범위 ("month", "year", "decade" or
                "century".)
                onChange : onChange 파라미터에 변경시 날짜 들어있음
                value : 값
                width : width값 설정 기본값 150px
                disabled : 기본값 false

                ex : 
                const [lmsValue, setLmsValue] = useState(new Date());

                <LmsDatePicker width={"150px"} value={lmsDValue} onChange={(ele)=>{setLmsDValue(ele)}}/>

                `}
            </pre>

            <DateNext value={next} onChange={(day) => { setNext(day) }} />



            {/* 
            <div className="picker-group">
                <button
                    className="btn"
                    onClick={() => {
                        setReservationPicker(!reservationPicker);
                    }}
                >
                    예약피커
                </button>
                {reservationPicker && (
                    <TimeDatePicker
                        open={setReservationPicker}
                        onChange={(day) => {
                            setReservationValue(day);
                            setReservationPicker(false);
                        }}
                    />
                )}
                value : {reservationValue}
            </div> */}

            {/* <h4>calendar props</h4> */}
            <pre>
                {/* autoFocus : 마운트 시 포커스 될지 말지 (boolean) 
                    calendarIcon : 기본 아이콘 숨기기 (null) 
                    maxDate : 최대 선택할수 있는 날짜 설정 
                    clearIcon : 클리어 해주는 아이콘 삭제 (null) 
                    className : 클래스 넣기 
                    openCalendarOnFocus : 아이콘말고 인풋을 클릭했을때 열지말지 (boolean) 
                    onCalendarOpen : 캘린더가 열릴때 이벤트 (onCalendarOpen=
                    {() => {
                        alert("@@@@@@@");
                    }}
                    ) 
                    onCalendarClose : 캘린더가 닫힐때 이벤트 (onCalendarClose=
                    {() => {
                        alert("@@@@@@@");
                    }}
                    ) 
                    isOpen : props 로 캘린더 열기 
                    onChange : 값이 변경됐을때 함수 
                    format : 날짜 포맷 
                    closeCalendar : 값 선택후 닫을지 말지 (boolean) 
                      */}
            </pre>

            <h2>day js</h2>
            <pre>
                {`
                        dayjs('2018-08-08') 다양한 날씨 포맷을 넣어도 파씽해줌
                        dayjs('2018-08-08').set('month', 3) 달을 3월로 바꾸기
                        dayjs('2018-08-08').add(1, "y") 다음년도 날짜 얻기
                        dayjs('2018-08-08').subtract(1, "year") 작년 날짜 얻기
                        dayjs('2018-08-08').format("YYYY-MM-DD") 포맷 얻기 (근데 문자열임) 2022-02-02
                        dayjs('2018-08-08').get("y") 년도 얻기
                        

                        y : 년도,
                        M : 달,
                        w : 요일 , 
                        d : 일,
                        h : 시간,
                        m : 분,
                        S : 초
                        `}
            </pre>
        </div>
    );
}

export default DatePickerPage;
