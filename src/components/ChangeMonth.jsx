import dayjs from 'dayjs';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Icon from './Icon';

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
        <div className='ChangeMonth fa'>
                        <button className='btn-arrow fc' onClick={()=>{changeDate(-1)}}><Icon icon={"arrowA"} style={{transform : "rotate(180deg)", color : "#888"}}/></button>

            <h4>
                {`${$y}년 ${$M + 1}월`}
            </h4>
            <button className='btn-arrow fc' onClick={()=>{changeDate(1)}}><Icon icon={"arrowA"} style={{color : "#888"}} /></button>
        </div>
     );
}

export default ChangeMonth;