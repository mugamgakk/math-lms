import * as React from "react";
import PrismaZoom from "react-prismazoom"; // 이미지 확대 축소
import DatePicker from "react-date-picker"; // 데이트 피커
import ChangeDate from "../components/ChangeDate";
import ReactAudioPlayer from 'react-audio-player';
import ReactToPrint from 'react-to-print'; // pdf, 인쇄



function Components() {
    let prizmaZoom = React.useRef();
    const [value, onChange] = React.useState(new Date());
    const [openCalendar, setOpenCalendar] = React.useState(false);

    // 인쇄될 컴포넌트를 가져온다
    const printComponent = React.useRef();


//  오디오 
    let audio = React.useRef();
    let [playState,setPlaystate] = React.useState(true);


    const start = ()=>{

        let 오디오 = audio.current.audioEl.current;

        playState ? 오디오.play() : 오디오.pause();
        setPlaystate(!playState);

    }

    return (
        <div className="container">
            <h2>이미지 축소 확대</h2>

            <div style={{ width: "300px", height: "200px", overflow: "hidden" }}>
                <PrismaZoom ref={prizmaZoom}>
                    <img
                        src="https://img.insight.co.kr/static/2018/02/12/700/vrk5z3a409vt02d3jvb7.jpg"
                        style={{ width: "300px", height: "200px", objectFit: "cover" }}
                    />
                </PrismaZoom>
            </div>
            <button
                className="btn"
                onClick={() => {
                    prizmaZoom.current.zoomIn(1);
                }}
            >
                플러스
            </button>
            <button
                className="btn"
                onClick={() => {
                    prizmaZoom.current.zoomOut(1);
                }}
            >
                마이너스
            </button>
            {/* 이미지 축소 확대 */}



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
                <br />

                <h4>calendar props</h4>
                <p>
                    autoFocus : 마운트 시 포커스 될지 말지 (boolean) <br />
                    calendarIcon : 기본 아이콘 숨기기 (null) <br />
                    maxDate : 최대 선택할수 있는 날짜 설정 <br />
                    clearIcon : 클리어 해주는 아이콘 삭제 (null) <br />
                    className : 클래스 넣기 <br />
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
                    isOpen : props 로 캘린더 열기 <br />
                    onChange : 값이 변경됐을때 함수 <br />
                    format : 날짜 포맷 <br />
                    closeCalendar : 값 선택후 닫을지 말지 (boolean) <br />
                    minDetail : 최소 선택할수 있는 날짜 범위 ("month", "year", "decade" or
                    "century".)
                </p>
            </div>

    

            <div style={{marginTop : "100px"}}>
                <h2>Pdf 만들기</h2>
                <ReactToPrint
                    trigger={() => <button className="btn">프린트 버튼</button>} //  trigger : 인쇄를 명령할 컴포넌트를 넣어주기
                    content={() => printComponent.current} // content : 인쇄 대상 ref를 넘겨주기
                />

            {/* // A4 사이즈를 width 210 mm 를 px로 793.701px 이다 */}
                <div ref={printComponent} style={{width : "793.701px"}}>
                    인쇄나 pdf로 만들 요소
                </div>

            </div>

            <div style={{marginTop : "100px"}}>
                <h2>오디오 테스트</h2>
                <ReactAudioPlayer
                src="test.mp3"
                autoPlay
                ref={audio}
                controls
                />

                <button className="btn" onClick={start}>재생 버튼</button>

                <div>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Components;
