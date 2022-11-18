import React, { useMemo, useState, useEffect } from "react";
import { useCallback } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import ajax from "../ajax";
import useTable from "../hooks/useTable";
import { _each, _map } from "../methods/methods";
import LnbLookup from "./Home/LnbLookup";
import Icon from "../components/Icon";
import logo from "../assets/logo.svg"

const nav = [
    { icon: "apple", name: "출석체크", href: "attendance" },
    { icon: "apple", name: "오늘의 수업", href: "today-class" },
    { icon: "apple", name: "학생별 수업 관리", href: "detail-class" },
    { icon: "apple", name: "플러스 학습", href: "plus-learning", depth: ["서술형 따라잡기", "교과서별 내신적중"] },
    { icon: "apple", name: "평가 관리", href: "evaluation" },
    { icon: "apple", name: "학습 통계", href: "statistics" },
    { icon: "apple", name: "자료 및 알림", href: "reference" },
    { icon: "apple", name: "components guide", href: "components" },
];

function Home() {
    let [userId, setUserId] = useState("");
    let [guess, setGuess] = useState(false);

    // let dd = useTable(".tbody");


    const navigate = useNavigate();

    const logoutFn = useCallback(() => {
        ajax("/user.php", {
            data: { mode: "logout" },
        }).then(() => {
            localStorage.removeItem("GplumMathIsLogin");
            window.location = "/login";
        });
    }, []);

    useEffect(() => {
        ajax("/user.php", {
            data: { mode: "login" },
        }).then((res) => {
            // console.log(res)
            if (res.data.ok === -1) {
                setUserId(res.data.user_id);
            }

            if (res.data.ok !== -1) {
                alert("로그인이 만료되었습니다.");
                logoutFn();
            }
        });
    }, []);



    return (
        <main>
            <div className="container">
            <header id="header">
                <div className="header-layout">
                    <img src={logo} alt="logo" style={{ width: "116px" }} />

                    <div className="info">
                        <strong className="info-name">{userId} 님</strong>
                        <ul className="info-list">
                            <li>
                                <Icon icon={"info"} />
                                회원정보
                            </li>
                            
                            <li onClick={logoutFn}>
                            <Icon icon={"logout"} />
                                로그아웃
                                </li>
                        </ul>
                    </div>
                </div>
            </header>
            </div>
            <div className="container row">
                <nav className="lnb col-2">
                    <h1 className="sr-only">Left Navigation Bar</h1>

                    <div className="lnb-toggle">
                        <div className="fa">
                            <span className="lnb-toggle--label">메뉴 감추기</span>
                            <button className="lnb-toggle--btn">on</button>
                        </div>
                    </div>

                    <LnbLookup />

                    <h4 className="lnb-title">수학 학습 관리</h4>
                    <div className="lnb-list">
                        <ul>
                            {_map(nav, (ele) => {
                                return (
                                    <li
                                        key={ele.name}
                                        className={`lnb-item`}
                                    >
                                        <div className="one-depth">
                                                <Link to={`/${ele.href}`}>
                                                    <Icon icon={ele.icon} />
                                                    {ele.name}
                                                </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
                <div className="content col-10">
                    {/* <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>1</th>
                                    <th style={{ width: "30%" }}>2</th>
                                    <th style={{ width: "40%" }}>3</th>
                                    {
                                        dd && <th style={{ width: "17px" }}></th>
                                    }
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight: "200px", overflowY: dd ? "scroll" : "unset" }} className="tbody">
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
                                <tr>
                                    <td style={{ width: "30%" }}>1</td>
                                    <td style={{ width: "30%" }}>2</td>
                                    <td style={{ width: "40%" }}>3</td>
                                </tr>
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
