import React, { useState } from 'react';
import { useEffect } from 'react';
import ajax from '../ajax';

function Login() {

    let [userId , setuserId] = useState('');
    let [userPw , setuserPw] = useState('');


    useEffect(()=>{

        ajax("/class.php/?mode=get_today_class", {
            ymd : "2022-01-01",
            class_cd : 137283785634112704,
            qstr : "김수학"
        })
        .then(res=>{
            console.log(res)
        })


    },[])


    const loginAction = async (e)=>{
        e.preventDefault();

        // let data = {
        //     userId ,
        //     userPw
        // }

        // const login = await axios.post('http://192.168.11.201:5000/login', data);

        // if(login.data.code === 200){
        //     localStorage.setItem('token', login.data.token)
        // }else{
        //     alert("로그인 정보가 일치하지 않습니다.")
        // }

    }



    const isLogin = ()=>{

        let 토큰 = localStorage.getItem('token');

        // axios.get('http://192.168.11.201:5000/istoken' , {
        //     headers : {
        //         "Authorization" : 토큰
        //     }
        // })
        // .then(res=>{
        //     alert(res.data.message)
        // })
        // .catch(err=>{
        //     alert(err.response.data.message)
        // })
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