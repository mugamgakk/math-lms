import React, { useState } from "react";
import ajax from "../ajax";
import logo from "../assets/logo.svg";
import useInput from "../hooks/useInput";
import { useEffect } from "react";

function Login() {
    let [textValue, setTextValue] = useInput({
        id: "",
        password: "",
    });

    let [loginType, setLoginType] = useState("P");
    // P : "패럴랙스"
    // G : "지앤비"

    let [loading, setLoading] = useState(false);

    const loginAction = async (e) => {
        e.preventDefault();

        if (textValue.id === "") {
            alert("아이디를 입력하세요.");
            return;
        } else if (textValue.password === "") {
            alert("비밀번호를 입력하세요.");
            return;
        }

        setLoading(true);

        const data = {
            mode: "login",
            user_gb: loginType,
            user_id: textValue.id,
            user_pw: textValue.password
        };

        ajax("/user.php", {
            data: data,
        }).then((res) => {
            setLoading(false);

            console.log(res);

            switch (res.data.ok) {
                // 로그인 완료
                case 1:
                    localStorage.setItem("GplumMathIsLogin", "true");
                    window.location = "/";
                    break;
                // 로그인 중복
                case -2:
                    const alert = `로그인된 계정이 있습니다. 기존 로그인 된 계정을 로그아웃 하시겠습니까.`;
                    if (window.confirm(alert)) {
                        data.force_mode = "Y";

                        ajax("/user.php", {
                            data: data,
                        }).then((res) => {
                            localStorage.setItem("GplumMathIsLogin", "true");
                            window.location = "/";
                        });
                    } else {
                        return;
                    }
                    break;
                case -1:
                    localStorage.setItem("GplumMathIsLogin", "true");
                    window.location = "/";
                    break;
                case 0:
                    alert(res.data.msg);
                    return;
            }
        });
    };

    useEffect(()=>{
        ajax("/user.php", {
            data: { mode: "logout" },
        })
        .then(()=>{
            localStorage.removeItem("GplumMathIsLogin")
        })
    },[])

    return (

        <div className="login-wrap">
        <div className="login">
            <form onSubmit={loginAction}>
                <div className="text-center mb-20">
                    <img src={logo} alt="" width={120} />
                </div>
                <div className="mb-10">
                    <label htmlFor="id">
                        아이디
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        className="textInput"
                        value={textValue.id}
                        onChange={setTextValue}
                    />
                </div>
                <div className="mb-10">
                    <label htmlFor="pw">
                        비밀번호
                    </label>
                    <input
                        type="text"
                        id="pw"
                        name="password"
                        className="textInput"
                        value={textValue.password}
                        onChange={setTextValue}
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
                <div className="text-right">
                <button className="btn-grey-border" type="button" disabled={loading} onClick={loginAction}>
                    로그인
                </button>
                </div>
            </form>
            <style>
                {`
                    .login-wrap{
                        height : 100vh;
                        background : #eee;
                    }
                    .login{
                        position : absolute;
                        left : 50%;
                        top : 40%;
                        transform : translate(-50%,-50%);
                    }
                `}

            </style>
        </div>
        </div>

    );
}

export default Login;
