import React, { useState } from "react";
import ajax from '../ajax';
import style from '../style/style-module/Login.module.scss'
import logo from '../assets/logo.svg'

function Login() {
    let [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: "",
        loginType: "P",
    });

    let [loading, setLoading] = useState(false);

    let [alertText, setAlertText] = useState("");

    // P : "패럴랙스"
    // G : "지앤비"

    const loginAction = async (e) => {
        e.preventDefault();

        if(loginInfo.id === ""){
            alert("아이디를 입력하세요.");
            return 
        }else if(loginInfo.pw === ""){
            alert("비밀번호를 입력하세요.");
            return
        }

        setLoading(true)

        const data = {
            mode : "login",
            user_gb : loginInfo.loginType,
            user_id : loginInfo.id,
            user_pw : loginInfo.pw,
            force_mode : "Y"
        }

        ajax("/user.php",{
            data : data
        }).then(res=>{
            setLoading(false);

            console.log(res)
            if(res.data.ok == 1){
                window.location = "/"
            }
        })

    };


    return (
        <div className={style.container}>
            <form onSubmit={loginAction}>
                <div className="text-center">
                    <img src={logo} alt="" width={120} />
                </div>
                <div className="mb-10">
                    <label className={style.label} htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        className={`form-control ${style.text_input}`}
                        onChange={(e) => {
                            setLoginInfo({ ...loginInfo, id: e.target.value });
                        }}
                    />
                </div>
                <div className="mb-10">
                    <label className={style.label} htmlFor="pw">비밀번호</label>
                    <input
                        type="text"
                        id="pw"
                        className={`form-control ${style.text_input}`}
                        onChange={(e) => {
                            setLoginInfo({ ...loginInfo, pw: e.target.value });
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
                            setLoginInfo({ ...loginInfo, loginType: "P" });
                        }}
                        checked={loginInfo.loginType === "P"}
                    />
                    </div>
                    <div>
                    <label htmlFor="지앤비">지앤비</label>
                    <input
                        type="radio"
                        id="지앤비"
                        value="G"
                        onChange={() => {
                            setLoginInfo({ ...loginInfo, loginType: "G" });
                        }}
                        checked={loginInfo.loginType === "G"}
                    />
                    </div>
                </div>
                <p style={{color:  "red"}}>
                {alertText}
                </p>
                <button className="btn" disabled={loading} onClick={loginAction}>로그인</button>
            </form>

        </div>
    );
}

export default Login;
