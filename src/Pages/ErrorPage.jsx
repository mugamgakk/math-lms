import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/style-module/ErrorPage.module.scss"

function ErrorPage() {
    let navigate = useNavigate();
    return (
        <div id={style.main}>
            <div class={style.fof}>
                <h1>Error 404</h1>
                <p className="text-center"><button className="btn" onClick={()=>{
                    navigate(-1)
                }}>뒤로가기</button></p>
            </div>
        </div>
    );
}

export default ErrorPage;
