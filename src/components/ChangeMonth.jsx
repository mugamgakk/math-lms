import dayjs from 'dayjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


function ChangeMonth({onChange}) {

    let [count, setCount] = useState(0);
    let day = dayjs(new Date()).add(count, "M").format("YYYY-MM")

    const changeDate = (day)=>{
        setCount(count + day)
    }

    useEffect(()=>{

        if(count > 0){
            alert("현재 월 이후로는 이동할수 없습니다.");
            setCount(0)
        }else{
            onChange(day)
        }

    },[count])

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