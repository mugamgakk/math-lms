import * as React from "react";
import PrismaZoom from "react-prismazoom"; // 이미지 확대 축소
import DatePicker from "react-date-picker"; // 데이트 피커
import ChangeDate from '../components/ChangeDate';

function Components() {
    let prizmaZoom = React.useRef();
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);


    return (
        <div className="container">
            <div style={{ width: "300px", height: "200px", overflow: "hidden" }}>
                <PrismaZoom ref={prizmaZoom}>
                    <img
                        src="https://img.insight.co.kr/static/2018/02/12/700/vrk5z3a409vt02d3jvb7.jpg"
                        style={{ width: "300px", height: "200px", objectFit: "cover" }}
                    />
                </PrismaZoom>
            </div>
            <button
                onClick={() => {
                    prizmaZoom.current.zoomIn(1);
                }}
            >
                플러스
            </button>
            <button
                onClick={() => {
                    prizmaZoom.current.zoomOut(1);
                }}
            >
                마이너스
            </button>
            {/* 이미지 축소 확대 */}

            <br />
            <br />
            <br />
            <br />
                

            <ChangeDate value={value} onChange={onChange} />


            <div>
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

                <br />
                <br />

                    <h4>calendar props</h4>
                <p>
                    autoFocus : 마운트 시 포커스 될지 말지 (boolean) <br />
                    calendarIcon : 기본 아이콘 숨기기 (null) <br />
                    maxDate : 최대 선택할수 있는 날짜 설정 <br />
                    clearIcon : 클리어 해주는 아이콘 삭제 (null) className : 클래스 넣기 <br />
                    openCalendarOnFocus : 아이콘말고 인풋을 클릭했을때 열지말지 (boolean) <br />
                    onCalendarOpen : 캘린더가 열릴때 이벤트 (onCalendarOpen=
                    {() => {
                        alert("@@@@@@@");
                    }}
                    ) <br />
                    onCalendarClose : 캘린더가 닫힐때 이벤트 (onCalendarClose=
                    {() => {
                        alert("@@@@@@@");
                    }}
                    ) <br />
                    isOpen : props 로 캘린더 열기 <br/>
                    onChange : 값이 변경됐을때 함수 <br/>
                    format : 날짜 포맷 <br/>
                    closeCalendar : 값 선택후 닫을지 말지 (boolean) <br/>
                    minDetail : 최소 선택할수 있는 날짜 범위 ("month", "year", "decade" or "century".)
                </p>
            </div>
        </div>
    );
}

export default Components;
