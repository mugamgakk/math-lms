import React, { useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';

function AssessmentModal () {
    let audio = React.useRef();
    let [playState,setPlaystate] = React.useState(true);

    const start = ()=>{

        let 오디오 = audio.current.audioEl.current;

        playState ? 오디오.play() : 오디오.pause();
        setPlaystate(!playState);

    }

    return (
        <>
            <div className='assessModal'>
                <div className="assessModal-head">
                     <div className="tit"></div>
                     <button className="close"></button>
                </div>
                <div className="assessModal-body">
                    <div className="audio-area">

                <div style={{marginTop : "100px"}}>
                <ReactAudioPlayer
                src="test.mp3"
                autoPlay
                ref={audio}
                controls
                />
                <button className="btn" onClick={start}>재생 버튼</button>
                    
                </div>
                <div className=''>
                    <p></p>
                </div>
            </div>
                </div>
            </div>
        </>
    )
}
export default AssessmentModal;