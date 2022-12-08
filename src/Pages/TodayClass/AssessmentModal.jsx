import React, { useEffect, useState, useRef } from "react";
import ScoreItem from './ScoreItem'
import ReactAudioPlayer from "react-audio-player";
import 오디오입니동 from "../../test.mp3";
import { fileDown } from "../../methods/methods";
import ajax from "../../ajax";
import Icon from "../../components/Icon";
import pencil from "../../assets/pencil.svg";

const speedOption = [1.0, 1.25, 1.5, 1.75, 2.0];

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
     let volumeBar = useRef();
     let [valumeItem, setValumeItem] = useState(0.5);
     let [audioItem, setAudioItem] = useState(0);
     let [minTime, setMinTime] = useState("0 : 00");
     let [maxTime, setMaxTime] = useState("0 : 00");
      
     useEffect(()=>{
        if(audioItem > 0){
            audioBar.current.style.background = `linear-gradient(to right, #ea7851 0%, #ea7851 ${audioItem}%, #ccc ${audioItem}%, #ccc 100%)`;
        }
     },[audioItem]);


     useEffect(()=>{
        if(valumeItem === 0){
            setMuteState(true);
        }else{
            setMuteState(false);
        }
     },[valumeItem]);

     let [listenSpeed, setListenSpeed] = useState(1000); // 1초에 한번
 
     let [speenValue, setSpeedValue] = useState(speedOption[0]);
     let [playState, setPlayState] = useState(false);
     let [muteState, setMuteState] = useState(false);
     let allTime = useRef(0);
   
     // 재생버튼
     const start = () => {
         let 오디오 = audio.current.audioEl.current;
 
         오디오.paused ? 오디오.play() : 오디오.pause();
         오디오.paused ? setPlayState(true) : setPlayState(false);
     };
 
     // 오디오파일 준비 됐을시
     const audioReady = (e) => {
         let 오디오 = audio.current.audioEl.current;
 
         allTime.current = 오디오.duration;
        //  audioBar.current.value = 0;
        setAudioItem(0);
 
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

    //  mute 눌렀을때
 
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
        //  audioBar.current.value = 현재시간퍼센트;
        setAudioItem(현재시간퍼센트);
         const min = parseInt(time / 60);
         const sec = Math.round(time % 60);
         setMinTime(`${min} : ${sec < 10 ? "0" + sec : sec}`);
        //  console.log(audioItem);
     };
 
    //  const clickChange = (e) => {
    //      const 오디오 = audio.current.audioEl.current;
 
    //      const rect = e.target.getBoundingClientRect();
    //      const width = rect.width;
    //      // ele width 값
    //      const offsetX = e.nativeEvent.offsetX;
 
    //      const widthRatio = offsetX / width;
 
    //      const toTime = Math.round(widthRatio * 오디오.duration);
    //      audioBar.current.style.background = `linear-gradient(to right, dodgerblue 0%, dodgerblue ${toTime}%, #ccc ${toTime}%, #ccc 100%)`;
 
    //      오디오.currentTime = toTime;
    //  };

    //  오디오진행바 onChange
     const moveAudioBar = (value) => {
        let 오디오 = audio.current.audioEl.current;
    
        console.log(오디오.currentTime);
        console.log(오디오.duration);


     } 
     const forwardRadio = (time)=>{
         let 오디오 = audio.current.audioEl.current;
         console.log(오디오);
         let changeTime = 오디오.currentTime + time
         if(changeTime < 0){
             changeTime = 0
         }
         audioIng(changeTime)
         오디오.currentTime = changeTime
 
     }
    return (
        <div className="modal">
            <div className="modal-content assessmentModal">
                <div className="modal-header fj">
                    <h2 className="modal-title">수행 평가</h2>
                    <button className="btn" onClick={() => setAssModal(false)}><Icon icon={"close"} /></button>
                </div>
                <div className="modal-body">
                    <div className="modal-name">
                        <strong className="name">강수학</strong>
                        <ul className="list">
                            <li>중2-1</li>
                            <li>I. 수와 식의 계산</li>
                            <li>번호, 주제</li>
                        </ul>
                    </div>
                    <div className="contents">
                        <div className='contents-audio audio'>
                            {
                                audioState && (
                                    <>
                                    <div className="top fj">
                                    <input type="hidden" value={오디오입니동} />
                                    <ReactAudioPlayer
                                    src={오디오입니동}
                                    autoPlay
                                    muted={muteState}
                                    ref={audio}
                                    volume={valumeItem}
                                    onCanPlay={audioReady}
                                    listenInterval={listenSpeed}
                                    onListen={audioIng}
                                    onEnded={() => {
                                        setMinTime(maxTime);
                                        setPlayState(true);
                                    }}
                                    />
                                        <span>{minTime}</span>
                                        <span>{maxTime}</span>
                                    </div>
                                    {/* <div className='audio-bar' onClick={clickChange}>
                                        <div className='bar-range' ref={audioBar}></div>
                                    </div> */}
                                    <input 
                                    type="range" 
                                    className="audio-bar" 
                                    ref={audioBar}
                                    min={0}
                                    value={audioItem}
                                    onChange={(e)=>moveAudioBar(e.target.value)}
                                    />
                                <div className="foot fj" style={{ marginTop:'17px' }}>
                                    <div className='audio-volume'>
                                        <button className={muteState ? 'mute' : ''} onClick={()=>{
                                            if(muteState){
                                                setMuteState(false);
                                                volumeBar.current.disabled = false;
                                            }else{
                                                setMuteState(true);
                                                volumeBar.current.disabled = true;
                                            }
                                        }}>
                                            <Icon icon={"volume"} style={{ color: '#666', marginRight:'10px', cursor:'pointer', fontSize:'16px'}} />
                                        </button>
                                        <input
                                        type="range"
                                        className={`volumeBar ${muteState ? 'mute' : ''}`}
                                        min={0}
                                        max={10}
                                        value={valumeItem * 10}
                                        onChange={volumeChange}
                                        style={{ width:"100px" }}
                                        ref={volumeBar}
                                        />
                                    </div>
                                    <div className='foot-mid fj'>
                                        <button onClick={() => forwardRadio(-5)}>
                                            <Icon icon={"fast"} style={{transform:'rotate(180deg)',fontSize:'22px'}}/>
                                        </button>
                                        <button className={`audio-play ${playState ? 'play' : 'pause'}`} onClick={start}>   
                                        </button>
                                        <button onClick={() => forwardRadio(5)}>
                                            <Icon icon={"fast"} style={{fontSize: '22px'}}/>
                                        </button>
                                    </div>
                                    <div className="fj">
                                        <button className="audio-speed mr-4">x 1.0 </button>
                                        <button
                                            className='audio-download'
                                            onClick={() => {
                                                fileDown(오디오입니동);
                                            }}
                                            >
                                            <Icon icon={"download"} style={{fontSize:'15px',color:'#666'}}/>
                                        </button>
                                    </div>
                                </div>
                             </>
                            )
                        }
                        </div>
                        <h5 className="m-tit" style={{ marginTop: '20px' }}><img src={pencil}/>학생의 개념 이해력과 전달력 점수를 입력해 주세요.</h5>
                        <table>
                            <colgroup>
                                <col width='120px'/>
                                <col width='*'/>
                            </colgroup>
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