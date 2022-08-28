import * as React from "react";
import DatePicker from "react-date-picker"; // 데이트 피커
import ChangeDate from "../../components/ChangeDate";



function DatePickerPage() {
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);




    return ( 
        <div style={{marginTop : "100px"}}>
                <h2>DatePicker</h2>
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

                
                <br />

                <h4>calendar props</h4>
                <pre>
                    {` 
                    autoFocus : 마운트 시 포커스 될지 말지 (boolean) 
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
                    minDetail : 최소 선택할수 있는 날짜 범위 ("month", "year", "decade" or
                    "century".) 
                    `}
                </pre>
            </div>
     );
}

export default DatePickerPage;