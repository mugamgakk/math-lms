import * as React from "react";
import ReactAudioPlayer from 'react-audio-player';


function AudioPage() {

    //  오디오 
    let audio = React.useRef();

    const start = ()=>{

        let 오디오 = audio.current.audioEl.current;

        오디오.paused ? 오디오.play() : 오디오.pause();
    }
    return ( 
        <div style={{marginTop : "100px"}}>
                <h2>오디오 테스트</h2>
                <ReactAudioPlayer
                src="test.mp3"
                // autoPlay
                ref={audio}
                controls
                />

                <button className="btn" onClick={start}>재생 버튼</button>

                <div>
                    <p></p>
                </div>
            </div>
     );
}

export default AudioPage;