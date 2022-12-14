import React, { useMemo, useState, useEffect } from "react";
import { useCallback } from "react";
import { Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import ajax from "../ajax";
import { _each, _map } from "../methods/methods";
import LnbLookup from "./Home/LnbLookup";
import Icon from "../components/Icon";
import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";
import { getCookie, removeCookie } from "../cookie";
import useLoginStore from "../store/useLoginStore";

const nav = [
    { icon: "attendence", name: "출석체크", href: "/attendance" },
    { icon: "todayClass", name: "오늘의 수업", href: "/today-class" },
    {
        icon: "studentManagement",
        name: "학생별 수업 관리",
        href: "/detail-class"
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
    const getUserData = useLoginStore(state=>state.getUserData);

    let [userId, setUserId] = useState("");
    let [burger, setBurger] = useState(false);
    let location = useLocation();

    const navigate = useNavigate();

    const logoutFn = useCallback(() => {
        removeCookie("gplumLMSlogin");

        ajax("/user.php", {
            data: { mode: "logout" },
        }).then(() => {
            navigate("/login");
        });
    }, []);

    useEffect(() => {
        ajax("/user.php", {
            data: { mode: "login" },
        }).then((res) => {
            // console.log(res.data)
            if (res.data.ok === -1) {
                getUserData(res.data.user_id, res.data.um_flag);
                setUserId(res.data.user_id);
            }else{
                removeCookie("gplumLMSlogin");
                alert("로그인이 만료되었습니다.");
                window.location = "/login";
            }
        });
    }, [location.pathname]);

    return (
        <main id="main">
            {/* 기본 default 오늘의 수업 */}
            {location.pathname === "/" && <Navigate to="/today-class" />}

            <header id="header">
                <div className="header-layout">
                    <img src={logo} alt="logo" className="logo" />

                    <div className="info">
                        <strong className="info-name">{"송파캠퍼스"} {userId} 님</strong>
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
            <div id="body">
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
                    <p className="item new">{ele.name}</p>
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
