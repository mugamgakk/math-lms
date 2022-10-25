import React, { useMemo, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import ajax from "../ajax";

const nav = [
    { name: "출석체크", href: "attendance" },
    { name: "오늘의 수업", href: "today-class" },
    { name: "학생별 수업 관리", href: "detail-class" },
    { name: "플러스 학습", href: "plus-learning" },
    { name: "평가 관리", href: "evaluation" },
    { name: "학습 통계", href: "statistics" },
    { name: "자료 및 알림", href: "reference" },
    { name: "components guide", href: "components" },
];

const arr = new Array(22).fill(2);

function Home() {
    useEffect(() => {
        var pathName = window.location.pathname;
        sessionStorage.setItem("pathName", pathName);
    });

    let [campusInfo, setCampusInfo] = useState({
        qteam: "",
        qaera: "",
        qcampus: "",
    });

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

    useEffect(() => {
        ajax("/user.php", {
            data: { mode: "login" },
        }).then((res) => {
            if (res.data.ok !== -1) {
                alert("로그인이 만료되었습니다.");
                logoutFn();
            }
        });

        getCampusData();
    }, []);

    const getCampusData = async (e) => {
        if (e) {
            e.preventDefault();
        }

        let res = await ajax("/user.php", {
            data: {
                mode: "get_campus_info",
                qteam: campusInfo.qaera,
                qarea: campusInfo.qaera,
                qcampus: campusInfo.qcampus,
            },
        });

        // console.log(res);
    };

    return (
        <main>
            <header id="header">
                <div className="container">
                    <div className="header-layout">
                        <h1 className="logo">
                            <img src="" alt="logo" />
                        </h1>

                        <div className="info">
                            <strong className="info-name">{localStorage.getItem("lmsLogin")}님</strong>
                            <ul className="info-list">
                                <li>회원정보</li>
                                <li onClick={logoutFn}>로그아웃</li>
                            </ul>
                        </div>
         
                    </div>
                </div>
            </header>
            <div className="container row">
                <nav className="lnb col-2">
                    <h1 className="sr-only">Left Navigation Bar</h1>

                    <div className="lnb-toggle">
                        <div className="fa">
                            <span className="lnb-toggle--label">메뉴 감추기</span>
                            <button className="lnb-toggle--btn">on</button>
                        </div>
                    </div>
                    <div className="lnb-lookup"></div>
                    <div className="lnb-list">
                        <h4 className="lnb-title">수학 학습 관리</h4>
                        <ul>
                            {
                                nav.map(a=>{
                                    return (<li key={a.name} className={`lnb-item ${window.location.pathname === "/" + a.href ? "active" : "" }`}>
                                        <Link to={`/${a.href}`}>{a.name}</Link>
                                    </li>)
                                })
                            }
                            
                        </ul>
                    </div>
                </nav>
                <div className="content col-10">

                        {/* <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width : "30%"}}>1</th>
                                        <th style={{width : "30%"}}>2</th>
                                        <th style={{width : "40%"}}>3</th>
                                        <th style={{width : "17px"}}></th>
                                    </tr>
                                </thead>
                                <tbody style={{maxHeight : "200px"}}>
                                    {
                                        arr.map(a=>{
                                            return (
                                                <tr>
                                                    <td style={{width : "30%"}}>1</td>
                                                    <td style={{width : "30%"}}>2</td>
                                                    <td style={{width : "40%"}}>3</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        </div> */}


                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default Home;
