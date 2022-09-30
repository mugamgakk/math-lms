import React, { useState } from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';

function Login() {

    let [userId , setuserId] = useState('');
    let [userPw , setuserPw] = useState('');


    useEffect(()=>{

    },[])


    const loginAction = async (e)=>{
        e.preventDefault();

        ajax("/user.php/?mode=login", {
            user_gb : "P",
            user_id : userId,
            user_pw : userPw,
        })
        .then(res=>{
            console.log(res)
        })

    }



    const isLogin = ()=>{

        let 토큰 = localStorage.getItem('token');

    }


    return ( 
        <div className='container'>

            <form onSubmit={loginAction}>
            <div>
            <label htmlFor="id">아이디</label>
            <input type="text" id='id' className='form-control' onChange={e=>{setuserId(e.target.value)}} />
            </div>
            <div>
            <label htmlFor="pw">비밀번호</label>
            <input type="text" id='pw' className='form-control' onChange={e=>{setuserPw(e.target.value)}}/>
            </div>
            <button className='btn'>로그인</button>
            </form>
            
            <button type="button" onClick={isLogin} className="btn">
                토큰인증확인
            </button>

        </div>
     );
}

export default Login;