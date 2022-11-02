import dayjs from 'dayjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// 현재월 첫날
const firstDate = ()=>{

    const {$y, $M} = dayjs(new Date());

    let a = $y +"/" + ($M + 1);

    return dayjs(a);
}

function ChangeMonth({value = firstDate(), onChange, clickStudent}) {

    let [day, setDay] = useState(value)


    const changeDate = (num)=>{

        let isCurrnetDate = dayjs(day).isSame(new Date(), "month");

        if(isCurrnetDate && num === 1){
            alert("현재월 이후로 넘길수 없음");
            return 
        }

        let changeDay = dayjs(day).add(num, "M").$d;
        setDay(changeDay)
    }

    useEffect(()=>{
        onChange(day);
    },[day, clickStudent])

    const {$M, $y} = dayjs(day);


    return ( 
        <div>
            <button className='btn btn-s' onClick={()=>{changeDate(-1)}}>&lt;</button>
            <strong>
                {`${$y}년 ${$M + 1}월`}
            </strong>
            <button className='btn btn-s' onClick={()=>{changeDate(1)}}>&gt;</button>
        </div>
     );
}

export default ChangeMonth;