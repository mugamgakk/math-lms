import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    let [loginInfo, setLoginInfo] = useState({
        id: "",
        pw: "",
        loginType: "P",
    });

    let [alertText, setAlertText] = useState("");
    let navigate = useNavigate();

    // P : "패럴랙스"
    // G : "지앤비"

    const loginAction = async (e) => {
        e.preventDefault();

        let data = await axios.post("http://192.168.11.178:8080/login", {
            id : loginInfo.id,
            pw : loginInfo.pw,
            loginType : loginInfo.loginType
        })


        if(data.data.code === 200){
            localStorage.setItem("token", data.data.token);
            navigate("/")
        }else{
            setAlertText(data.data.message)
        }


    };

    const isLogin = () => {
        let 토큰 = localStorage.getItem("token");
    };

    return (
        <div className="container">
            <form onSubmit={loginAction}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        className="form-control"
                        onChange={(e) => {
                            setLoginInfo({ ...loginInfo, id: e.target.value });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="pw">비밀번호</label>
                    <input
                        type="text"
                        id="pw"
                        className="form-control"
                        onChange={(e) => {
                            setLoginInfo({ ...loginInfo, pw: e.target.value });
                        }}
                    />
                </div>
                <div>
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
                <p style={{color:  "red"}}>
                {alertText}
                </p>
                <button className="btn" onClick={loginAction}>로그인</button>
            </form>

        </div>
    );
}

export default Login;
