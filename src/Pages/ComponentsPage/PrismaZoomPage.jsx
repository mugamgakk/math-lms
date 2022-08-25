import React from 'react';
import PrismaZoom from "react-prismazoom"; // 이미지 확대 축소
import img from '../../assets/logo.svg';




function PrismaZoomPage() {
    let prizmaZoom = React.useRef();

    return ( 
        <div>
            <h2>이미지 축소 확대</h2>

            <div style={{ width: "300px", height: "200px", overflow: "hidden" }}>
                <PrismaZoom ref={prizmaZoom}>
                    <img
                        src={img}
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
            <button className="btn">
                <a href={img} download="이미지다운">이미지다운</a>
            </button>
        </div>
     );
}

export default PrismaZoomPage;