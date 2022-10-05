import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ajax from "../ajax";


function Home() {
    const url = window.location.pathname;
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get('http://192.168.11.178:8080/istoken' , {
            headers : {
                "Authorization" : token
            }
        }).then(res=>{
            if(res.data.code === 200){
                console.log(res.data.data)
            }
        }).catch(err=>{
            alert("토큰이 만료되었습니다.");
            localStorage.removeItem("token");
            window.location = "/login"
        })

        sessionStorage.setItem("pathName", url)
    })


    return (
        <div>
            <div className="container">
                <ul className="row">
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/attendance">출석체크</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/today-class">오늘의 수업</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/detail-class">학생별 수업 관리</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/plus-learning">플러스 러닝</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/evaluation">평가관리</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/statistics">학습 통계</Link>
                    </li>
                    <li style={{ marginRight: "20px" }}>
                        <Link to="/reference">자료 및 알림</Link>
                    </li>
                    <li>
                        <Link to="/components">components guide</Link>
                    </li>
                    <li><button onClick={()=>{
                        localStorage.removeItem("token");
                        window.location = "/login"
                        }} className="btn">로그아웃</button></li>
                </ul>
            </div>

            {
                url === "/" && (
                    <div className="container">
                        홈입니둥
                    </div>
                )
            }
            

            <Outlet />
        </div>
    );
}

export default Home;
