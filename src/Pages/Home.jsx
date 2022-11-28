import React, { useMemo, useState, useEffect } from "react";
import { useCallback } from "react";
import { Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import ajax from "../ajax";
import { _each, _map } from "../methods/methods";
import LnbLookup from "./Home/LnbLookup";
import Icon from "../components/Icon";
import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";

const nav = [
    { icon: "attendence", name: "출석체크", href: "/attendance" },
    { icon: "todayClass", name: "오늘의 수업", href: "/today-class" },
    {
        icon: "studentManagement",
        name: "학생별 수업 관리",
        href: "/detail-class",
        depth: [
            { name: "수업관리", href: "/detail-class/management" },
            { name: "오답 정복하기", href: "/detail-class/wrong-answer" },
            { name: "학습 분석표", href: "/detail-class/table" },
            { name: "출결 관리", href: "/detail-class/attend" },
        ],
    },
    {
        icon: "plusLearning",
        name: "플러스 학습",
        href: "/plus-learning",
        depth: [
            { name: "서술형 따라잡기", href: "/plus-learning/narrative" },
            { name: "교과서별 내신적중", href: "/plus-learning/textBook" },
        ],
    },
    {
        icon: "evaluation",
        name: "평가 관리",
        href: "/evaluation",
        depth: [
            { name: "재원생 정기평가", href: "/evaluation/routine" },
            { name: "진단평가", href: "/evaluation/jindan" },
        ],
    },
    {
        icon: "notification",
        name: "자료 및 알림",
        href: "/data-service",
        depth: [
            { name: "자료실", href: "/data-service/reference" },
            { name: "학습 알림", href: "/data-service/notification" },
        ],
    },
    { icon: "point", name: "학습 포인트", href: "/statistics" },
    { icon: "apple", name: "components guide", href: "/components" },
];

function Home() {
    let [userId, setUserId] = useState("");
    let [guess, setGuess] = useState(false);
    let [burger, setBurger] = useState(false);
    let location = useLocation();

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
            }else{
                alert("로그인이 만료되었습니다.");
                logoutFn();
            }
        });
    }, []);

    return (
        <main id="main">
            {location.pathname === "/" && <Navigate to="/attendance" />}

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
            <div className="row">
                <nav className={`lnb ${burger ? "active" : ""}`}>
                    <div className="lnb-content">
                        <div className="lnb-toggle">
                            <span className="lnb-toggle--label">메뉴 감추기</span>
                            <button
                                className="lnb-toggle--btn"
                                onClick={() => {
                                    setBurger(!burger);
                                }}
                            >
                                <img src={hamburger} alt="" />
                            </button>
                        </div>

                        <LnbLookup />

                        <h4 className="lnb-title">수학 학습 관리</h4>
                        <div className="lnb-list">
                            <div>
                                {_map(nav, (ele) => {
                                    return <Li ele={ele} key={ele.name} burger={burger} />;
                                })}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

const Li = ({ ele, burger }) => {
    let [depth, setDepth] = useState(false);
    let [minDepth, setMinDepth] = useState(false);

    let location = useLocation();

    useEffect(() => {
        setDepth(false);
        setMinDepth(false);
    }, [burger]);

    return (
        <div
            className={`lnb-items-warp ${minDepth ? "active" : ""}`}
            onMouseOver={() => {
                setMinDepth(true);
            }}
            onMouseLeave={() => {
                setMinDepth(false);
            }}
            // tabIndex="1"
            // onBlur={() => {
            //     setDepth(false);
            // }}
        >
            <div className={`lnb-item ${location.pathname.includes(ele.href) ? "active" : ""}`}>
                <Link to={`${ele.href}`}>
                    <Icon icon={ele.icon} />
                    <p className="item">{ele.name}</p>
                </Link>
                {ele.depth && (
                    <button
                        className={`depth-btn ${depth ? "active" : ""}`}
                        onClick={() => {
                            setDepth(!depth);
                        }}
                    ></button>
                )}
            </div>
            {
                <div className={`lnb-item__depth ${depth ? "active" : ""}`}>
                    <div>
                        {ele.depth && <div className="spe">{ele.name}</div>}
                        {ele.depth?.map((a) => {
                            return (
                                <div className="depth" key={a.href}>
                                    <Link to={`${a.href}`}>
                                        <p
                                            className="item new"
                                            style={
                                                location.pathname === a.href
                                                    ? { color: "#ff7b42" }
                                                    : {}
                                            }
                                        >
                                            {a.name}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })}

                        {!ele.depth && (
                            <Link to={`${ele.href}`}>
                                <p className="item new">{ele.name}</p>
                            </Link>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;
