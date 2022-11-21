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
    { icon: "attendence", name: "출석체크", href: "attendance" },
    { icon: "todayClass", name: "오늘의 수업", href: "today-class" },
    { icon: "studentManagement", name: "학생별 수업 관리", href: "detail-class" },
    { icon: "plusLearning", name: "플러스 학습", href: "plus-learning", depth: ["서술형 따라잡기", "교과서별 내신적중"] },
    { icon: "evaluation", name: "평가 관리", href: "evaluation" },
    { icon: "notification", name: "학습 통계", href: "statistics" },
    { icon: "point", name: "자료 및 알림", href: "reference" },
    { icon: "point", name: "components guide", href: "components" },
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
        <main id="main">
            <header id="header">
                <div className="header-layout">
                    <img src={logo} alt="logo" className="logo" />

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
            <div className="row" style={{ overflow: "hidden" }}>
                <nav className="lnb">
                    <h1 className="sr-only">Left Navigation Bar</h1>

                    <div className="lnb-toggle">
                        <span className="lnb-toggle--label">메뉴 감추기</span>
                        <button className="lnb-toggle--btn">
                            <Icon icon={"attendence"} />
                        </button>
                    </div>

                    <LnbLookup />

                    <h4 className="lnb-title">수학 학습 관리</h4>
                    <div className="lnb-list">
                        <ul>
                            {_map(nav, (ele) => {
                                return (
                                    <Li
                                        ele={ele}
                                        key={ele.name}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </nav>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

const Li = ({ele}) => {
    return (
        <>
            <li
                className={`lnb-item`}
            >
                <Link to={`/${ele.href}`}>
                    <Icon icon={ele.icon} />
                    <p className="item new">
                        {ele.name}
                    </p>
                </Link>
            </li>
        </>
    )
}

export default Home;
