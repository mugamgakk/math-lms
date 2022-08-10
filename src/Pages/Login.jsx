import axios from 'axios';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {logintAsync} from '../feature/loginSlice';


function Login() {

    let [userId , setuserId] = useState('');
    let [userPw , setuserPw] = useState('');
    let dispatch = useDispatch();

    const loginAction = (e)=>{
        e.preventDefault();

        let data = {
            userId ,
            userPw
        }


        axios.post('/login', data)
        .then(a=>{

            alert("토큰생성 : " +a.data.token)


            console.log(a)
        })


        // dispatch(logintAsync(data))
    }


    const isLogin = ()=>{
        axios.get('/payload' , {
            headers : {
                "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJqa2pzNzkiLCJwdyI6IjEyMzQiLCJpYXQiOjE2NjAwOTc3MjAsImV4cCI6MTY2MDA5Nzc4MCwiaXNzIjoi7Yag7YGw67Cc6riJ7J6QIn0.e8_dvZhrR8KRFihAXNdD9qQb_saV_RM4CEduRg7DNG8"
            }
        })
        .then(res=>{
            console.log(res)
        })
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
                토큰생성확인
            </button>
        </div>
     );
}

export default Login;