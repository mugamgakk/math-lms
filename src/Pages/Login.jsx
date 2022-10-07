import React, { useState } from "react";
import ajax from "../ajax";
import style from "../style/style-module/Login.module.scss";
import logo from "../assets/logo.svg";

function Login() {
    let [userId, setUserId] = useState("");
    let [userPw, setUserPw] = useState("");
    let [loginType, setLoginType] = useState("P");

    let [loading, setLoading] = useState(false);

    let [alertText, setAlertText] = useState("");

    // P : "패럴랙스"
    // G : "지앤비"

    const loginAction = async (e) => {
        e.preventDefault();

        if (userId === "") {
            alert("아이디를 입력하세요.");
            return;
        } else if (userPw === "") {
            alert("비밀번호를 입력하세요.");
            return;
        }

        setLoading(true);

        const data = {
            mode: "login",
            user_gb: loginType,
            user_id: userId,
            user_pw: userPw,
        };

        ajax("/user.php", {
            data: data,
        }).then((res) => {
            setLoading(false);
            setAlertText(res.data.msg);
            console.log(res);

            switch (res.data.ok) {
                // 로그인 완료
                case 1:
                    localStorage.setItem("lmsLogin", userId)
                    window.location = "/";
                    break;
                // 로그인 중복
                case -2:
                    if(window.confirm("로그인된 계정이 있습니다. 기존 로그인 된 계정을 로그아웃 하시겠습니까.")){
                        data.force_mode = "Y";

                        ajax("/user.php",{
                            data : data
                        }).then(res=>{
                            localStorage.setItem("lmsLogin", userId)
                            window.location = "/";
                        })
                    }else{
                        return 
                    }
                    break;
            }
        });
    };

    return (
        <div className={style.container}>
            <form onSubmit={loginAction}>
                <div className="text-center">
                    <img src={logo} alt="" width={120} />
                </div>
                <div className="mb-10">
                    <label className={style.label} htmlFor="id">
                        아이디
                    </label>
                    <input
                        type="text"
                        id="id"
                        className={`form-control ${style.text_input}`}
                        value={userId}
                        onChange={(e) => {
                            setUserId(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-10">
                    <label className={style.label} htmlFor="pw">
                        비밀번호
                    </label>
                    <input
                        type="text"
                        id="pw"
                        className={`form-control ${style.text_input}`}
                        value={userPw}
                        onChange={(e) => {
                            setUserPw(e.target.value);
                        }}
                    />
                </div>
                <div className="d-flex">
                    <div className="mr-10">
                        <label htmlFor="패럴랙스">패럴랙스</label>
                        <input
                            type="radio"
                            id="패럴랙스"
                            value="P"
                            onChange={() => {
                                setLoginType("P");
                            }}
                            checked={loginType === "P"}
                        />
                    </div>
                    <div>
                        <label htmlFor="지앤비">지앤비</label>
                        <input
                            type="radio"
                            id="지앤비"
                            value="G"
                            onChange={() => {
                                setLoginType("G");
                            }}
                            checked={loginType === "G"}
                        />
                    </div>
                </div>
                <p style={{ color: "red" }}>{alertText}</p>
                <button className="btn" disabled={loading} onClick={loginAction}>
                    로그인
                </button>
                <button type="button" className="btn" onClick={()=>{
                    ajax("/user.php", {data : {
                        mode : "logout"
                    }})
                    .then(res=>{
                        console.log(res)
                    })
                }}>로그아웃</button>
            </form>
        </div>
    );
}

export default Login;
