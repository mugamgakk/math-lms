import React from 'react';
import { Navigate } from 'react-router-dom';
import ajax from '../ajax';
import Home from '../Pages/Home';

async function Authentication() {
    
    let res = await ajax("/user.php", {data : {mode : "login"}})
    
    console.log(res.data.ok);

    if(res.data.ok == 1){
        return <Home/>
    }else{
        return <Navigate to="/login" />
    }

}

export default Authentication;