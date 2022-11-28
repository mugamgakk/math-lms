import React, { useEffect, useState, useRef } from "react";
import ScoreItem from './ScoreItem'
import ReactAudioPlayer from "react-audio-player";
import SelectBase from "../../components/ui/select/SelectBase";
import 오디오입니동 from "../../test.mp3";
import style from "../../style/style-module/Audio.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faPlay, faPause, faBackwardFast } from "@fortawesome/free-solid-svg-icons";
import { fileDown } from "../../methods/methods";
import ajax from "../../ajax";
import Icon from "../../components/Icon";

const speedOption = [1, 1.25, 1.5, 1.75, 2];

function AssessmentModal ({setAssModal}) {
    let assTit = [
       '개념 이해력',
       '전달력',
    ];

    let [totalData, setTotalData] = useState([7,7]);

    let [title,setTitle] = useState('');
    let [audioState,setAudioState] = useState();

    useEffect(()=>{
        ajax("/class.php/?mode=get_assessment", {
        }).then(res=>{
            console.log(res.data);
            setTotalData([res.data.uds,res.data.send]);
            setTitle(res.data.title);
            setAudioState(res.data.file);
        })
        
    },[])


    const formConfirm = () => {
        if(!window.confirm('이 단원의 수행 평가를 저장합니다.')) return false;

        ajax("/class.php/?mode=set_attitude", {

            cls_seq : 12345,
            uds : totalData[0],
            send : totalData[1],

        }).then(res=>{

           window.alert('제출완료');
           setAssModal(false);

        })
    }

    const numClick = (idx,num) => {
        let copy = [...totalData];
        copy[idx] = num;
        setTotalData([...copy]);        
    }
 
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
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header fj">
                    <h2 className="modal-title">수행 평가</h2>
                    <button className="btn" onClick={() => setAssModal(false)}><Icon icon={"close"} /></button>
                </div>
                <div className="modal-body">
                           {title}
                    {
                        audioState && (
                            <div className="audio">
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
                        <div className={style.audio_bar} onClick={clickChange}>
                            <div className={style.audio_bar_itme} ref={audioBar}></div>
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
                            className={style.download_btn}
                            onClick={() => {
                                fileDown(오디오입니동);
                            }}
                        >
                            <FontAwesomeIcon icon={faFileArrowDown} size="2x" />
                        </button>
                        </div>
                    </div>
                        )
                    }
                    <h5>학생의 개념 이해력과 전달력 점수를 입력해 주세요.</h5>
                    <table>
                        <tbody>
                        {
                            assTit.map((tit,idx)=> {
                                return(
                                    <tr key={idx}>
                                        <th>{tit}</th>
                                        <td>
                                            <ScoreItem numClick={numClick} idx={idx} totalData={totalData}/>
                                        </td>
                                    </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button className='btn-grey-border mr-4' onClick={() => setAssModal(false)}>취소</button>
                    <button className='btn-orange' onClick={formConfirm}>저장</button>
                </div>
            </div>
            </div>
    )
}
export default AssessmentModal;