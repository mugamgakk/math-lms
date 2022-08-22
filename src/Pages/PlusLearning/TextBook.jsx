import React from 'react';
import { useEffect } from 'react';
import UserInfo from '../../components/UserInfo';


function TextBook() {

    useEffect(()=>{
        fetch("/image-post")
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    },[])

    return ( 
        <div>
            <UserInfo/>
            asdasd
        </div>
     );
}

export default TextBook;