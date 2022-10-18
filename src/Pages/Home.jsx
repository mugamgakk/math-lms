import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ajax from "../ajax";

function Home() {
    useEffect(() => {
        var pathName = window.location.pathname;
        sessionStorage.setItem("pathName", pathName);
    });

    let [campusInfo, setCampusInfo] = useState({
        qteam : "",
        qaera : "",
        qcampus : ""
    })

    var userId = useMemo(() => {
        return localStorage.getItem("lmsLogin");
    }, []);

    const logoutFn = () => {
        ajax("/user.php", {
            data: { mode: "logout" },
        });
        localStorage.removeItem("lmsLogin");
        window.location = "/login";
    };

    useEffect(()=>{
        ajax("/user.php", {
            data : {mode : "login"}
        }).then(res=>{ 
            if(res.data.ok !== -1){
                logoutFn()
            }
        });

        getCampusData();
    },[])

    
    const getCampusData = async (e)=>{

        if(e){
            e.preventDefault();
        }

        let res = await ajax("/user.php", {
            data: {
                mode : "get_campus_info",
                qteam : campusInfo.qaera,
                qarea : campusInfo.qaera,
                qcampus : campusInfo.qcampus
            }
        });

        // console.log(res);
    }

    return (
        <div>
            <div className="container">
                <ul className="d-flex">
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
                    <li></li>
                </ul>

                <div className="d-flex">
                    <strong>안녕하세요 {userId}</strong>
                    <button onClick={logoutFn} className="btn btn-danger">
                        로그아웃
                    </button>
                </div>

                {/* {
                    window.location.pathname === "/" && (
                        <div className="lnb" style={{width : "200px"}}>
                        <form onSubmit={getCampusData}>
                            <select  onChange={(e)=>{setCampusInfo({...campusInfo, qteam : e.target.value})}}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <select onChange={(e)=>{setCampusInfo({...campusInfo, qaera : e.target.value})}}>
                                <option value="본사">본사</option>
                                <option value="결기">경기</option>
                            </select>
                            <input type="text" className="form-control" onChange={(e)=>{setCampusInfo({...campusInfo, qcampus : e.target.value})}} />
                            <button type="submit" className="btn">조회</button>
                        </form>
                    </div>
                    )
                } */}

                
            </div>

            <Outlet />
        </div>
    );
}

export default Home;
