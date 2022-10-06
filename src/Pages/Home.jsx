import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ajax from "../ajax";
import useLoginStore from "../store/useLoginStore";


function Home() {
    const url = window.location.pathname;
    const user_id = useLoginStore(state=>state.user_id);
    
    useEffect(()=>{

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
                        ajax("/user.php",{
                            data : {mode : "logout"}
                        })
                        window.location = "/login"
                        }} className="btn">로그아웃</button></li>
                </ul>
                <span>
                    {user_id}님 안뇽
                </span>
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
