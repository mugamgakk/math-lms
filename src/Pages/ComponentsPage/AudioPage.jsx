import React, { useRef } from "react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import SelectBase from "../../components/ui/select/SelectBase";
import 오디오입니동 from "../../test.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faPlay, faPause, faBackwardFast } from "@fortawesome/free-solid-svg-icons";
import { fileDown } from "../../methods/methods";

const speedOption = [1, 1.25, 1.5, 1.75, 2];

function AudioPage() {
    //  오디오
    let audio = useRef();
    // 오디오 진행바
    let audioBar = useRef();

    let [valumeItem, setValumeItem] = useState(0.5);
    let [minTime, setMinTime] = useState("0 : 00");
    let [maxTime, setMaxTime] = useState("0 : 00");

    let [listenSpeed, setListenSpeed] = useState(1000); // 1초에 한번

    let [speenValue, setSpeedValue] = useState(speedOption[0]);
    let [stateIcon, setStateIcon] = useState(faPause);

    let allTime = useRef(0);

    // 재생버튼
    const start = () => {
        let 오디오 = audio.current.audioEl.current;

        오디오.paused ? 오디오.play() : 오디오.pause();
        오디오.paused ? setStateIcon(faPlay) : setStateIcon(faPause);
    };

    // 오디오파일 준비 됐을시
    const audioReady = (e) => {
        let 오디오 = audio.current.audioEl.current;

        allTime.current = 오디오.duration;

        let 분 = parseInt(오디오.duration / 60);
        let 초 = Math.round(오디오.duration % 60);

        setMaxTime(`${분} : ${초}`);
    };

    // 볼륨 변경시 이벤트
    const volumeChange = (e) => {
        var 볼륨 = parseFloat(e.target.value) * 0.1;

        볼륨 = 볼륨.toFixed(1);

        볼륨 = parseFloat(볼륨);

        setValumeItem(볼륨);
        // console.log(볼륨)
        // 볼륨은 0 ~ 1
    };

    // 속도 바꿨을때
    const speedChange = (speed) => {
        let 오디오 = audio.current.audioEl.current;

        오디오.playbackRate = speed;
        setSpeedValue(speed);

        setListenSpeed(1000 / speed);
        // 오디오실행이벤트 속도를 바꿔주기 위해
    };

    // 진행 할때
    const audioIng = (time) => {
        let 현재시간퍼센트 = (time / allTime.current) * 100;
        audioBar.current.style.width = `${현재시간퍼센트}%`;

        const min = parseInt(time / 60);
        const sec = Math.round(time % 60);
        setMinTime(`${min} : ${sec < 10 ? "0" + sec : sec}`);
    };

    const clickChange = (e) => {
        const 오디오 = audio.current.audioEl.current;

        const rect = e.target.getBoundingClientRect();
        const width = rect.width;
        // ele width 값
        const offsetX = e.nativeEvent.offsetX;

        const widthRatio = offsetX / width;

        const toTime = Math.round(widthRatio * 오디오.duration);
        audioBar.current.style.width = `${toTime}%`;

        오디오.currentTime = toTime;
    };

    const forwardRadio = (time)=>{
        let 오디오 = audio.current.audioEl.current;
        let changeTime = 오디오.currentTime + time
        if(changeTime < 0){
            changeTime = 0
        }
        audioIng(changeTime)
        오디오.currentTime = changeTime

    }

    return (
        <div style={{ marginTop: "100px" }}>
            <h2>오디오 테스트</h2>
            <ReactAudioPlayer
                src={오디오입니동}
                autoPlay
                ref={audio}
                volume={valumeItem}
                onCanPlay={audioReady}
                listenInterval={listenSpeed}
                onListen={audioIng}
                onEnded={() => {
                    audioBar.current.style.width = `${100}%`;
                    setMinTime(maxTime);
                    setStateIcon(faPlay);
                }}
            />

            <input type="hidden" value={오디오입니동} />

            <div className="fj" style={{ width: "500px" }}>
                {minTime}
                <div className='audio-bar' onClick={clickChange}>
                    <div className='bar-range' ref={audioBar}></div>
                </div>
                {maxTime}
            </div>
            <div>
                볼륨 :
                <input
                    type="range"
                    min={0}
                    max={10}
                    value={valumeItem * 10}
                    onChange={volumeChange}
                />
                <button
                    onClick={() => {
                        forwardRadio(-5);
                    }}
                >
                    <FontAwesomeIcon icon={faBackwardFast} size="2x" />
                </button>
                <button className="mx-15" onClick={start}>
                    <FontAwesomeIcon icon={stateIcon} size="2x" />
                </button>
                <button
                    onClick={() => {
                        forwardRadio(5);
                    }}
                    style={{ transform: "rotate(180deg)" }}
                >
                    <FontAwesomeIcon icon={faBackwardFast} size="2x" />
                </button>
                <SelectBase
                    width={"100px"}
                    value={speenValue}
                    options={speedOption}
                    onChange={(el) => speedChange(el)}
                />
                <button
                    className='audio-download'
                    onClick={() => {
                        fileDown(오디오입니동);
                    }}
                >
                    <FontAwesomeIcon icon={faFileArrowDown} size="2x" />
                </button>
            </div>

            <h3>props</h3>

            <p>loop : 반복할건지 (type: boolean)</p>
            <p>muted : 음소거 (type: boolean)</p>
            <p>volume : 볼륨 (기본값 : 1.0)</p>

            <h2>이벤트</h2>
            <pre>
                {`
                    onCanPlay : 파일이 충분히 다운로드되어 재생을 시작할 수 있을 때 호출됩니다. 

                    onPause : 멈출때 이벤트
                    
                    onPlay : 시작 이벤트
    
                    onEnded:  끝까지 재생시 이벤트
    
                    onError : 오디오 에러시 이벤트

                    listenInterval : 1000 1초 설정후
                    onListen : 1초에 한번 실행되는 이벤트
                    `}
            </pre>
        </div>
    );
}

export default AudioPage;
