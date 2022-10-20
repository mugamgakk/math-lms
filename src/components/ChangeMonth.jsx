import dayjs from 'dayjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


function ChangeMonth({onChange}) {

    let [count, setCount] = useState(0);
    let [day, setDay] = useState("")


    const changeDate = (param)=>{

        if(param === 1 && count + 1 === 1){
            alert("현재월 이후로 볼수 없음")
            return 
        }

        setCount(count + param);
    }

    useEffect(()=>{
        setDay(dayjs(new Date()).add(count, "M").format("YYYY-MM"))
    },[count])

    useEffect(()=>{
        onChange(day);
    },[day])


    return ( 
        <div>
            <button className='btn btn-s' onClick={()=>{changeDate(-1)}}>&lt;</button>
            <strong>
                {day}
            </strong>
            <button className='btn btn-s' onClick={()=>{changeDate(1)}}>&gt;</button>
        </div>
     );
}

export default ChangeMonth;