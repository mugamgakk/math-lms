import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {logintAsync} from '../feature/loginSlice';


function Login() {

    let [userId , setuserId] = useState('');
    let [userPw , setuserPw] = useState('');
    let [picture, setPictrue] = useState([]);
    let dispatch = useDispatch();

    const loginAction = (e)=>{
        e.preventDefault();

        let data = {
            userId ,
            userPw
        }

        axios.post('http://192.168.11.201:5000/login', data)
        .then(a=>{
            console.log(a.data)

            localStorage.setItem('token', a.data.token)

        })


        // dispatch(logintAsync(data))
    }

    // useEffect(()=>{
    //     axios.post("http://192.168.11.201:5000/login", {data : "hello"})
    //     .then(function(res){
    //         console.log(res)
    //     })
    // },[])


    const isLogin = ()=>{

        let 토큰 = localStorage.getItem('token');

        axios.get('/payload' , {
            headers : {
                "Authorization" : 토큰
            }
        })
        .then(res=>{
            alert(res.data.message)
        })
        .catch(err=>{
            alert(err.response.data.message)
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
                토큰인증확인
            </button>

        </div>
     );
}

export default Login;