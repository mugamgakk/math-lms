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


        dispatch(logintAsync(data))
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
            
        </div>
     );
}

export default Login;