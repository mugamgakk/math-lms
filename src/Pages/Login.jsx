import React, { useState } from "react";
import ajax from "../ajax";
import logo from "../assets/logo.svg";
import useInput from "../hooks/useInput";
import { setCookie } from "../cookie";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();


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

            if(res.data.ok == 1){
                // 이미 로그인
                // 프론트에서 로그인 확인 쿠키
                setCookie("gplumLMSlogin", "true");
                navigate("/");
            }
            if(res.data.ok == -2){
                // 중복계정
                const alert = `로그인된 계정이 있습니다. 기존 로그인 된 계정을 로그아웃 하시겠습니까.`;
                    if (window.confirm(alert)) {
                        data.force_mode = "Y";
                        ajax("/user.php", {
                            data: data,
                        }).then((res) => {
                            setCookie("gplumLMSlogin", "true")
                            navigate("/");

                        });
                    } 
            }
            if(res.data.ok == -1){
                // 이미 로그인
                setCookie("gplumLMSlogin", "true")
                navigate("/");
            }
            if(res.data.ok == 0){
                // 에러
                alert(res.data.msg);
            }

            setLoading(false);

        });
    };

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
                        onKeyUp={(e)=>{
                            if(e.key === "Enter") loginAction(e);
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
