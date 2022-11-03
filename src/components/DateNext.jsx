import dayjs from 'dayjs';
import React from 'react';
import { useCallback } from 'react';
import { weekChange } from '../methods/methods';

const today = dayjs(new Date()).format("YYYYMMDD");

function DateNext({onChange, value = new Date()}) {

    let dateFormat = dayjs(value).format("YYYY.MM.DD");
    let weekDay =  weekChange(dayjs(value).$W);

    const changeDate = useCallback((num)=>{
        let dayValue = dayjs(value).format("YYYYMMDD");

        if(num === 1 && today === dayValue){
            alert("현재월 이후로 넘길수 없습니다.");
            return;
        }

        let {$d : day} = dayjs(value).add(num, "d");
        onChange && onChange(day);
    },[value])

    return ( 
        <div className='fa'>
            <button className='btn' onClick={()=>{changeDate(-1)}}>좌</button>
            <h4>{dateFormat} ({weekDay})</h4>
            <button className='btn' onClick={()=>{changeDate(1)}}>우</button>
        </div>
     );
}

export default DateNext;